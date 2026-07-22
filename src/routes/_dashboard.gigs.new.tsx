import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, X, Wand2 } from "lucide-react";
import { useState } from "react";

import { DashboardShell } from "@/components/dashboard/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_dashboard/gigs/new")({
  head: () => ({
    meta: [
      { title: "Create a gig — CampusGigs" },
      { name: "description", content: "Post a new campus gig and get AI-ranked student candidates in seconds." },
      { property: "og:title", content: "Create a gig — CampusGigs" },
      { property: "og:description", content: "Describe the role — our AI does the matching." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CreateGig,
});

const SECTIONS = [
  { id: "basics", title: "Basics", desc: "Title, description, and category" },
  { id: "requirements", title: "Requirements", desc: "Skills, availability, level" },
  { id: "logistics", title: "Logistics", desc: "Location, hours, pay" },
  { id: "review", title: "Review", desc: "Confirm and post" },
] as const;

function CreateGig() {
  const [active, setActive] = useState<(typeof SECTIONS)[number]["id"]>("basics");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Figma"]);
  const [title, setTitle] = useState("Frontend intern — Marketing site");

  return (
    <DashboardShell breadcrumb="Create gig" title="Create a new gig">
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)_320px]">
        {/* Progress sidebar */}
        <aside className="hidden lg:block">
          <ol className="space-y-1">
            {SECTIONS.map((s, i) => {
              const isActive = active === s.id;
              const done = SECTIONS.findIndex((x) => x.id === active) > i;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setActive(s.id)}
                    className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                      isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-medium ${
                      isActive
                        ? "bg-white text-slate-900"
                        : done
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                    }`}>
                      {done ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{s.title}</p>
                      <p className={`truncate text-xs ${isActive ? "text-white/60" : "text-slate-500"}`}>
                        {s.desc}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Form */}
        <motion.section
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
        >
          {active === "basics" && (
            <div className="space-y-5">
              <SectionHeader title="Basics" desc="Give your gig a clear title and describe the work." />
              <Field label="Title">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Frontend intern" className="rounded-lg" />
              </Field>
              <Field label="Category">
                <Select defaultValue="engineering">
                  <SelectTrigger className="rounded-lg"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="ops">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Description">
                <div className="relative">
                  <Textarea rows={6} className="rounded-lg" defaultValue="Help build our marketing site in Next.js. You'll work closely with design to ship pixel-perfect components." />
                  <button className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-slate-900 px-2 py-1 text-[11px] text-white hover:bg-slate-800">
                    <Wand2 className="h-3 w-3" /> Rewrite with AI
                  </button>
                </div>
              </Field>
            </div>
          )}

          {active === "requirements" && (
            <div className="space-y-5">
              <SectionHeader title="Requirements" desc="What skills matter most for this gig?" />
              <Field label="Skills">
                <div className="flex flex-wrap gap-1.5 rounded-lg border border-slate-200 bg-slate-50/60 p-2 dark:border-slate-800 dark:bg-slate-950/40">
                  {skills.map((s) => (
                    <Badge key={s} variant="secondary" className="gap-1">
                      {s}
                      <button onClick={() => setSkills(skills.filter((x) => x !== s))} aria-label={`Remove ${s}`}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <input
                    className="flex-1 min-w-[8ch] bg-transparent text-sm outline-none"
                    placeholder="Type a skill and press Enter…"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        setSkills([...skills, e.currentTarget.value.trim()]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Experience level">
                  <Select defaultValue="intermediate">
                    <SelectTrigger className="rounded-lg"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="intro">Intro</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Availability (hrs/week)">
                  <Input type="number" defaultValue={12} className="rounded-lg" />
                </Field>
              </div>
            </div>
          )}

          {active === "logistics" && (
            <div className="space-y-5">
              <SectionHeader title="Logistics" desc="Where, when, and how much." />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Location"><Input defaultValue="Stanford — Gates Building" className="rounded-lg" /></Field>
                <Field label="Duration"><Input defaultValue="6 weeks" className="rounded-lg" /></Field>
                <Field label="Hourly rate"><Input defaultValue="$28" className="rounded-lg" /></Field>
                <Field label="Start date"><Input type="date" className="rounded-lg" /></Field>
              </div>
            </div>
          )}

          {active === "review" && (
            <div className="space-y-4">
              <SectionHeader title="Review & post" desc="Final check before AI matching begins." />
              <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
                <h4 className="text-sm font-semibold">{title}</h4>
                <p className="mt-1 text-xs text-slate-500">Stanford · 12 hrs/week · $28/hr · Intermediate</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
                </div>
              </div>
              <Button className="w-full rounded-lg bg-slate-900 hover:bg-slate-800">
                <Sparkles className="mr-1.5 h-4 w-4" /> Post gig & run AI match
              </Button>
            </div>
          )}

          {/* Nav */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-200/80 pt-5 dark:border-slate-800">
            <Button
              variant="outline"
              className="rounded-lg"
              disabled={active === "basics"}
              onClick={() => {
                const i = SECTIONS.findIndex((s) => s.id === active);
                if (i > 0) setActive(SECTIONS[i - 1].id);
              }}
            >
              Back
            </Button>
            {active !== "review" && (
              <Button
                className="rounded-lg bg-slate-900 hover:bg-slate-800"
                onClick={() => {
                  const i = SECTIONS.findIndex((s) => s.id === active);
                  if (i < SECTIONS.length - 1) setActive(SECTIONS[i + 1].id);
                }}
              >
                Continue
              </Button>
            )}
          </div>
        </motion.section>

        {/* Summary panel */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Live preview</p>
                  <p className="text-xs text-slate-500">Updates as you type</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                <p className="text-sm font-semibold">{title || "Untitled gig"}</p>
                <p className="mt-1 text-xs text-slate-500">Stanford · 12 hrs/wk · $28/hr</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {skills.slice(0, 5).map((s) => <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>)}
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-white/60">Estimated match</p>
              <p className="mt-2 text-2xl font-semibold">~24 candidates</p>
              <p className="mt-1 text-xs text-white/60">Top match ETA · under 8 seconds</p>
            </div>
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</Label>
      {children}
    </div>
  );
}

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  );
}
