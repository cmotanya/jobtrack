"use server";

import { HandleJobSubmitProps } from "@/types/dashboard";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const handleJobSubmit = async ({
  data,
}: HandleJobSubmitProps): Promise<{ jobId: string }> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated.");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("company_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.company_id) {
    throw new Error("Could not retrieve company for this user.");
  }

  const company_id = profile.company_id;

  // finding or creating client for this job
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
      throw new Error(clientError?.message || "Could not create client.");
    }

    client_id = newClient.id;
  }

  // insert job; job_number is assigned by DB trigger
  const { data: newJob, error: jobError } = await supabase
    .from("jobs")
    .insert({
      title: data.title.trim(),
      client_id,
      company_id,
      assigned_to: user.id,
      amount: data.amount,
      job_progress: data.job_progress,
      payment_status: data.payment_status,
      start_date: data.start_date,
      due_date: data.due_date,
    })
    .select("id")
    .single();

  if (jobError || !newJob) {
    throw new Error(jobError?.message ?? "Could not create job.");
  }

  revalidatePath("/dashboard");

  return { jobId: newJob.id };
};

export default handleJobSubmit;
