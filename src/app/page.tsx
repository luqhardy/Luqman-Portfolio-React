"use client";

import Image from "next/image";

import fuhehe from "@/fuhehe.png";
import { ArrowUpRight, CircleDot } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import {
  CellGrid,
  ElsewhereCell,
  ProjectCell,
} from "@/components/project-cell";
import { HighlightCell } from "@/components/highlight-cell";
import { ProxmoxStatus } from "@/components/proxmox-status";
import { useLanguage } from "@/components/language-provider";
import {
  allProjects,
  elsewhere,
  featured,
  profile,
  projectGroups,
  ui,
} from "@/lib/content";
import {
  certifications,
  education,
  experience,
  highlights,
  languages,
  stack,
} from "@/lib/resume";

export default function Home() {
  const { t, lang } = useLanguage();

  return (
    <div id="top" className="mx-auto w-full max-w-4xl pb-4">
      {/* ---------------------------------------------------------------- */}
      {/* Open-to-work notice                                              */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-b border-primary/25 bg-primary/[0.07] px-4 py-3 sm:px-6">
        <p className="flex items-start gap-2.5 text-xs leading-relaxed">
          <CircleDot
            aria-hidden="true"
            className="mt-px size-3.5 shrink-0 text-primary"
          />
          <span>{t(profile.status)}</span>
        </p>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Intro                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section className="relative overflow-hidden pt-10 pb-12">
        {/* Decorative only. Sits before the content in the DOM so the content,
            being positioned too, paints over it without needing a z-index. */}
        <div
          // Mobile: the hero is a single column, so the art tucks into the
          // empty space beside the portrait rather than sitting under the text.
          // sm+: the layout goes side-by-side and it spans the full height.
          className="pointer-events-none absolute top-10 right-0 aspect-[4/3] h-32 select-none sm:inset-y-0 sm:top-0 sm:h-auto sm:max-w-[20rem]"
        >
          <Image
            aria-hidden="true"
            src={fuhehe}
            alt=""
            sizes="320px"
            className="hero-art h-full w-full object-contain object-right opacity-50"
          />
          {/* Sits on the faded tail of the mask, so it reads as a caption
              rather than as something printed over the artwork. */}
          <p className="pointer-events-auto absolute right-0 bottom-0 font-mono text-[0.6rem] whitespace-nowrap text-muted-foreground">
            {t(ui.artBy)}{" "}
            <a
              href={profile.artist.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              {profile.artist.handle}
            </a>
          </p>
        </div>

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="w-28 shrink-0 border sm:w-32">
            <Image
              src="/2.jpg"
              alt={t({
                en: "Portrait of Luqman Hadi",
                ja: "ルクマン・ハディの写真",
              })}
              width={200}
              height={200}
              priority
              className="aspect-square w-full object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
            />
          </div>

          {/* pr reserves the strip the art occupies, so no line of text can
              ever run under it regardless of viewport or sidebar state. */}
          <div className="min-w-0 flex-1 sm:pr-40">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {profile.fullName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {profile.kana} · {profile.pronouns}
            </p>
            {/* Full name as it appears on official records. Visible rather
                than hidden: search engines discount text they cannot see, and
                recruiters checking documents need it anyway. */}
            <p className="mt-1.5 font-mono text-[0.65rem] leading-relaxed text-muted-foreground">
              {profile.legalName} · {profile.legalNameKana}
            </p>

            <p className="mt-4 max-w-prose text-sm leading-relaxed">
              {t(profile.tagline)}
            </p>
          </div>
        </div>

        <div className="relative mt-6 flex flex-wrap gap-2 sm:pr-40">
          {elsewhere.map((link) => {
            const Icon = link.icon;
            const isMail = link.href.startsWith("mailto:");
            return (
              <a
                key={link.id}
                href={link.href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                title={t(link.description)}
                className="group inline-flex items-center gap-2 border px-2.5 py-1.5 text-xs transition-colors hover:bg-accent"
              >
                <Icon
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:scale-110"
                />
                {link.label}
                {isMail ? null : (
                  <span className="sr-only">({t(ui.newTab)})</span>
                )}
              </a>
            );
          })}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Live node status                                                 */}
      {/* ---------------------------------------------------------------- */}
      <ProxmoxStatus />

      {/* ---------------------------------------------------------------- */}
      {/* About                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section id="about" className="py-8">
        <SectionHeading title={t(ui.about)} />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="max-w-prose space-y-4 text-sm leading-relaxed">
            {profile.bio[lang].map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <dl className="cell-grid h-fit grid-cols-1">
            {profile.facts.map((fact) => (
              <div
                key={fact.label.en}
                className="cell flex-col items-start gap-1"
              >
                <dt className="font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {t(fact.label)}
                </dt>
                <dd className="text-xs leading-relaxed">{t(fact.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Awards & highlights                                              */}
      {/* ---------------------------------------------------------------- */}
      <Section id="highlights" className="py-8">
        <SectionHeading title={t(ui.highlights)} count={highlights.length} />
        <CellGrid>
          {highlights.map((item) => (
            <HighlightCell key={item.id} highlight={item} />
          ))}
        </CellGrid>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Selected work                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section id="work" className="py-8">
        <SectionHeading title={t(ui.featured)} count={featured.length} />
        <CellGrid>
          {featured.map((project) => (
            <ProjectCell key={project.id} project={project} featured />
          ))}
        </CellGrid>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* All projects, grouped                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section id="projects" className="py-8">
        <SectionHeading title={t(ui.allProjects)} count={allProjects.length} />
        <div className="flex flex-col gap-8">
          {projectGroups.map((group) => (
            <div key={group.id}>
              <SectionHeading
                as="h3"
                title={t(group.label)}
                count={group.projects.length}
              />
              <CellGrid className="mt-3">
                {group.projects.map((project) => (
                  <ProjectCell key={project.id} project={project} />
                ))}
              </CellGrid>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Experience                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section id="experience" className="py-8">
        <SectionHeading title={t(ui.experience)} count={experience.length} />
        <div className="cell-grid grid-cols-1">
          {experience.map((entry) => (
            <article
              key={entry.id}
              className="cell flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <p className="w-full shrink-0 font-mono text-[0.7rem] tabular-nums text-muted-foreground sm:w-40">
                {entry.period}
              </p>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium">{t(entry.org)}</h3>
                <p className="mt-0.5 text-xs text-foreground/80">
                  {t(entry.role)}
                </p>
                {entry.detail ? (
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {t(entry.detail)}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Education                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section id="education" className="py-8">
        <SectionHeading title={t(ui.education)} count={education.length} />
        <div className="cell-grid grid-cols-1">
          {education.map((entry) => (
            <article
              key={entry.id}
              className="cell flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <p className="w-full shrink-0 font-mono text-[0.7rem] tabular-nums text-muted-foreground sm:w-40">
                {entry.period}
              </p>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium">{t(entry.school)}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {t(entry.detail)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Certifications                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section id="certifications" className="py-8">
        <SectionHeading
          title={t(ui.certifications)}
          count={certifications.acquired.length}
        />
        <div className="flex flex-col gap-8">
          <div>
            <SectionHeading
              as="h3"
              title={t(ui.acquired)}
              count={certifications.acquired.length}
            />
            <div className="cell-grid mt-3 grid-cols-1 sm:grid-cols-2">
              {certifications.acquired.map((cert) => (
                <div
                  key={cert.name}
                  className="cell min-h-0 items-baseline justify-between gap-4 py-2.5"
                >
                  <span className="text-xs leading-snug">{cert.name}</span>
                  <span className="shrink-0 font-mono text-[0.65rem] tabular-nums text-muted-foreground">
                    {cert.date}
                  </span>
                </div>
              ))}
              {certifications.acquired.length % 2 === 1 ? (
                <span
                  aria-hidden="true"
                  className="cell hidden min-h-0 sm:block"
                />
              ) : null}
            </div>
          </div>

          <div>
            <SectionHeading
              as="h3"
              title={t(ui.inProgress)}
              count={certifications.inProgress.length}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {certifications.inProgress.map((cert) => (
                <span
                  key={cert.name}
                  className="border px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {cert.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Tech stack + languages                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section id="stack" className="py-8">
        <SectionHeading title={t(ui.stack)} />
        <div className="flex flex-col gap-6">
          {stack.map((group) => (
            <div key={group.label.en}>
              <h3 className="font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase">
                {t(group.label)}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="border px-2.5 py-1 text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h3 className="font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase">
              {t({ en: "Languages", ja: "語学" })}
            </h3>
            <div className="cell-grid mt-2 grid-cols-1 sm:grid-cols-3">
              {languages.map((entry) => (
                <div
                  key={entry.name.en}
                  className="cell min-h-0 flex-col items-start gap-0.5 py-2.5"
                >
                  <span className="text-xs font-medium">{t(entry.name)}</span>
                  <span className="font-mono text-[0.65rem] text-muted-foreground">
                    {t(entry.level)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Elsewhere                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section id="elsewhere" className="py-8">
        <SectionHeading title={t(ui.elsewhere)} count={elsewhere.length} />
        <CellGrid columns={3}>
          {elsewhere.map((link) => (
            <ElsewhereCell key={link.id} link={link} />
          ))}
        </CellGrid>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                           */}
      {/* ---------------------------------------------------------------- */}
      <footer className="mt-8 border-t px-4 py-8 text-xs text-muted-foreground sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.fullName} · {t(ui.rights)}
          </p>
          <p className="flex items-center gap-1.5">
            {t(ui.builtWith)}
            <a
              href="https://github.com/luqhardy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 underline underline-offset-4 hover:text-foreground"
            >
              GitHub
              <ArrowUpRight className="size-3" />
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
