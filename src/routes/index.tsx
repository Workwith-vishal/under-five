import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Calendar,
  CheckCircle2,
  CircleAlert,
  Clock3,
  DollarSign,
  LayoutDashboard,
  ListTodo,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const metrics = [
  {
    label: "Monthly revenue",
    value: "$842,600",
    note: "8.2% from October",
    direction: "up",
    tone: "positive",
    icon: DollarSign,
  },
  {
    label: "Operating costs",
    value: "$510,200",
    note: "4.2% from October",
    direction: "up",
    tone: "warning",
    icon: Activity,
  },
  {
    label: "Open roles",
    value: "8",
    note: "3 interviews today",
    direction: "flat",
    tone: "informational",
    icon: Users,
  },
  {
    label: "Overdue tasks",
    value: "12",
    note: "4 need attention",
    direction: "down",
    tone: "critical",
    icon: ListTodo,
  },
] as const;

const trendStyles = {
  positive: "bg-positive/10 text-positive",
  warning: "bg-warning/10 text-warning",
  informational: "bg-informational/10 text-informational",
  critical: "bg-critical/10 text-critical",
} as const;

const chartMonths = [
  { month: "Jun", revenue: "h-20", costs: "h-14" },
  { month: "Jul", revenue: "h-24", costs: "h-16" },
  { month: "Aug", revenue: "h-28", costs: "h-16" },
  { month: "Sep", revenue: "h-24", costs: "h-20" },
  { month: "Oct", revenue: "h-28", costs: "h-20" },
  { month: "Nov", revenue: "h-32", costs: "h-24" },
];

const pipeline = [
  { stage: "Applied", count: "26", width: "w-full", color: "bg-chart-4" },
  { stage: "Interview", count: "11", width: "w-2/3", color: "bg-chart-1" },
  { stage: "Offer", count: "4", width: "w-1/3", color: "bg-chart-2" },
];

const priorities = [
  {
    title: "Close November books",
    department: "Finance",
    due: "Due today",
    tone: "bg-critical/10 text-critical",
    icon: CircleAlert,
  },
  {
    title: "Review interview feedback",
    department: "People",
    due: "Due today",
    tone: "bg-warning/10 text-warning",
    icon: Clock3,
  },
  {
    title: "Send Atlas proposal",
    department: "Sales",
    due: "Nov 24",
    tone: "bg-secondary text-secondary-foreground",
    icon: Briefcase,
  },
];

const assistantQuestions = [
  {
    id: "hiring",
    label: "How is hiring tracking?",
    answer:
      "There are 8 open roles, with 11 candidates in interviews and 4 offers in progress. Three interviews are scheduled today.",
  },
  {
    id: "focus",
    label: "What needs attention this week?",
    answer:
      "Twelve tasks are overdue in this sample. Start with closing the November books and reviewing interview feedback; both are due today.",
  },
  {
    id: "finance",
    label: "Compare revenue and costs",
    answer:
      "November sample figures show $842,600 in revenue and $510,200 in operating costs. Revenue is up 8.2% and costs are up 4.2% from October.",
  },
];

