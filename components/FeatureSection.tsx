import {
  Blocks,
  ClipboardCopy,
  ScanSearch,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const features = [
  {
    title: "Interactive Preview",
    description: "Test each navigation pattern across desktop and mobile layouts.",
    icon: Blocks,
    className: "md:col-span-2",
  },
  {
    title: "Copy Code",
    description: "Export React JSX, TSX, and Next.js-ready variants in one click.",
    icon: ClipboardCopy,
    className: "",
  },
  {
    title: "AI Prompt Export",
    description:
      "Generate prompts tailored for ChatGPT, GitHub Copilot, and Claude.",
    icon: WandSparkles,
    className: "",
  },
  {
    title: "Smart Search",
    description: "Find components by category, pattern name, and design tags.",
    icon: ScanSearch,
    className: "",
  },
  {
    title: "Subtle Motion",
    description: "Purposeful transitions that improve clarity without visual noise.",
    icon: Sparkles,
    className: "md:col-span-2",
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="mx-auto w-[min(1120px,94%)] py-10 md:py-14">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
          Core Features
        </h2>
      </div>

      <div className="grid auto-rows-[minmax(150px,auto)] gap-3 sm:gap-4 md:grid-cols-4">
        {features.map((feature) => (
          <article
            key={feature.title}
            className={`rounded-2xl border border-black/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-neutral-950 sm:p-6 ${feature.className}`}
          >
            <feature.icon
              className="mb-3 rounded-lg border border-black/10 bg-neutral-50 p-2 text-neutral-700 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200"
              size={34}
              strokeWidth={1.6}
            />
            <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100 sm:text-lg">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
