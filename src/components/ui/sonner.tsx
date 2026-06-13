import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
<<<<<<< Updated upstream
            "group toast group-[.toaster]:bg-[var(--fun-card)] group-[.toaster]:text-[var(--fun-text)] group-[.toaster]:border-[var(--fun-stroke-1)] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-[20px] group-[.toaster]:p-4 group-[.toaster]:backdrop-blur-xl",
          description: "group-[.toast]:text-[var(--fun-text-muted)]",
          actionButton: "group-[.toast]:bg-[var(--fun-purple)] group-[.toast]:text-white group-[.toast]:rounded-lg",
          cancelButton: "group-[.toast]:bg-[var(--fun-surface)] group-[.toast]:text-[var(--fun-text-muted)] group-[.toast]:rounded-lg",
          success: "group-[.toast]:!text-[var(--fun-purple)]",
          error: "group-[.toast]:!text-red-500",
=======
            "group toast group-[.toaster]:bg-[var(--fun-card)] group-[.toaster]:text-[var(--fun-text)] group-[.toaster]:border-[var(--fun-stroke-1)] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:font-sans",
          description: "group-[.toast]:text-[var(--fun-text-muted)]",
          actionButton: "group-[.toast]:bg-[var(--fun-text)] group-[.toast]:text-[var(--color-background)]",
          cancelButton: "group-[.toast]:bg-[var(--fun-stroke-1)] group-[.toast]:text-[var(--fun-text)]",
          success: "group-[.toaster]:!bg-[var(--fun-card)] group-[.toaster]:!text-[var(--fun-text)] group-[.toaster]:!border-[var(--fun-stroke-1)]",
          error: "group-[.toaster]:!bg-[var(--fun-card)] group-[.toaster]:!text-[var(--fun-text)] group-[.toaster]:!border-[var(--fun-stroke-1)]",
>>>>>>> Stashed changes
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
