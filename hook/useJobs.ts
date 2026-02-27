"use client";

import { createClient } from "@/lib/supabase/client";
import {
  JobProgressTypes,
  JobProps,
  PaymentStatusTypes,
} from "@/types/dashboard";
import { useEffect, useState } from "react";

export function useJobs() {
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const supabase = await createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("id", user.id)
        .single();

      if (!profile?.company_id) return null;

      const { data, error } = await supabase
        .from("jobs")
        .select(
          `
          id,
          title,
          amount,
          job_progress,
          payment_status,
          start_date,
          due_date,
          created_at,
          updated_at,
          job_number,
          clients(full_name)
        `,
        )
        .eq("company_id", profile.company_id)
        .order("start_date", { ascending: true });

      if (error) throw error;

      const mapped: JobProps[] = data.map((job) => ({
        id: job.job_number,
        title: job.title,
        client: job.clients.full_name,
        job_progress: job.job_progress as JobProgressTypes,
        payment_status: job.payment_status as PaymentStatusTypes,
        amount: job.amount,
        start_date: job.start_date,
        due_date: job.due_date,
        createdAt: job.created_at as string,
        updatedAt: job.updated_at as string,
      }));

      setJobs(mapped);

      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  const todayJobs = jobs.filter((job) => {
    const today = new Date().toISOString().split("T")[0];
    return job.start_date === today || job.payment_status === "unpaid";
  });

  return { jobs, todayJobs, isLoading };
}
