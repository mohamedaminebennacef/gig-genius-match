import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  User,
  LogOut,
  Search,
  Bell,
  Sun,
  Moon,
  Sparkles,
  Trophy,
  Briefcase,
  ChevronsUpDown,
  Command,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Role = "manager" | "student";

const managerNav = [
  { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { title: "Create Gig", to: "/gigs/new", icon: PlusCircle },
  { title: "Leaderboard", to: "/leaderboard", icon: Trophy },
  { title: "Gig History", to: "/gigs", icon: History },
  { title: "Profile", to: "/profile", icon: User },
] as const;

const studentNav = [
  { title: "Dashboard", to: "/student", icon: LayoutDashboard },
  { title: "Assigned Gigs", to: "/assigned", icon: Briefcase },
  { title: "History", to: "/gigs", icon: History },
  { title: "Profile", to: "/profile", icon: User },
] as const;

export function DashboardShell({
  children,
  breadcrumb,
  title,
  actions,
}: {
  children: ReactNode;
  breadcrumb?: string;
  title?: string;
  actions?: ReactNode;
}) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [role, setRole] = useState<Role>("manager");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("cg_role")) as Role | null;
    if (stored) setRole(stored);
    const t = typeof window !== "undefined" && localStorage.getItem("cg_theme");
    if (t === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("cg_theme", next);
  };

  const switchRole = (r: Role) => {
    setRole(r);
    localStorage.setItem("cg_role", r);
  };

  const nav = role === "manager" ? managerNav : studentNav;

  return (
    <div className="flex min-h-dvh bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex h-16 items-center gap-2 border-b border-slate-200/80 px-5 dark:border-slate-800">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-sm dark:from-white dark:to-slate-300 dark:text-slate-900">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">CampusGigs</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              {role === "manager" ? "Manager" : "Student"} Workspace
            </span>
          </div>
        </div>

        {/* Role switcher */}
        <div className="px-3 pt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm shadow-xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-slate-900 text-[10px] text-white dark:bg-white dark:text-slate-900">
                      {role === "manager" ? "M" : "S"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate font-medium">
                    {role === "manager" ? "Manager view" : "Student view"}
                  </span>
                </div>
                <ChevronsUpDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="text-xs">Switch role</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => switchRole("manager")}>
                <LayoutDashboard className="mr-2 h-4 w-4" /> Manager
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchRole("student")}>
                <User className="mr-2 h-4 w-4" /> Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          <p className="px-2 pb-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Workspace
          </p>
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
                )}
              >
                <item.icon className={cn("h-4 w-4", active ? "" : "text-slate-400 group-hover:text-slate-600")} />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-3">
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-semibold">Pro tips</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              Add detailed skills to gigs for sharper AI matches.
            </p>
          </div>
          <Link
            to="/auth/login"
            className="mt-3 flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-slate-200/80 bg-white/70 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/50 lg:px-8">
          <div className="flex flex-1 items-center gap-3 min-w-0">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
              <Link to="/dashboard" className="hover:text-slate-900 dark:hover:text-white">
                CampusGigs
              </Link>
              {breadcrumb && (
                <>
                  <span>/</span>
                  <span className="text-slate-900 dark:text-white font-medium">{breadcrumb}</span>
                </>
              )}
            </div>
            <div className="relative ml-auto max-w-md flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search gigs, students, skills…"
                className="h-9 rounded-lg border-slate-200 bg-slate-50 pl-9 pr-16 text-sm shadow-none focus-visible:bg-white dark:border-slate-800 dark:bg-slate-900"
              />
              <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500 md:flex dark:border-slate-700 dark:bg-slate-800">
                <Command className="h-3 w-3" /> K
              </kbd>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-xs text-white">
                      AK
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium md:block">Alex Kim</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Alex Kim</span>
                    <span className="text-xs text-slate-500">alex@stanford.edu</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile"><User className="mr-2 h-4 w-4" /> Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/auth/login"><LogOut className="mr-2 h-4 w-4" /> Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page header */}
        {(title || actions) && (
          <div className="border-b border-slate-200/80 bg-white/40 px-4 py-6 dark:border-slate-800 dark:bg-slate-900/30 lg:px-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <div className="min-w-0">
                {title && (
                  <h1 className="truncate text-2xl font-semibold tracking-tight">{title}</h1>
                )}
              </div>
              {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
            </div>
          </div>
        )}

        {/* Content */}
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 p-4 pb-24 lg:p-8"
        >
          {children}
        </motion.main>

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200 bg-white/90 px-2 py-2 backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-900/90">
          {nav.slice(0, 4).map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium",
                  active ? "text-slate-900 dark:text-white" : "text-slate-400",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: { value: string; positive?: boolean };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</span>
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white dark:bg-slate-800 dark:text-slate-300 transition-colors">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight">{value}</span>
        {trend && (
          <Badge
            variant="secondary"
            className={cn(
              "font-medium",
              trend.positive
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                : "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
            )}
          >
            {trend.value}
          </Badge>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </motion.div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 p-12 text-center dark:border-slate-800 dark:bg-slate-900/40">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-slate-100 to-white text-slate-500 shadow-xs dark:from-slate-800 dark:to-slate-900">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
