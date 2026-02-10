import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobStatus } from "@/data/Dashboard/jobStatus";
import { cn } from "@/utils/cn";

type JobProgressProps = {
  value: string;
  onChange: (value: string) => void;
};

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
                  jobStatus.find((s) => s.value === value)?.color,
                )}
              />
              {jobStatus.find((s) => s.value === value)?.label}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {jobStatus.map((status) => (
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
