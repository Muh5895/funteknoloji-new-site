import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--fun-card)] group-[.toaster]:text-[var(--fun-text)] group-[.toaster]:border-[var(--fun-stroke-1)] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-[20px] group-[.toaster]:p-4 group-[.toaster]:backdrop-blur-xl",
          description: "group-[.toast]:text-[var(--fun-text-muted)]",
          actionButton: "group-[.toast]:bg-[var(--fun-purple)] group-[.toast]:text-white group-[.toast]:rounded-lg",
          cancelButton: "group-[.toast]:bg-[var(--fun-surface)] group-[.toast]:text-[var(--fun-text-muted)] group-[.toast]:rounded-lg",
          success: "group-[.toast]:!text-[var(--fun-purple)]",
          error: "group-[.toast]:!text-red-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
