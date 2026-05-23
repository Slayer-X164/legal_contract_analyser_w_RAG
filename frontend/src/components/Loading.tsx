import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";

interface AnalyzingStateProps {
  fileName: string;
}

const STEPS = [
  { label: "Parsing document", delay: 2000 },
  { label: "Splitting into clauses", delay: 4000 },
  { label: "Analysing each clause", delay: 6000 },
  { label: "Scoring risk levels", delay: 8000 },
  { label: "Generating suggestions", delay: 10000 },
];

export default function Loading({ fileName }: AnalyzingStateProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setDoneSteps((prev) => {
          const next = new Set(prev);
          if (i > 0) next.add(i - 1);
          return next;
        });
        setCurrentStep(i);
      }, step.delay);
      timers.push(t);
    });

    const lastDone = setTimeout(() => {
      setDoneSteps(new Set([0, 1, 2, 3]));
      setCurrentStep(4);
    }, STEPS[STEPS.length - 1].delay + 1200);
    timers.push(lastDone);

    return () => timers.forEach(clearTimeout);
  }, []);

  const stepLabelClass = (i: number) => {
    const isDone = doneSteps.has(i);
    const isActive = currentStep === i;

    if (isDone) return "text-black/60 dark:text-white/50";
    if (isActive) return "text-black/80 dark:text-white/85 font-medium";
    return "text-black/25 dark:text-white/22";
  };

  const iconBgClass = (i: number) => {
    if (doneSteps.has(i)) return "bg-emerald-500/14 dark:bg-emerald-500/18";
    if (currentStep === i) return "bg-blue-600/10 dark:bg-blue-600/15";
    return "bg-black/5 dark:bg-white/5";
  };

  return (
    <div className="rounded-3xl border-2 border-neutral-300 dark:border-neutral-800 flex flex-col items-center justify-center gap-4 w-full h-full px-10  bg-neutral-100 dark:bg-neutral-900">

      {/* Spinner */}
      <div className="relative w-8 h-8">
        {/* Track ring */}
        <div className="absolute inset-0 rounded-full border-2 border-black/8 dark:border-white/7" />
        {/* Spinning arc */}
        <div
          className="absolute inset-0 rounded-full animate-spin border-2 border-transparent border-t-blue-600"
          style={{ animationDuration: "850ms", animationTimingFunction: "linear" }}
        />

      </div>


      <div className="text-center space-y-1.5">
        <p className="text-sm font-medium tracking-tight text-black/80 dark:text-white/85">
          Analysing contract
        </p>
        <p className="text-xs truncate max-w-60 font-mono text-black/35 dark:text-white/28">
          {fileName}
        </p>
      </div>


      <div className="flex flex-col gap-3.5 w-full max-w-57">
        {STEPS.map((step, i) => {
          const isDone = doneSteps.has(i);
          const isActive = currentStep === i;

          return (
            <div
              key={i}
              className="flex items-center gap-3 transition-opacity duration-500"
              style={{ opacity: i > currentStep + 1 ? 0.45 : 1 }}
            >

              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${iconBgClass(i)}`}
              >
                {isDone ? (
                  <div className="">
                    <MdDone className="text-emerald-600 text-sm" />
                  </div>
                ) : isActive ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-black/18 dark:bg-white/18" />
                )}
              </div>

              <span className={`text-xs transition-all duration-500 ${stepLabelClass(i)}`}>
                {step.label}
              </span>

              {isActive && (
                <div className="ml-auto h-1.5 flex-1 rounded-full overflow-hidden bg-black/6 dark:bg-white/6 max-w-9">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      animation: "shimmer 1.4s ease-in-out infinite",
                      width: "60%",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>


      <style>{`
        @keyframes checkPop {
          0%   { opacity: 0; transform: scale(0.4); }
          60%  { transform: scale(1.25); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateX(260%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}