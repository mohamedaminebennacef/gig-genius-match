import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, Clock, Award, Sparkles, ArrowUpRight, TrendingUp } from "lucide-react";

import { DashboardShell, StatCard } from "@/components/dashboard/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_dashboard/student")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — CampusGigs" },
      { name: "description", content: "Your upcoming gigs, stats, and profile progress on CampusGigs." },
      { property: "og:title", content: "Student Dashboard — CampusGigs" },
      { property: "og:description", content: "Track assigned gigs and your matching stats." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StudentDashboard,
});

const timeline = [
  { title: "Assigned to Frontend intern", when: "2 hours ago", tone: "emerald" },
  { title: "Profile viewed by 3 managers", when: "Yesterday", tone: "indigo" },
  { title: "Completed Data annotation gig", when: "3 days ago", tone: "slate" },
  { title: "New skill endorsement: React", when: "1 week ago", tone: "amber" },
];

const upcoming = [
  { title: "Frontend intern — Marketing site", when: "Starts Mon · 12 hrs/wk", pay: "$28/hr", status: "Confirmed" },
  { title: "UX research volunteer", when: "Next Wed · 4 hrs", pay: "Volunteer", status: "Pending" },
];

function StudentDashboard() {
  return (
    <DashboardShell breadcrumb="Dashboard" title="Hey Maya, ready to work?">
      <div className="space-y-8">
        {/* Profile completion banner */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-medium uppercase tracking-wider text-white/60">Profile strength</span>
              </div>
              <p className="mt-2 text-lg font-semibold">Your profile is 82% complete</p>
              <p className="mt-1 text-sm text-white/60">Add 2 projects and a headshot to unlock premium matches.</p>
              <div className="mt-4 h-2 max-w-md overflow-hidden rounded-full bg-white/10">
                <motion.div initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ duration: 1 }} className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500" />
              </div>
            </div>
            <Button asChild className="rounded-lg bg-white text-slate-900 hover:bg-white/90 shrink-0">
              <Link to="/profile">Complete profile</Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Assigned" value="2" hint="Active gigs" icon={Briefcase} />
          <StatCard label="Completed" value="14" hint="This semester" icon={CheckCircle2} trend={{ value: "+3", positive: true }} />
          <StatCard label="Hours logged" value="132" hint="Last 30 days" icon={Clock} />
          <StatCard label="Avg. rating" value="4.9" hint="From 12 reviews" icon={Award} trend={{ value: "★", positive: true }} />
        </div>

        {/* Upcoming + Activity */}
        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Upcoming work</h3>
                <p className="text-xs text-slate-500">Your scheduled gigs</p>
              </div>
              <Button variant="ghost" size="sm" asChild><Link to="/assigned">All assigned</Link></Button>
            </div>
            <div className="mt-4 space-y-3">
              {upcoming.map((u) => (
                <div key={u.title} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-slate-100 p-4 hover:border-slate-200 dark:border-slate-800">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{u.title}</p>
                    <p className="truncate text-xs text-slate-500">{u.when} · {u.pay}</p>
                  </div>
                  <Badge variant="secondary" className={u.status === "Confirmed" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"}>
                    {u.status}
                  </Badge>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Activity</h3>
              <TrendingUp className="h-4 w-4 text-slate-400" />
            </div>
            <ul className="mt-4 space-y-4">
              {timeline.map((t, i) => (
                <li key={i} className="relative flex gap-3 pl-3">
                  <span className={`absolute left-0 top-1.5 h-2 w-2 rounded-full bg-${t.tone}-500`} />
                  <div className="min-w-0">
                    <p className="truncate text-sm">{t.title}</p>
                    <p className="text-xs text-slate-500">{t.when}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="mt-2 w-full">View all <ArrowUpRight className="ml-1 h-3 w-3" /></Button>
          </motion.div>
        </div>

        {/* Skill progress */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-semibold">Top matched skills</h3>
          <p className="text-xs text-slate-500">Based on gigs assigned to you</p>
          <div className="mt-4 space-y-3">
            {[{s:"React",v:94},{s:"TypeScript",v:88},{s:"Figma",v:76},{s:"Node.js",v:62}].map(x => (
              <div key={x.s} className="grid grid-cols-[100px_minmax(0,1fr)_40px] items-center gap-3">
                <span className="text-sm">{x.s}</span>
                <Progress value={x.v} className="h-1.5" />
                <span className="text-right text-xs tabular-nums text-slate-500">{x.v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
