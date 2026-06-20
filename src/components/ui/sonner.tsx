import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-[var(--fun-card)] group-[.toaster]:text-[var(--fun-text)] group-[.toaster]:border-[var(--fun-stroke-1)] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-[22px] group-[.toaster]:p-5 group-[.toaster]:backdrop-blur-2xl group-[.toaster]:border-white/10 group-[.toaster]:items-center group-[.toaster]:gap-4 group-[.toaster]:ring-1 group-[.toaster]:ring-white/5",
          title: "group-[.toast]:text-base group-[.toast]:font-bold group-[.toast]:tracking-tight",
          description: "group-[.toast]:text-sm group-[.toast]:text-[var(--fun-text-muted)] group-[.toast]:leading-relaxed",
          actionButton: "group-[.toast]:bg-[var(--fun-purple)] group-[.toast]:text-white group-[.toast]:rounded-xl group-[.toast]:px-5 group-[.toast]:py-2 group-[.toast]:text-xs group-[.toast]:font-bold group-[.toast]:transition-all active:scale-95 hover:opacity-90",
          cancelButton: "group-[.toast]:bg-[var(--fun-surface)] group-[.toast]:text-[var(--fun-text-muted)] group-[.toast]:rounded-xl group-[.toast]:px-5 group-[.toast]:py-2 group-[.toast]:text-xs",
          success: "group-[.toast]:border-l-4 group-[.toast]:border-l-[#17c964] group-[.toast]:bg-[#17c964]/5",
          error: "group-[.toast]:border-l-4 group-[.toast]:border-l-[#f31260] group-[.toast]:bg-[#f31260]/5",
          warning: "group-[.toast]:border-l-4 group-[.toast]:border-l-[#f5a524] group-[.toast]:bg-[#f5a524]/5",
          info: "group-[.toast]:border-l-4 group-[.toast]:border-l-[#0070f0] group-[.toast]:bg-[#0070f0]/5",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
