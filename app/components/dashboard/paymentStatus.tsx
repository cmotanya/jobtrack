import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { paymentStatus } from "@/data/Dashboard/jobStatus";
import { cn } from "@/utils/cn";
import { useState } from "react";

const PaymentStatus = () => {
  const [paymentProgress, setPaymentProgress] = useState("");
  return (
    <Select onValueChange={setPaymentProgress}>
      <SelectTrigger className="mt-2">
        <SelectValue placeholder="Select job progress">
          {paymentProgress && (
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  paymentStatus.find((s) => s.value === paymentProgress)?.color,
                )}
              />
              {paymentStatus.find((s) => s.value === paymentProgress)?.label}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {paymentStatus.map((status) => (
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

export default PaymentStatus;
