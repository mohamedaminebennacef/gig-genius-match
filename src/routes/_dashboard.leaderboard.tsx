import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Sparkles, Star, MapPin, Clock, CheckCircle2, ChevronDown } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_dashboard/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — CampusGigs" },
      { name: "description", content: "AI-ranked candidates with match reasoning for each gig." },
      { property: "og:title", content: "Leaderboard — CampusGigs" },
      { property: "og:description", content: "See top student matches ranked by AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Leaderboard,
});

const CANDIDATES = [
  {
    name: "Maya Patel", match: 96, initials: "MP", year: "Junior · CS",
    reason: "Strong React portfolio, previously interned at a design-forward SaaS. Ships polished UI fast.",
    skills: ["React", "TypeScript", "Figma", "Motion"],
    location: "On campus", availability: "15 hrs/wk",
    tone: "from-amber-400 to-amber-500",
  },
  {
    name: "Jordan Lee", match: 92, initials: "JL", year: "Senior · HCI",
    reason: "Deep design systems experience. Built the university career portal's component library.",
    skills: ["React", "Storybook", "Figma"],
    location: "Hybrid", availability: "12 hrs/wk",
    tone: "from-indigo-400 to-indigo-500",
  },
  {
    name: "Priya Nair", match: 88, initials: "PN", year: "Sophomore · CS",
    reason: "Fast learner with recent Next.js projects. Availability aligns perfectly with sprint plan.",
    skills: ["Next.js", "TypeScript"],
    location: "On campus", availability: "18 hrs/wk",
    tone: "from-emerald-400 to-emerald-500",
  },
  {
    name: "Diego Ramos", match: 84, initials: "DR", year: "Junior · Design",
    reason: "Strong visual craft, limited framework depth. Could pair well on marketing site polish.",
    skills: ["Figma", "HTML/CSS", "Framer"],
    location: "Remote", availability: "10 hrs/wk",
    tone: "from-rose-400 to-rose-500",
  },
];

function Leaderboard() {
  return (
    <DashboardShell
      breadcrumb="Leaderboard"
      title="Frontend intern — Marketing site"
      actions={
        <>
          <Select defaultValue="score">
            <SelectTrigger className="w-40 rounded-lg"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Sort: Match score</SelectItem>
              <SelectItem value="avail">Sort: Availability</SelectItem>
              <SelectItem value="year">Sort: Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-lg">Export CSV</Button>
        </>
      }
    >
      <div className="space-y-8">
        {/* Top match spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 text-white shadow-xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,164,65,0.25),transparent_50%)]" />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
            <div className="relative">
              <MatchRing value={96} />
              <div className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border-2 border-slate-950 bg-amber-500 text-white shadow-lg">
                <Trophy className="h-4 w-4" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Badge className="border-amber-500/30 bg-amber-500/15 text-amber-300 hover:bg-amber-500/20">
                  <Sparkles className="mr-1 h-3 w-3" /> Best match
                </Badge>
                <span className="text-xs text-white/50">Ranked #1 of 24</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Maya Patel</h2>
              <p className="text-sm text-white/60">Junior · Computer Science · Stanford</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
                Strong React portfolio with production experience shipping marketing sites. AI notes exceptional
                alignment on TypeScript depth and design collaboration signal.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["React", "TypeScript", "Figma", "Motion", "Next.js"].map((s) => (
                  <Badge key={s} variant="secondary" className="border-white/10 bg-white/10 text-white hover:bg-white/15">{s}</Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button className="rounded-lg bg-white text-slate-900 hover:bg-white/90">
                <CheckCircle2 className="mr-1.5 h-4 w-4" /> Assign
              </Button>
              <Button variant="outline" className="rounded-lg border-white/20 bg-white/5 text-white hover:bg-white/10">
                View profile
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Runner-ups */}
        <div className="grid gap-4 md:grid-cols-2">
          {CANDIDATES.slice(1).map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-11 w-11">
                      <AvatarFallback className={`bg-gradient-to-br ${c.tone} text-sm text-white`}>{c.initials}</AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-slate-900 text-[9px] font-semibold text-white dark:border-slate-900 dark:bg-white dark:text-slate-900">
                      #{i + 2}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{c.name}</p>
                    <p className="truncate text-xs text-slate-500">{c.year}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold tabular-nums">{c.match}<span className="text-sm text-slate-400">%</span></p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">match</p>
                </div>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.match}%` }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.9, ease: "easeOut" }}
                  className="h-full rounded-full bg-slate-900 dark:bg-white"
                />
              </div>

              <p className="mt-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{c.reason}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.skills.map((s) => <Badge key={s} variant="secondary" className="text-[11px]">{s}</Badge>)}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {c.location}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {c.availability}</span>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  Details <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </div>

              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 rounded-lg"><Star className="mr-1.5 h-3.5 w-3.5" /> Shortlist</Button>
                <Button size="sm" className="flex-1 rounded-lg bg-slate-900 hover:bg-slate-800">Assign</Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

function MatchRing({ value }: { value: number }) {
  const size = 96;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} stroke="rgba(255,255,255,0.1)" fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} fill="none"
          stroke="url(#ringGrad)" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (value / 100) * c }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="text-2xl font-semibold tabular-nums">{value}</p>
          <p className="text-[10px] uppercase tracking-wider text-white/50">match</p>
        </div>
      </div>
    </div>
  );
}
