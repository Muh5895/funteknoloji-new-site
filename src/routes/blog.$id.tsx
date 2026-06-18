import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/blog/$id")({
  component: BlogPostPage,
});

function BlogPostPage() {
  const { id } = Route.useParams();
  const { t } = useLang();

  useEffect(() => {
    toast.info(t("blog.warning"), {
      duration: 5000,
    });
  }, [t]);

  return (
    <main className="pt-32 pb-16 px-4 lg:px-5">
      <div className="max-w-[800px] mx-auto">
        <span className="badge-fun badge-fun-gray mb-4 inline-block">Blog</span>
        <h1 className="text-heading-3 md:text-heading-2 font-medium mb-6 fun-text">
          Blog Post {id}
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="fun-text-muted text-lg">
            Bu sayfa yakında daha fazla içerikle güncellenecektir.
          </p>
        </div>
      </div>
    </main>
  );
}