const navigation = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "People & hiring", icon: Users, active: false },
  { label: "Finance", icon: DollarSign, active: false },
  { label: "Sales & CRM", icon: Briefcase, active: false },
  { label: "Operations", icon: ListTodo, active: false },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Morrow | Company overview" },
      {
        name: "description",
        content: "A sample-data company dashboard for revenue, hiring, and work in progress.",
      },
      { property: "og:title", content: "Morrow | Company overview" },
      {
        property: "og:description",
        content: "A sample-data company dashboard for revenue, hiring, and work in progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const selectedAnswer = assistantQuestions.find((item) => item.id === selectedQuestion);

  return (
    <div className="min-h-screen bg-background text-foreground xl:grid xl:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="hidden min-h-screen flex-col bg-primary px-5 py-6 text-primary-foreground xl:flex">
        <Brand />
        <div className="mt-12">
          <p className="px-3 text-xs font-semibold text-primary-foreground/60">WORKSPACE</p>
          <nav aria-label="Workspace sections" className="mt-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  aria-current={item.active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm ${
                    item.active
                      ? "bg-primary-foreground/15 font-medium text-primary-foreground"
                      : "text-primary-foreground/70"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-4" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto border-t border-primary-foreground/15 pt-5">
          <div className="flex items-center gap-3 px-2">
            <div className="flex size-9 items-center justify-center rounded-md bg-primary-foreground/15 text-sm font-semibold">
              MC
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Maya Chen</p>
              <p className="text-xs text-primary-foreground/60">Managing director</p>
            </div>
          </div>
          <p className="mt-5 text-xs text-primary-foreground/55">Demo workspace · sample data</p>
        </div>
      </aside>

      <main className="min-w-0">
        <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-4 sm:px-6 lg:px-10 lg:pt-8">
          <div className="mb-7 flex items-center justify-between border-b border-border pb-4 xl:hidden">
            <Brand compact />
            <Badge variant="secondary" className="font-medium">Demo workspace</Badge>
          </div>

          <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar aria-hidden="true" className="size-4" />
                <span>November overview</span>
                <span aria-hidden="true">·</span>
                <span>Sample data</span>
              </div>
              <h1 className="font-display text-3xl text-foreground sm:text-4xl">Company overview</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                A clear read on what is moving across your business.
              </p>
            </div>
            <Badge variant="outline" className="w-fit gap-1.5 border-positive/25 bg-positive/5 px-2.5 py-1 text-positive">
              <span className="size-1.5 rounded-full bg-positive" />
              Sample workspace
            </Badge>
          </header>

          <section aria-label="Company metrics" className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              const TrendIcon = metric.direction === "down" ? ArrowDownRight : ArrowUpRight;
              return (
                <article key={metric.label} className="rounded-md border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-foreground">{metric.value}</p>
                    </div>
                    <span className={`flex size-9 shrink-0 items-center justify-center rounded-md ${trendStyles[metric.tone]}`}>
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                  </div>
                  <div className={`mt-4 flex items-center gap-1.5 text-xs ${trendStyles[metric.tone].split(" ")[1]}`}>
                    {metric.direction !== "flat" && <TrendIcon aria-hidden="true" className="size-3.5" />}
                    <span>{metric.note}</span>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-[1.35fr_0.85fr]">
            <article className="rounded-md border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Revenue & operating costs</p>
                  <p className="mt-1 text-xs text-muted-foreground">Six-month view · sample figures</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" />Revenue</span>
                  <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-chart-2" />Costs</span>
                </div>
              </div>
              <div
                role="img"
                aria-label="Sample revenue and operating costs rise overall from June through November, with November revenue at 842,600 dollars and costs at 510,200 dollars."
                className="mt-6 grid h-40 grid-cols-6 items-end gap-2 border-b border-border pb-2 sm:gap-4"
              >
                {chartMonths.map((point) => (
                  <div key={point.month} className="flex h-full flex-col items-center justify-end gap-2">
                    <div className="flex h-32 items-end justify-center gap-1.5">
                      <div className={`w-3 rounded-t-sm bg-primary sm:w-5 ${point.revenue}`} />
                      <div className={`w-3 rounded-t-sm bg-chart-2 sm:w-5 ${point.costs}`} />
                    </div>
                    <span className="text-xs text-muted-foreground">{point.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                <p className="text-muted-foreground">November revenue</p>
                <p className="font-semibold">$842,600 <span className="ml-1 text-xs font-normal text-positive">+8.2%</span></p>
              </div>
            </article>

            <article className="rounded-md border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Hiring pipeline</p>
                  <p className="mt-1 text-xs text-muted-foreground">Across 8 open roles</p>
                </div>
                <span className="flex size-9 items-center justify-center rounded-md bg-informational/10 text-informational">
                  <Users aria-hidden="true" className="size-4" />
                </span>
              </div>
              <div className="mt-5 space-y-4">
                {pipeline.map((stage) => (
                  <div key={stage.stage}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>{stage.stage}</span>
                      <span className="font-medium tabular-nums">{stage.count}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${stage.width} ${stage.color}`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <CheckCircle2 aria-hidden="true" className="size-4 text-positive" />
                <span>3 interviews scheduled today</span>
              </div>
            </article>
          </section>

          <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-md border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Priority items</p>
                  <p className="mt-1 text-xs text-muted-foreground">Work that may need a closer look</p>
                </div>
                <Badge variant="secondary" className="font-medium">12 overdue</Badge>
              </div>
              <div className="mt-4 divide-y divide-border">
                {priorities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-center gap-3 py-3 first:pt-1 last:pb-1">
                      <span className={`flex size-8 shrink-0 items-center justify-center rounded-md ${item.tone}`}>
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{item.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{item.department}</p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">{item.due}</span>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="rounded-md border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Sparkles aria-hidden="true" className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Morrow assistant</p>
                  <p className="mt-1 text-xs text-muted-foreground">Demo assistant · answers use sample data</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {assistantQuestions.map((question) => (
                  <Button
                    key={question.id}
                    type="button"
                    variant={selectedQuestion === question.id ? "secondary" : "outline"}
                    size="sm"
                    className="h-auto min-h-8 whitespace-normal py-1.5 text-left leading-snug"
                    onClick={() => setSelectedQuestion(question.id)}
                  >
                    {question.label}
                  </Button>
                ))}
              </div>
              <div aria-live="polite" className="mt-4 min-h-28 rounded-md bg-muted/70 p-4">
                {selectedAnswer ? (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{selectedAnswer.label}</p>
                    <p className="mt-2 text-sm leading-6 text-foreground">{selectedAnswer.answer}</p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MessageSquare aria-hidden="true" className="size-3.5" />
                      Based on the sample workspace
                    </p>
                  </div>
                ) : (
                  <div className="flex min-h-20 items-center gap-3 text-sm text-muted-foreground">
                    <BarChart3 aria-hidden="true" className="size-5 shrink-0 text-primary" />
                    <p>Choose a question to explore the sample workspace.</p>
                  </div>
                )}
              </div>
            </article>
          </section>

          <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground xl:hidden">
            <CircleAlert aria-hidden="true" className="size-3.5" />
            Demo view · figures are illustrative
          </p>
        </div>
      </main>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 items-center justify-center rounded-md bg-primary-foreground text-primary">
        <BarChart3 aria-hidden="true" className="size-5" />
      </span>
      <div>
        <p className="font-display text-xl leading-none">Morrow</p>
        {!compact && <p className="mt-1 text-xs text-primary-foreground/60">Company workspace</p>}
      </div>
    </div>
  );
}
