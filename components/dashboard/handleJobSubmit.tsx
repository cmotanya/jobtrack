"use server";

import { HandleJobSubmitProps } from "@/types/dashboard";
import { createClient } from "@/lib/supabase/server";

export const handleJobSubmit = async ({
  data,
}: HandleJobSubmitProps): Promise<void> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated.");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("company_id")
    .eq("id", user?.id)
    .single();

  if (profileError || !profile?.company_id) {
    throw new Error("Could not get company id.");
  }

  const company_id = profile.company_id;

  // find or create job
  const { data: existingClient } = await supabase
    .from("clients")
    .select("id")
    .eq("company_id", company_id)
    .ilike("full_name", data.client.trim())
    .maybeSingle();

  let client_id: string;

  if (existingClient) {
    client_id = existingClient.id;
  } else {
    const { data: newClient, error: clientError } = await supabase
      .from("clients")
      .insert({
        full_name: data.client.trim(),
        company_id,
        location: data.location.trim() || null,
      })
      .select("id")
      .single();

    if (clientError || !newClient) {
      console.error("CLIENT INSERT ERROR:", clientError);
      throw new Error(clientError?.message || "Could not create client.");
    }

    client_id = newClient.id;
  }

  // generate job number
  const { count } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .eq("company_id", company_id);

  const job_number = `JOB-${String((count ?? 0) + 1).padStart(3, "0")}`;

  // insert job
  const { error: jobError } = await supabase.from("jobs").insert({
    title: data.title.trim(),
    client_id,
    company_id,
    assigned_to: user.id,
    amount: data.amount,
    job_progress: data.job_progress,
    payment_status: data.payment_status,
    start_date: data.start_date,
    due_date: data.due_date,
    job_number,
  });

  if (jobError) throw new Error(jobError.message);
};

export default handleJobSubmit;
