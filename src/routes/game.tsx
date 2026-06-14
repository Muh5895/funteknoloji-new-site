import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";

export const Route = createFileRoute("/game")({
  component: GamePage,
});

function GamePage() {
  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <Link
        to="/"
        className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="h-6 w-6" />
      </Link>
      <iframe
        src="https://fungame-livid.vercel.app/"
        className="w-full h-full border-none"
        title="Fun Game"
      />
    </div>
  );
}
