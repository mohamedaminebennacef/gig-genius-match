import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Users,
  ArrowUpRight,
  Plus,
  MoreHorizontal,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { DashboardShell, StatCard } from "@/components/dashboard/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/_dashboard/dashboard")({
  head: () => ({
    meta: [
      { title: "Manager Dashboard — CampusGigs" },
      { name: "description", content: "Overview of your campus gigs, matches, and assignments." },
      { property: "og:title", content: "Manager Dashboard — CampusGigs" },
      { property: "og:description", content: "Analytics and quick actions for gig managers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ManagerDashboard,
});

const recentGigs = [
  { title: "Frontend intern — Marketing site", status: "Assigned", match: "Maya Patel · 96%", tone: "emerald" },
  { title: "Lab TA — CS 106B", status: "Matching", match: "Evaluating 18…", tone: "amber" },
  { title: "Event photographer", status: "Pending", match: "3 candidates", tone: "slate" },
  { title: "Data annotation (10h)", status: "Completed", match: "Jordan Lee · 92%", tone: "indigo" },
];

const toneMap: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  slate: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400",
};

function ManagerDashboard() {
  return (
    <DashboardShell
      breadcrumb="Dashboard"
      title="Good morning, Alex"
      actions={
        <>
          <Button variant="outline" className="rounded-lg">Export</Button>
          <Button asChild className="rounded-lg bg-slate-900 hover:bg-slate-800">
            <Link to="/gigs/new"><Plus className="mr-1.5 h-4 w-4" /> New gig</Link>
          </Button>
        </>
      }
    >
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total gigs" value="128" hint="Posted this semester" icon={Briefcase} trend={{ value: "+12%", positive: true }} />
          <StatCard label="Assigned" value="94" hint="Active or completed" icon={CheckCircle2} trend={{ value: "+8%", positive: true }} />
          <StatCard label="Pending match" value="14" hint="Awaiting your review" icon={Clock} />
          <StatCard label="Candidates" value="1,204" hint="In your talent pool" icon={Users} trend={{ value: "+3.2%", positive: true }} />
        </div>

        {/* Chart + activity */}
        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Match quality over time</h3>
                <p className="text-xs text-slate-500">Average AI match score, last 30 days</p>
              </div>
              <Badge variant="secondary" className="gap-1"><TrendingUp className="h-3 w-3" /> 91.4 avg</Badge>
            </div>
            <div className="relative mt-6 h-48">
              <svg viewBox="0 0 400 160" className="h-full w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(15 23 42)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="rgb(15 23 42)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,110 C40,90 80,100 120,70 C160,45 200,80 240,55 C280,30 320,50 360,25 L400,20 L400,160 L0,160 Z" fill="url(#chartGrad)" />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  d="M0,110 C40,90 80,100 120,70 C160,45 200,80 240,55 C280,30 320,50 360,25 L400,20"
                  fill="none"
                  stroke="rgb(15 23 42)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between text-[10px] text-slate-400">
                <span>Wk 1</span><span>Wk 2</span><span>Wk 3</span><span>Wk 4</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Quick actions</h3>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-4 space-y-2">
              {[
                { label: "Post a new gig", to: "/gigs/new" as const },
                { label: "Review pending matches", to: "/leaderboard" as const },
                { label: "Invite a student", to: "/profile" as const },
                { label: "View history", to: "/gigs" as const },
              ].map((a) => (
                <Link
                  key={a.label}
                  to={a.to}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                >
                  {a.label} <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent gigs table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200/80 px-6 py-4 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-semibold">Recent gigs</h3>
              <p className="text-xs text-slate-500">Latest activity across your workspace</p>
            </div>
            <Button variant="ghost" size="sm" asChild><Link to="/gigs">View all</Link></Button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentGigs.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className="bg-slate-100 text-xs dark:bg-slate-800">
                      {g.title.split(" ")[0].slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{g.title}</p>
                    <p className="truncate text-xs text-slate-500">{g.match}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge variant="secondary" className={toneMap[g.tone]}>{g.status}</Badge>
                  <Button variant="ghost" size="icon" aria-label="More"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
