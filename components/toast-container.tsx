"use client";

import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse space-y-reverse space-y-2 max-w-sm">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          title={
            typeof toast.title === "string"
              ? toast.title
              : toast.title?.toString() ?? undefined
          }
          description={
            typeof toast.description === "string"
              ? toast.description
              : toast.description?.toString() ?? undefined
          }
          onClose={removeToast}
        />
      ))}
    </div>
  );
}
