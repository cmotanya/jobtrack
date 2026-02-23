// utils/toast.tsx
import { Toaster } from "react-hot-toast";

export default function AppToast() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          fontSize: "0.8rem",
          fontWeight: "500",
        },

        success: {
          duration: 3000,
          style: {
            background: "green",
            color: "#fff",
            border: "2px solid hsl(var(--success))",
          },
        },

        error: {
          duration: 3000,
          style: {
            background: "red",
            color: "#fff",
          },
        },
      }}
    />
  );
}
