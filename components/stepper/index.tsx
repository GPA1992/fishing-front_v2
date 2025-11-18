"use client";
import { planningStore } from "@/core/request";
import { cn } from "@/lib/utils";
import {
  CalendarClock,
  ChartColumnDecreasing,
  CheckIcon,
  Fish,
  LucideIcon,
  MapPin,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Step = {
  href: string;
  title: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    href: "/planejamento/localizacao",
    title: "Localização",
    icon: MapPin,
  },
  {
    href: "/planejamento/dia-horario",
    title: "Dia e horário",
    icon: CalendarClock,
  },
  {
    href: "/planejamento/peixe",
    title: "Peixe",
    icon: Fish,
  },
];
export default function Stepper() {
  const pathname = usePathname();
  const currentIndex = steps.findIndex(({ href }) => pathname.startsWith(href));
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;
  const isLocationIsFilled = planningStore((state) => state.isLocationIsFilled);
  const isTargetIsFilled = planningStore((state) => state.isTargetIsFilled);

  const hasHydrated = planningStore((s) => s.hasHydrated);

  if (!hasHydrated) {
    return null;
  }

  return (
    <nav aria-label="Progresso do planejamento" className="w-full">
      <ol className="flex w-full flex-wrap items-center gap-2.5 sm:gap-4 ">
        {steps.map(({ href, icon: Icon }, index) => {
          const active = activeIndex === index;
          const completed = activeIndex > index;
          const circleClasses = cn(
            "flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary transition sm:h-10 sm:w-10",
            active &&
              "border-accent bg-surface text-primary-Strong shadow-inner shadow-emerald-900/15",
            completed &&
              !active &&
              "border-green-200 bg-accent/60 text-primary-Strong",
            !completed && !active && "border-border bg-surfaceMuted text-muted"
          );
          const lineClasses = cn(
            "h-px flex-1 rounded-full border border-transparent transition-colors",
            completed ? "bg-accent border-accent" : "bg-surfaceMuted"
          );

          const isStepperIsFilled = (steper: string) => {
            if (steper === "/planejamento/localizacao") {
              return isLocationIsFilled();
            }
            if (steper === "/planejamento/dia-horario") {
              return isTargetIsFilled();
            }

            return false;
          };

          const isFilled = isStepperIsFilled(href);
          const shouldShowMissing = !isFilled && completed;

          return (
            <li
              key={href}
              className={cn(
                "flex items-center gap-2.5 sm:gap-3 px-1",
                index < steps.length - 1 ? "flex-1 w-max" : "w-fit"
              )}
            >
              <Link
                href={href}
                aria-current={active ? "step" : undefined}
                className="group flex items-center gap-2 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <span className={cn(circleClasses, "relative")}>
                  <Icon
                    className={cn("h-5 w-5", active && "text-accent")}
                    strokeWidth={2.4}
                  />

                  {isFilled && (
                    <span
                      className={cn(
                        "absolute -top-0.5 -right-2 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-border bg-green-500 p-0.5 text-white"
                      )}
                    >
                      <CheckIcon className="h-5 w-5" strokeWidth={3} />
                    </span>
                  )}
                  {shouldShowMissing && (
                    <span
                      className={cn(
                        "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-white text-green-500"
                      )}
                    >
                      <X className="h-5 w-5 text-red-500" strokeWidth={3} />
                    </span>
                  )}
                </span>
              </Link>

              {index < steps.length - 1 && (
                <span aria-hidden className={lineClasses} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
