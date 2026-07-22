import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Filter, Plus, MoreHorizontal, Briefcase, Inbox } from "lucide-react";
import { useState } from "react";

import { DashboardShell, EmptyState } from "@/components/dashboard/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_dashboard/gigs")({
  head: () => ({
    meta: [
      { title: "Gig History — CampusGigs" },
      { name: "description", content: "Browse and filter every gig posted on your CampusGigs workspace." },
      { property: "og:title", content: "Gig History — CampusGigs" },
      { property: "og:description", content: "Search, filter, and review posted campus gigs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Gigs,
});

const GIGS = [
  { id: "g1", title: "Frontend intern — Marketing site", cat: "Engineering", status: "Assigned", assignee: "Maya Patel", rate: "$28/hr", date: "2 days ago" },
  { id: "g2", title: "Lab TA — CS 106B", cat: "Teaching", status: "Matching", assignee: "—", rate: "$22/hr", date: "5 hrs ago" },
  { id: "g3", title: "Event photographer", cat: "Media", status: "Pending", assignee: "—", rate: "$40/hr", date: "1 day ago" },
  { id: "g4", title: "Data annotation (10h)", cat: "Research", status: "Completed", assignee: "Jordan Lee", rate: "$18/hr", date: "1 week ago" },
  { id: "g5", title: "React Native contract", cat: "Engineering", status: "Assigned", assignee: "Priya Nair", rate: "$35/hr", date: "3 days ago" },
  { id: "g6", title: "Copywriter — newsletter", cat: "Writing", status: "Completed", assignee: "Diego Ramos", rate: "$25/hr", date: "2 weeks ago" },
];

const toneMap: Record<string, string> = {
  Assigned: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Matching: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Pending: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  Completed: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400",
};

function Gigs() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all");
  const filtered = GIGS.filter((g) => (tab === "all" ? true : g.status.toLowerCase() === tab)).filter((g) =>
    g.title.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <DashboardShell
      breadcrumb="Gig History"
      title="Gig History"
      actions={
        <Button asChild className="rounded-lg bg-slate-900 hover:bg-slate-800">
          <Link to="/gigs/new"><Plus className="mr-1.5 h-4 w-4" /> New gig</Link>
        </Button>
      }
    >
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="rounded-xl">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="matching">Matching</TabsTrigger>
              <TabsTrigger value="assigned">Assigned</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search gigs…"
                className="h-9 w-56 rounded-lg pl-9"
              />
            </div>
            <Button variant="outline" size="sm" className="rounded-lg gap-1.5">
              <Filter className="h-3.5 w-3.5" /> Filter
            </Button>
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No gigs match"
            description="Try adjusting your filters or clear your search."
            action={<Button variant="outline" onClick={() => { setQ(""); setTab("all"); }}>Reset</Button>}
          />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="hidden grid-cols-[minmax(0,2fr)_1fr_1fr_1fr_1fr_auto] items-center gap-4 border-b border-slate-200/80 bg-slate-50/60 px-6 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-500 md:grid dark:border-slate-800 dark:bg-slate-950/40">
              <span>Gig</span><span>Category</span><span>Status</span><span>Assignee</span><span>Rate</span><span>Posted</span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((g, i) => (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-4 py-4 md:grid-cols-[minmax(0,2fr)_1fr_1fr_1fr_1fr_auto] md:items-center md:gap-4 md:px-6 hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 dark:bg-slate-800">
                      <Briefcase className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{g.title}</p>
                      <p className="truncate text-xs text-slate-500 md:hidden">{g.cat} · {g.rate} · {g.date}</p>
                    </div>
                  </div>
                  <div className="hidden text-sm text-slate-600 md:block dark:text-slate-400">{g.cat}</div>
                  <div className="hidden md:block"><Badge variant="secondary" className={toneMap[g.status]}>{g.status}</Badge></div>
                  <div className="hidden items-center gap-2 md:flex">
                    {g.assignee !== "—" ? (
                      <>
                        <Avatar className="h-6 w-6"><AvatarFallback className="bg-slate-100 text-[10px] dark:bg-slate-800">{g.assignee.split(" ").map(x=>x[0]).join("")}</AvatarFallback></Avatar>
                        <span className="text-sm">{g.assignee}</span>
                      </>
                    ) : <span className="text-sm text-slate-400">Unassigned</span>}
                  </div>
                  <div className="hidden text-sm md:block">{g.rate}</div>
                  <div className="flex items-center gap-3">
                    <span className="hidden text-xs text-slate-500 md:block">{g.date}</span>
                    <Button variant="ghost" size="icon" aria-label="More"><MoreHorizontal className="h-4 w-4" /></Button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-slate-200/80 px-6 py-3 text-xs text-slate-500 dark:border-slate-800">
              <span>Showing {filtered.length} of {GIGS.length}</span>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" className="h-7">Previous</Button>
                <Button variant="outline" size="sm" className="h-7">Next</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
