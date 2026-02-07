import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobStatus } from "@/data/Dashboard/jobStatus";
import { cn } from "@/utils/cn";
import { useState } from "react";

const JobProgress = () => {
  const [jobProgress, setJobProgress] = useState("");

  return (
    <Select onValueChange={setJobProgress}>
      <SelectTrigger className="mt-2">
        <SelectValue placeholder="Select job progress">
          {jobProgress && (
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  jobStatus.find((s) => s.value === jobProgress)?.color,
                )}
              />
              {jobStatus.find((s) => s.value === jobProgress)?.label}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {jobStatus.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${status.color}`} />
              {status.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default JobProgress;
