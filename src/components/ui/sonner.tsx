import { Toaster as Sonner } from "sonner";
import { CheckCircle2, AlertCircle, Info, TriangleAlert } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white dark:group-[.toaster]:bg-[#18181b] group-[.toaster]:text-foreground group-[.toaster]:border-none group-[.toaster]:shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:backdrop-blur-2xl group-[.toaster]:ring-1 group-[.toaster]:ring-black/5 dark:group-[.toaster]:ring-white/10 group-[.toaster]:items-center group-[.toaster]:gap-4",
          title:
            "group-[.toast]:text-[15px] group-[.toast]:font-bold group-[.toast]:tracking-tight group-[.toast]:text-[#11181c] dark:group-[.toast]:text-[#ecedee]",
          description:
            "group-[.toast]:text-[13px] group-[.toast]:text-[#71717a] dark:group-[.toast]:text-[#a1a1aa] group-[.toast]:leading-relaxed",
          actionButton:
            "group-[.toast]:bg-[#0070f0] group-[.toast]:text-white group-[.toast]:rounded-xl group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:text-xs group-[.toast]:font-bold group-[.toast]:transition-all active:scale-95 hover:opacity-90",
          cancelButton:
            "group-[.toast]:bg-transparent group-[.toast]:text-[#71717a] group-[.toast]:rounded-xl group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:text-xs hover:bg-black/5 dark:hover:bg-white/5",
          success:
            "group-[.toast]:after:content-[''] group-[.toast]:after:absolute group-[.toast]:after:left-0 group-[.toast]:after:top-0 group-[.toast]:after:bottom-0 group-[.toast]:after:w-1 group-[.toast]:after:bg-[#17c964] group-[.toast]:after:rounded-l-2xl group-[.toast]:pl-7",
          error:
            "group-[.toast]:after:content-[''] group-[.toast]:after:absolute group-[.toast]:after:left-0 group-[.toast]:after:top-0 group-[.toast]:after:bottom-0 group-[.toast]:after:w-1 group-[.toast]:after:bg-[#f31260] group-[.toast]:after:rounded-l-2xl group-[.toast]:pl-7",
          warning:
            "group-[.toast]:after:content-[''] group-[.toast]:after:absolute group-[.toast]:after:left-0 group-[.toast]:after:top-0 group-[.toast]:after:bottom-0 group-[.toast]:after:w-1 group-[.toast]:after:bg-[#f5a524] group-[.toast]:after:rounded-l-2xl group-[.toast]:pl-7",
          info: "group-[.toast]:after:content-[''] group-[.toast]:after:absolute group-[.toast]:after:left-0 group-[.toast]:after:top-0 group-[.toast]:after:bottom-0 group-[.toast]:after:w-1 group-[.toast]:after:bg-[#0070f0] group-[.toast]:after:rounded-l-2xl group-[.toast]:pl-7",
        },
      }}
      icons={{
        success: <CheckCircle2 className="h-5 w-5 text-[#17c964]" />,
        error: <AlertCircle className="h-5 w-5 text-[#f31260]" />,
        warning: <TriangleAlert className="h-5 w-5 text-[#f5a524]" />,
        info: <Info className="h-5 w-5 text-[#0070f0]" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
