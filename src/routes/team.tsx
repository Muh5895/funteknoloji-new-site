import ScrollReveal from "../components/ScrollReveal";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import { useEffect, useState, useRef } from "react";
import { teamMembers } from "../constants/team";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Ekibimiz - Fun Teknoloji" },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const { t } = useLang();

  const team = teamMembers;

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
            <div className="main-container text-center">
              <span className="badge-fun badge-fun-white mb-4 inline-block">{t("team.badge")}</span>
              <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-medium mb-4 fun-text">{t("team.title")}</h1>
              <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">{t("team.desc")}</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-20 md:py-32">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <ScrollReveal key={i} className="group">
                <div className="aspect-square rounded-[32px] overflow-hidden mb-6 bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl font-bold fun-text mb-1">{member.name}</h3>
                <p className="text-[var(--fun-purple)] font-medium mb-3">{member.role}</p>
                <p className="text-fun-text-muted">{t(member.bioKey)}</p>
              </ScrollReveal>
            ))}

            <ScrollReveal>
              <Link to="/contact" className="group p-10 rounded-[32px] border-2 border-dashed border-[var(--fun-stroke-1)] flex flex-col items-center justify-center text-center space-y-4 hover:border-[var(--fun-purple)] transition-colors h-full">
                <div className="h-16 w-16 rounded-full bg-[var(--fun-purple)]/10 flex items-center justify-center text-[var(--fun-purple)] group-hover:scale-110 transition-transform">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold fun-text">{t("team.join.title")}</h3>
                    <p className="text-sm fun-text-muted">{t("team.join.desc")}</p>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
