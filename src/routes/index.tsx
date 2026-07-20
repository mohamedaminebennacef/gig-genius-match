import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clipboard,
  Sparkles,
  Trophy,
  Zap,
  Users,
  BarChart3,
  LayoutDashboard,
  Rocket,
  Clock,
  Target,
  Workflow,
  Github,
  BookOpen,
  Mail,
  ChevronRight,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusGigs — AI Micro-Job Matching for Campuses" },
      {
        name: "description",
        content:
          "CampusGigs uses AI to instantly match campus jobs with the best student candidates. Post a gig, get ranked recommendations in seconds.",
      },
      { property: "og:title", content: "CampusGigs — AI Micro-Job Matching" },
      {
        property: "og:description",
        content:
          "AI-powered micro-job matching platform for university campuses. Post, match, assign — in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

/* ───────────────────────── Motion helpers ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ───────────────────────── Landing Page ───────────────────────── */
function Landing() {
  return (
    <div className="relative min-h-dvh bg-white text-slate-900 antialiased">
      {/* Background flourishes */}
      <BackgroundShapes />

      <Navbar />

      <main className="relative">
        <Hero />
        <LogoStrip />
        <WhatIs />
        <HowItWorks />
        <Features />
        <WhyCampusGigs />
        <Screenshots />
        <TechStack />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

/* ───────────────────────── Background ───────────────────────── */
function BackgroundShapes() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div className="absolute -top-40 -left-32 h-[560px] w-[560px] rounded-full bg-gradient-to-br from-indigo-200/60 via-sky-200/40 to-transparent blur-3xl" />
      <div className="absolute top-[30%] -right-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-violet-200/50 via-fuchsia-200/30 to-transparent blur-3xl" />
      <div className="absolute bottom-[-200px] left-1/3 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-emerald-200/40 via-cyan-200/30 to-transparent blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
    </div>
  );
}

/* ───────────────────────── Navbar ───────────────────────── */
function Navbar() {
  const nav = [
    { label: "How it works", href: "#how" },
    { label: "Features", href: "#features" },
    { label: "Tech", href: "#tech" },
    { label: "Docs", href: "#footer" },
  ];
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shadow-sm">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight text-slate-900">CampusGigs</span>
          <Badge variant="secondary" className="ml-1 hidden sm:inline-flex text-[10px] font-medium bg-slate-100 text-slate-600 border-0">
            beta
          </Badge>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-slate-900 transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-slate-600">
            Sign in
          </Button>
          <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm">
            Get Started
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp}>
            <Badge
              variant="secondary"
              className="rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm py-1 px-3"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              AI matching, live on campus
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.05]"
          >
            Find the right student for every{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              campus gig
            </span>{" "}
            in seconds.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
            CampusGigs uses AI to instantly match campus jobs with the most suitable student
            candidates — no manual searching, just ranked recommendations delivered in seconds.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-md h-12 px-6">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl h-12 px-6 border-slate-200 bg-white hover:bg-slate-50"
            >
              See How It Works
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6 text-sm text-slate-500">
            <div className="flex -space-x-2">
              {["from-indigo-400 to-violet-500", "from-emerald-400 to-teal-500", "from-amber-400 to-orange-500", "from-fuchsia-400 to-pink-500"].map(
                (g, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-br ${g}`}
                  />
                ),
              )}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2">Trusted by 40+ campus teams</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative"
        >
          <HeroMock />
        </motion.div>
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-indigo-100/60 via-violet-100/40 to-transparent rounded-3xl blur-2xl -z-10" />

      {/* Main dashboard card */}
      <div className="relative rounded-2xl border border-slate-200/80 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/60">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-amber-400/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          <div className="ml-3 text-xs text-slate-400 font-mono">app.campusgigs.io/dashboard</div>
        </div>

        <div className="p-6 grid grid-cols-5 gap-4">
          {/* Left form */}
          <div className="col-span-2 space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">New Gig</div>
            <MockField label="Title" value="Event setup — Library open day" />
            <MockField label="Location" value="Main Library, Floor 2" />
            <div className="grid grid-cols-2 gap-2">
              <MockField label="Duration" value="4 hrs" />
              <MockField label="Pay" value="€14 / hr" />
            </div>
            <div className="mt-2 rounded-lg bg-slate-900 text-white text-xs py-2.5 text-center font-medium shadow-sm flex items-center justify-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Match candidates
            </div>
          </div>

          {/* Right leaderboard */}
          <div className="col-span-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Ranked candidates
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 border text-[10px] font-medium">
                AI ranked
              </Badge>
            </div>
            {[
              { name: "Amina R.", role: "3rd yr · Events club", score: 95, best: true },
              { name: "Léo M.", role: "2nd yr · Logistics", score: 88 },
              { name: "Priya S.", role: "4th yr · Volunteer lead", score: 82 },
              { name: "Kenji T.", role: "1st yr · Library asst.", score: 74 },
            ].map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                className={`flex items-center gap-3 rounded-xl border p-2.5 ${
                  c.best
                    ? "bg-gradient-to-r from-slate-900 to-slate-800 border-slate-800 text-white shadow-md"
                    : "bg-white border-slate-100 hover:border-slate-200 transition"
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center font-semibold text-sm ${
                    c.best ? "bg-white/10 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${c.best ? "text-white" : "text-slate-900"}`}>
                    {c.name}
                  </div>
                  <div className={`text-xs ${c.best ? "text-slate-300" : "text-slate-500"}`}>
                    {c.role}
                  </div>
                </div>
                {c.best && (
                  <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-[10px] font-medium">
                    Best match
                  </Badge>
                )}
                <div
                  className={`text-sm font-semibold tabular-nums ${
                    c.best ? "text-white" : "text-slate-900"
                  }`}
                >
                  {c.score}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute -left-6 top-32 hidden lg:block"
      >
        <div className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur px-4 py-3 shadow-lg flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Zap className="h-4.5 w-4.5 text-emerald-600" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Avg. match time</div>
            <div className="text-sm font-semibold text-slate-900">1.8s</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.6 }}
        className="absolute -right-4 -bottom-6 hidden lg:block"
      >
        <div className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur px-4 py-3 shadow-lg flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Trophy className="h-4.5 w-4.5 text-indigo-600" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Match quality</div>
            <div className="text-sm font-semibold text-slate-900">95% confidence</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MockField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
      <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{label}</div>
      <div className="text-xs text-slate-800 truncate mt-0.5">{value}</div>
    </div>
  );
}

/* ───────────────────────── Logo strip ───────────────────────── */
function LogoStrip() {
  const unis = ["Sorbonne", "TU Delft", "ETH Zürich", "KU Leuven", "UCL", "Uppsala"];
  return (
    <section className="border-y border-slate-100 bg-white/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <p className="text-center text-xs uppercase tracking-widest text-slate-400 mb-6">
          Piloted at university campuses across Europe
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-slate-500">
          {unis.map((u) => (
            <span key={u} className="font-semibold tracking-tight text-lg opacity-70 hover:opacity-100 transition">
              {u}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── What is CampusGigs ───────────────────────── */
function WhatIs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 border rounded-full px-3">
            What is CampusGigs
          </Badge>
          <h2 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
            AI-powered micro-job matching, built for campuses.
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            CampusGigs is a proof-of-concept platform where campus managers can post short-term jobs
            — moving equipment, organizing events, distributing flyers, assisting departments — and
            get instantly matched with the best students.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Instead of scrolling through profiles, the system analyzes the job description against
            available student profiles and produces a ranked list of the best candidates in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { k: "1.8s", v: "Avg. match time", icon: Zap, color: "from-emerald-500 to-teal-500" },
            { k: "95%", v: "Match confidence", icon: Target, color: "from-indigo-500 to-violet-500" },
            { k: "40+", v: "Campus pilots", icon: Users, color: "from-fuchsia-500 to-pink-500" },
            { k: "12k", v: "Gigs matched", icon: BarChart3, color: "from-amber-500 to-orange-500" },
          ].map((s) => (
            <Card key={s.v} className="rounded-2xl border-slate-200/80 bg-white shadow-sm hover:shadow-md transition">
              <CardContent className="p-6">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-sm`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <div className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">{s.k}</div>
                <div className="text-sm text-slate-500 mt-1">{s.v}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── How it works ───────────────────────── */
function HowItWorks() {
  const steps = [
    {
      icon: Clipboard,
      title: "Post a gig",
      desc: "Manager enters title, description, location, duration and hourly pay in one clean form.",
    },
    {
      icon: Sparkles,
      title: "AI analysis",
      desc: "Backend fetches student profiles, builds a prompt and computes compatibility scores.",
    },
    {
      icon: Trophy,
      title: "Ranked candidates",
      desc: "See a ranked leaderboard with the Best Match highlighted at the top of the list.",
    },
    {
      icon: CheckCircle2,
      title: "Assign instantly",
      desc: "Manager clicks Assign Gig — the job becomes assigned immediately, no back-and-forth.",
    },
  ];

  return (
    <section id="how" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Badge className="bg-violet-50 text-violet-700 border-violet-100 border rounded-full px-3">
          How it works
        </Badge>
        <h2 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
          From posted gig to assigned student in four steps.
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          A workflow so simple it fits on a single screen.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
      >
        {steps.map((s, i) => (
          <motion.div key={s.title} variants={fadeUp} className="relative">
            <Card className="h-full rounded-2xl border-slate-200/80 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shadow-sm">
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900 tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
            {i < steps.length - 1 && (
              <ChevronRight className="hidden lg:block absolute top-1/2 -right-5 -translate-y-1/2 h-5 w-5 text-slate-300" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ───────────────────────── Features ───────────────────────── */
function Features() {
  const features = [
    {
      icon: Sparkles,
      title: "AI matching",
      desc: "Instant, intelligent candidate ranking powered by a Groq-hosted model.",
    },
    {
      icon: Zap,
      title: "Fast decisions",
      desc: "Results generated within seconds — no waiting, no manual sifting.",
    },
    {
      icon: Users,
      title: "Student profiles",
      desc: "Rich profiles analyze skills, interests, availability and past experience.",
    },
    {
      icon: Trophy,
      title: "Leaderboard",
      desc: "Beautiful ranked candidate interface with a highlighted Best Match.",
    },
    {
      icon: LayoutDashboard,
      title: "Modern dashboard",
      desc: "Simple, intuitive management interface built for campus managers.",
    },
    {
      icon: Rocket,
      title: "Deployment ready",
      desc: "Ships with Next.js, NestJS, Prisma, Supabase, Render and Vercel.",
    },
  ];

  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 border rounded-full px-3">
            Features
          </Badge>
          <h2 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
            Everything you need to run gigs on campus.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Thoughtful defaults, minimal setup, and a dashboard your managers will actually enjoy.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp}>
              <Card className="h-full rounded-2xl border-slate-200/80 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                    <f.icon className="h-5 w-5 text-slate-700 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Why CampusGigs ───────────────────────── */
function WhyCampusGigs() {
  const items = [
    { icon: Clock, title: "Save time", desc: "Cut manual candidate screening from hours to seconds." },
    { icon: Target, title: "Better matches", desc: "AI evaluates candidates objectively against the gig." },
    { icon: Workflow, title: "Simple workflow", desc: "Three steps: post, match, assign — nothing else." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <div className="grid lg:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <Card className="rounded-2xl border-slate-200/80 bg-gradient-to-br from-white to-slate-50/70 shadow-sm h-full">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <it.icon className="h-6 w-6 text-slate-800" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
                  {it.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{it.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Screenshots ───────────────────────── */
function Screenshots() {
  const shots = [
    { title: "Campus gig form", node: <ShotForm /> },
    { title: "AI processing", node: <ShotProcessing /> },
    { title: "Ranked leaderboard", node: <ShotLeaderboard /> },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Badge className="bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100 border rounded-full px-3">
          Product tour
        </Badge>
        <h2 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
          A closer look at the CampusGigs dashboard.
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {shots.map((s) => (
          <motion.div key={s.title} variants={fadeUp}>
            <div className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_-15px_rgba(15,23,42,0.15)] overflow-hidden hover:shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-100 bg-slate-50/60">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div className="p-5 min-h-[240px]">{s.node}</div>
              <div className="px-5 pb-5 pt-1">
                <div className="text-sm font-medium text-slate-900">{s.title}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function ShotForm() {
  return (
    <div className="space-y-3">
      <MockField label="Title" value="Distribute flyers — Career Fair" />
      <MockField label="Location" value="Campus Center, Hall B" />
      <div className="grid grid-cols-2 gap-2">
        <MockField label="Duration" value="3 hrs" />
        <MockField label="Pay" value="€12 / hr" />
      </div>
      <div className="rounded-lg bg-slate-900 text-white text-xs py-2 text-center font-medium">
        Post & Match
      </div>
    </div>
  );
}

function ShotProcessing() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-6">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-2 border-slate-100" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-slate-900 animate-spin" />
        <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-slate-900" />
      </div>
      <div className="text-sm font-medium text-slate-900">Analyzing 128 profiles…</div>
      <div className="w-full space-y-2">
        {[80, 55, 30].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ShotLeaderboard() {
  const rows = [
    { name: "Amina R.", score: 95, best: true },
    { name: "Léo M.", score: 88 },
    { name: "Priya S.", score: 82 },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div
          key={r.name}
          className={`flex items-center gap-3 rounded-xl p-2.5 border ${
            r.best
              ? "bg-slate-900 border-slate-800 text-white"
              : "bg-white border-slate-100"
          }`}
        >
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              r.best ? "bg-white/10 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            {r.name[0]}
          </div>
          <div className="flex-1 text-sm font-medium">{r.name}</div>
          {r.best && (
            <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-[10px]">
              Best
            </Badge>
          )}
          <div className="text-sm font-semibold tabular-nums">{r.score}%</div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── Tech stack ───────────────────────── */
function TechStack() {
  const tech = [
    "Next.js",
    "NestJS",
    "TypeScript",
    "Prisma",
    "Supabase",
    "PostgreSQL",
    "Tailwind CSS",
    "shadcn/ui",
    "Groq AI",
    "Render",
    "Vercel",
    "GitHub Actions",
  ];
  return (
    <section id="tech" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Badge className="bg-slate-100 text-slate-700 border-slate-200 border rounded-full px-3">
          Tech stack
        </Badge>
        <h2 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
          Built on a modern, dependable foundation.
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mt-12 flex flex-wrap items-center justify-center gap-3"
      >
        {tech.map((t) => (
          <motion.span
            key={t}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:shadow-md transition"
          >
            {t}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

/* ───────────────────────── CTA ───────────────────────── */
function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 px-8 py-20 text-center shadow-[0_30px_80px_-30px_rgba(15,23,42,0.6)]"
      >
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-indigo-500 blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-fuchsia-500 blur-3xl" />
        </div>
        <div className="relative">
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight max-w-3xl mx-auto">
            Ready to see AI match campus jobs instantly?
          </h2>
          <p className="mt-5 text-lg text-slate-300 max-w-xl mx-auto">
            Launch the CampusGigs simulator, post your first gig, and get a ranked shortlist in
            under two seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl h-12 px-6 shadow-lg">
              Launch CampusGigs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl h-12 px-6 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              View on GitHub
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
function Footer() {
  return (
    <footer id="footer" className="border-t border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-3 gap-8 items-start">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900">CampusGigs</span>
          </div>
          <p className="mt-3 text-sm text-slate-500 max-w-xs">
            Micro-Job Matching Simulator. Built during Summer Internship 2026.
          </p>
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-x-10 gap-y-3 md:justify-end text-sm text-slate-600">
          <a href="#" className="flex items-center gap-2 hover:text-slate-900 transition">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-slate-900 transition">
            <BookOpen className="h-4 w-4" /> Documentation
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-slate-900 transition">
            <Mail className="h-4 w-4" /> Contact
          </a>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div>© {new Date().getFullYear()} CampusGigs. All rights reserved.</div>
          <div>Made with care for university campuses.</div>
        </div>
      </div>
    </footer>
  );
}
