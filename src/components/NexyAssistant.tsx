import { useState, useEffect } from "react";
import { useLang } from "../lib/i18n";

export default function NexyAssistant() {
  const { t, lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [messageKey, setMessageKey] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messageKeys = [
    "nexy.msg1",
    "nexy.msg2",
    "nexy.msg3",
    "nexy.msg4",
    "nexy.msg5"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      showNextMessage();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const showNextMessage = () => {
    setIsTyping(true);
    const randomKey = messageKeys[Math.floor(Math.random() * messageKeys.length)];

    setTimeout(() => {
      setMessageKey(randomKey);
      setIsTyping(false);
    }, 1500);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 animate-in slide-in-from-right-10 duration-500">
      {messageKey && (
        <div className="relative max-w-[250px] rounded-2xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] p-4 shadow-2xl">
          <button
            onClick={() => setMessageKey("")}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] flex items-center justify-center text-xs fun-text hover:bg-[var(--fun-stroke-1)] transition-colors"
          >
            ✕
          </button>
          {isTyping ? (
            <div className="flex gap-1 py-2">
              <div className="h-2 w-2 rounded-full bg-[var(--fun-purple)] animate-bounce" />
              <div className="h-2 w-2 rounded-full bg-[var(--fun-purple)] animate-bounce [animation-delay:0.2s]" />
              <div className="h-2 w-2 rounded-full bg-[var(--fun-purple)] animate-bounce [animation-delay:0.4s]" />
            </div>
          ) : (
            <p className="text-sm fun-text leading-relaxed">{t(messageKey)}</p>
          )}
          <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-[var(--fun-card)] border-r border-b border-[var(--fun-stroke-1)]" />
        </div>
      )}

      <div
        className="group relative h-20 w-20 cursor-pointer"
        onClick={showNextMessage}
      >
        <div className="absolute inset-0 rounded-full bg-[var(--fun-purple)]/20 animate-ping group-hover:animate-none" />
        <div className="relative h-full w-full rounded-full border-4 border-white dark:border-[var(--fun-card)] bg-white dark:bg-[var(--fun-card)] shadow-2xl overflow-hidden transition-transform group-hover:scale-110 active:scale-95">
          <img
            src="/nexy.png"
            alt="Nexy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
