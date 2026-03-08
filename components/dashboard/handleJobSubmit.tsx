"use server";

import { HandleJobSubmitProps } from "@/types/dashboard";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const handleJobSubmit = async ({
  data,
  id,
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
  const { data: clientData, error: clientError } = await supabase
    .from("clients")
    .upsert(
      {
        full_name: data.client.trim(),
        company_id: company_id,
        location: data.location.trim() || null,
      },
      {
        onConflict: "full_name, company_id",
        ignoreDuplicates: false,
      },
    )
    .select("id")
    .maybeSingle();

  if (clientError || !clientData) {
    throw new Error(clientError?.message || "Could not sync client data.");
  }

  const client_id = clientData.id;

  const jobData = {
    title: data.title.trim(),
    client_id,
    company_id,
    assigned_to: user.id,
    amount: data.amount,
    job_progress: data.job_progress,
    payment_status: data.payment_status,
    start_date: data.start_date,
    due_date: data.due_date,
  };

  // insert job; job_number is assigned by DB trigger
  const { data: jobResult, error: jobError } = await supabase
    .from("jobs")
    .upsert(id ? { ...jobData, id } : jobData, {
      onConflict: "id",
    })
    .select("id")
    .single();

  if (jobError || !jobResult) {
    throw new Error(jobError?.message ?? "Could not save job.");
  }

  revalidatePath("/dashboard");

  return { jobId: jobResult.id };
};

export default handleJobSubmit;
