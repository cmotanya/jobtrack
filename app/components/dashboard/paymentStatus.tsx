import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { paymentStatus } from "@/data/Dashboard/jobStatus";
import { PaymentStatusTypes } from "@/types/dashboard";
import { cn } from "@/utils/cn";

type PaymentStatusProps = {
  value: PaymentStatusTypes;
  onChange: (value: PaymentStatusTypes) => void;
};

const PaymentStatus = ({ value, onChange }: PaymentStatusProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select payment status">
          {value && (
            <div className="flex items-center gap-2 tracking-tight">
              <span
                className={cn(
                  "size-2.5 rounded-full",
                  paymentStatus.find((s) => s.value === value)?.color,
                )}
              />
              {paymentStatus.find((s) => s.value === value)?.label}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {paymentStatus.map((status) => (
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

export default PaymentStatus;
