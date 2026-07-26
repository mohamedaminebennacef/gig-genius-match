import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Github, Chrome, Trophy, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Sign in — CampusGigs" },
      { name: "description", content: "Sign in to your CampusGigs account to manage or discover campus gigs." },
      { property: "og:title", content: "Sign in — CampusGigs" },
      { property: "og:description", content: "Access your CampusGigs workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const [role, setRole] = useState<"manager" | "student">("student");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSignIn called");
    setIsLoading(true);

    // Simulate a brief sign-in request, then show success toast and navigate.
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Signed in successfully", {
        description: `Welcome back to your ${role} workspace.`,
      });
      navigate({ to: role === "manager" ? "/dashboard" : "/student" });
    }, 800);
  };

  return (
    <div className="grid min-h-dvh lg:grid-cols-2 bg-white text-slate-900">
      {/* Left — form */}
      <div className="flex flex-col p-6 lg:p-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">CampusGigs</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center"
        >
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to your workspace to continue.
          </p>

          {/* Role toggle */}
          <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
            {(["student", "manager"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                  role === r ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Social */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            <Button variant="outline" className="rounded-lg">
              <Chrome className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" className="rounded-lg">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[10px] uppercase tracking-wider text-slate-400">or</span>
            <Separator className="flex-1" />
          </div>

          <form className="space-y-4" onSubmit={handleSignIn}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@stanford.edu" className="rounded-lg" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-slate-500 hover:text-slate-900">
                  Forgot?
                </a>
              </div>
              <Input id="password" type="password" placeholder="••••••••" className="rounded-lg" />
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-600">
              <Checkbox id="remember" /> <span>Keep me signed in for 30 days</span>
            </label>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-slate-900 hover:bg-slate-800"
            >
              {isLoading ? "Signing in…" : "Sign in"} <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/auth/register" className="font-medium text-slate-900 hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>

        <p className="text-[11px] text-slate-400">© 2025 CampusGigs. All rights reserved.</p>
      </div>

      {/* Right — visual */}
      <div className="relative hidden overflow-hidden bg-slate-950 text-white lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.35),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(217,164,65,0.25),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Sparkles className="h-4 w-4 text-amber-400" /> Trusted by 200+ campus teams
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-300">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Best match found</p>
                  <p className="text-xs text-white/50">Maya Patel · 96% fit</p>
                </div>
                <div className="ml-auto rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  +12% vs. avg
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "96%" }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Zap className="h-3.5 w-3.5 text-indigo-300" /> AI evaluating 24 candidates…
              </div>
              <div className="mt-3 space-y-2">
                {[92, 88, 84].map((v, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-white/10" />
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${v}%` }}
                        transition={{ delay: 0.9 + i * 0.15, duration: 0.8 }}
                        className="h-full bg-white/60"
                      />
                    </div>
                    <span className="w-8 text-right text-xs tabular-nums text-white/60">{v}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <blockquote className="max-w-md">
            <p className="text-lg font-medium leading-snug text-white/90">
              "We filled a semester's worth of gigs in under an hour. The matches were shockingly on-point."
            </p>
            <footer className="mt-3 text-xs text-white/50">
              Priya Shah · Career Services, MIT
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
