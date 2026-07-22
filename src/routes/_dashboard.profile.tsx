import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Camera, X, Plus, Sparkles } from "lucide-react";
import { useState } from "react";

import { DashboardShell } from "@/components/dashboard/shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_dashboard/profile")({
  head: () => ({
    meta: [
      { title: "Profile — CampusGigs" },
      { name: "description", content: "Edit your CampusGigs profile — skills, interests, availability, and more." },
      { property: "og:title", content: "Profile — CampusGigs" },
      { property: "og:description", content: "Keep your profile fresh for better AI matches." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Profile,
});

function Profile() {
  const [skills, setSkills] = useState(["React", "TypeScript", "Figma", "Framer Motion", "Node.js"]);
  const [interests, setInterests] = useState(["Design systems", "Developer tools", "Climate tech"]);

  return (
    <DashboardShell breadcrumb="Profile" title="Your profile"
      actions={<Button className="rounded-lg bg-slate-900 hover:bg-slate-800">Save changes</Button>}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main form */}
        <div className="space-y-6">
          {/* Header card */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-28 bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-400" />
            <div className="px-6 pb-6">
              <div className="-mt-10 flex items-end gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-md dark:border-slate-900">
                    <AvatarFallback className="bg-slate-900 text-lg text-white">MP</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-slate-900 text-white hover:bg-slate-800 dark:border-slate-900" aria-label="Change photo">
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="pb-1 min-w-0">
                  <p className="truncate text-lg font-semibold">Maya Patel</p>
                  <p className="text-sm text-slate-500">Junior · Computer Science · Stanford</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Basics */}
          <Section title="About you">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name"><Input defaultValue="Maya" className="rounded-lg" /></Field>
              <Field label="Last name"><Input defaultValue="Patel" className="rounded-lg" /></Field>
              <Field label="Major"><Input defaultValue="Computer Science" className="rounded-lg" /></Field>
              <Field label="Graduation year"><Input defaultValue="2026" className="rounded-lg" /></Field>
            </div>
            <Field label="Bio">
              <Textarea rows={4} className="rounded-lg" defaultValue="Frontend engineer who cares deeply about accessibility and craft. Currently building a design system for the CS department." />
            </Field>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <ChipInput items={skills} setItems={setSkills} placeholder="Add a skill…" />
          </Section>

          {/* Interests */}
          <Section title="Interests">
            <ChipInput items={interests} setItems={setInterests} placeholder="Add an interest…" tone="indigo" />
          </Section>

          {/* Availability */}
          <Section title="Availability">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Hours per week">
                <Select defaultValue="10-15">
                  <SelectTrigger className="rounded-lg"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-5">0–5 hrs</SelectItem>
                    <SelectItem value="5-10">5–10 hrs</SelectItem>
                    <SelectItem value="10-15">10–15 hrs</SelectItem>
                    <SelectItem value="15+">15+ hrs</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Preferred mode">
                <Select defaultValue="hybrid">
                  <SelectTrigger className="rounded-lg"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onsite">On campus</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </Section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <p className="text-sm font-semibold">Profile completion</p>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-semibold">82<span className="text-base text-slate-400">%</span></span>
                  <span className="text-xs text-slate-500">+8% this week</span>
                </div>
                <Progress value={82} className="mt-3 h-1.5" />
              </div>
              <ul className="mt-5 space-y-2 text-xs">
                <Check label="Basics complete" done />
                <Check label="Skills added" done />
                <Check label="Add 2 projects" />
                <Check label="Upload headshot" />
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-white/60">This week</p>
              <p className="mt-2 text-2xl font-semibold">7 profile views</p>
              <p className="mt-1 text-xs text-white/60">From 3 different managers</p>
            </div>
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
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
function Check({ label, done }: { label: string; done?: boolean }) {
  return (
    <li className="flex items-center gap-2">
      <span className={`grid h-4 w-4 place-items-center rounded-full text-[9px] ${done ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" : "bg-slate-100 text-slate-400 dark:bg-slate-800"}`}>
        {done ? "✓" : "•"}
      </span>
      <span className={done ? "text-slate-600 dark:text-slate-300" : "text-slate-500"}>{label}</span>
    </li>
  );
}
function ChipInput({ items, setItems, placeholder, tone = "slate" }: { items: string[]; setItems: (v:string[]) => void; placeholder: string; tone?: "slate" | "indigo" }) {
  const chipCls = tone === "indigo" ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : "";
  return (
    <div className="flex flex-wrap gap-1.5 rounded-lg border border-slate-200 bg-slate-50/60 p-2 dark:border-slate-800 dark:bg-slate-950/40">
      {items.map((s) => (
        <Badge key={s} variant="secondary" className={`${chipCls} gap-1`}>
          {s}
          <button onClick={() => setItems(items.filter((x) => x !== s))} aria-label={`Remove ${s}`}>
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <div className="flex items-center gap-1">
        <Plus className="h-3 w-3 text-slate-400" />
        <input
          className="min-w-[10ch] bg-transparent text-sm outline-none"
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              setItems([...items, e.currentTarget.value.trim()]);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}
