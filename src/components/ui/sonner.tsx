import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--fun-card)] group-[.toaster]:text-[var(--fun-text)] group-[.toaster]:border-[var(--fun-stroke-1)] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:border",
          description: "group-[.toast]:text-[var(--fun-text-muted)] group-[.toast]:text-xs",
          actionButton: "group-[.toast]:bg-[var(--fun-purple)] group-[.toast]:text-white group-[.toast]:rounded-full group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:text-sm group-[.toast]:font-medium",
          cancelButton: "group-[.toast]:bg-[var(--fun-surface)] group-[.toast]:text-[var(--fun-text)] group-[.toast]:rounded-full group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:text-sm group-[.toast]:font-medium",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
