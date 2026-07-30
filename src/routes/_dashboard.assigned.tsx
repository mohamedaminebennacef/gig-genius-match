import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { MapPin, Clock, DollarSign, Calendar, Briefcase } from "lucide-react";

import { DashboardShell, EmptyState } from "@/components/dashboard/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_dashboard/assigned")({
  head: () => ({
    meta: [
      { title: "Assigned Gigs — CampusGigs" },
      { name: "description", content: "Your currently assigned campus gigs and their details." },
      { property: "og:title", content: "Assigned Gigs — CampusGigs" },
      { property: "og:description", content: "Manage the gigs you've been assigned to." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Assigned,
});

type Gig = {
  title: string;
  manager: string;
  location: string;
  duration: string;
  hours: string;
  rate: string;
  date: string;
  status: string;
  tone: "emerald" | "amber";
  description: string;
  skills: string[];
  schedule: string;
  contact: string;
};

const gigs: Gig[] = [];

const toneMap: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
};

function Assigned() {
  const [openGig, setOpenGig] = useState<Gig | null>(null);

  return (
    <DashboardShell breadcrumb="Assigned Gigs" title="Assigned gigs">
      {gigs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No gigs yet"
          description="Complete your profile to start getting matched to campus gigs."
          action={<Button>Complete profile</Button>}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {gigs.map((g, i) => (
            <motion.article
              key={g.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold">{g.title}</p>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <Avatar className="h-4 w-4"><AvatarFallback className="bg-slate-100 text-[8px] dark:bg-slate-800">{g.manager.slice(0,2)}</AvatarFallback></Avatar>
                    <span className="truncate">{g.manager}</span>
                  </div>
                </div>
                <Badge variant="secondary" className={toneMap[g.tone]}>{g.status}</Badge>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Item icon={MapPin} label="Location" value={g.location} />
                <Item icon={Clock} label="Hours" value={g.hours} />
                <Item icon={Calendar} label="Duration" value={g.duration} />
                <Item icon={DollarSign} label="Rate" value={g.rate} />
              </dl>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="text-xs text-slate-500">{g.date}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    onClick={() => toast.success(`Message sent to ${g.manager.split(" · ")[0]}`, { description: "They usually reply within a day." })}
                  >
                    Message
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-lg bg-slate-900 hover:bg-slate-800"
                    onClick={() => setOpenGig(g)}
                  >
                    Open
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      <Dialog open={openGig !== null} onOpenChange={(o) => !o && setOpenGig(null)}>
        <DialogContent className="sm:max-w-lg">
          {openGig && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={toneMap[openGig.tone]}>{openGig.status}</Badge>
                  <span className="text-xs text-slate-500">{openGig.date}</span>
                </div>
                <DialogTitle className="mt-2 text-left text-lg">{openGig.title}</DialogTitle>
                <DialogDescription className="text-left">{openGig.manager}</DialogDescription>
              </DialogHeader>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{openGig.description}</p>

              <dl className="grid grid-cols-2 gap-4 rounded-xl border border-slate-100 p-4 text-sm dark:border-slate-800">
                <Item icon={MapPin} label="Location" value={openGig.location} />
                <Item icon={Clock} label="Hours" value={openGig.hours} />
                <Item icon={Calendar} label="Duration" value={openGig.duration} />
                <Item icon={DollarSign} label="Rate" value={openGig.rate} />
              </dl>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-500">Skills</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {openGig.skills.map((s) => (
                    <Badge key={s} variant="secondary" className="rounded-md font-normal">{s}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <p className="text-slate-500"><span className="text-[11px] uppercase tracking-wider">Schedule</span> · {openGig.schedule}</p>
                <p className="text-slate-500"><span className="text-[11px] uppercase tracking-wider">Contact</span> · {openGig.contact}</p>
              </div>

              <DialogFooter>
                <Button variant="outline" className="rounded-lg" onClick={() => setOpenGig(null)}>Close</Button>
                <Button
                  className="rounded-lg bg-slate-900 hover:bg-slate-800"
                  onClick={() => {
                    toast.success("Attendance confirmed", { description: openGig.title });
                    setOpenGig(null);
                  }}
                >
                  Confirm attendance
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}


function Item({ icon: Icon, label, value }: { icon: React.ComponentType<{className?:string}>; label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
        <Icon className="h-3 w-3" /> {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-medium">{value}</dd>
    </div>
  );
}
