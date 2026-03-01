import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobStatusColor } from "@/data/Dashboard/status-configs";
import { cn } from "@/lib/utils";
import { JobProgressProps } from "@/types/dashboard";

const JobProgress = ({ value, onChange }: JobProgressProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select job progress">
          {value && (
            <div className="flex items-center gap-2 tracking-tight">
              <span
                className={cn(
                  "size-2.5 rounded-full",
                  jobStatusColor.find((s) => s.value === value)?.color,
                )}
              />
              {jobStatusColor.find((s) => s.value === value)?.label}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {jobStatusColor.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            <div className="flex items-center gap-2 tracking-tight">
              <span className={cn("size-2.5 rounded-full", status.color)} />
              {status.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default JobProgress;
