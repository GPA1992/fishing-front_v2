"use client";

import { Badge } from "@/components/ui/badge";
import { planningStore } from "@/core/request";

import { BadgeCheckIcon, CalendarCheck, Fish, Pin } from "lucide-react";

export default function PlanningData() {
  const selected = planningStore((state) => state.selected);

  const targetDate = planningStore((state) => state.targetDate);
  const selectedFish = planningStore((state) => state.selectedFish);

  const dateLabel = targetDate
    ? new Date(targetDate).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null;

  return (
    <section className="relative z-20 h-full w-full overflow-hidden rounded-2xl bg-surface ">
      <div className="relative flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 lg:gap-4 lg:p-6">
        <div className="flex flex-col min-w-0 items-start gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--color-primary-strong) opacity-80">
            Planejamento
          </p>
          <div className="min-h-16 min-w-0 space-y-2">
            <div className="flex flex-row gap-2 items-center">
              <Pin className="h-4 w-4 text-accentStrong" />
              <h2 className="max-w-[260px]  truncate text-sm font-semibold text-primaryStrong sm:max-w-[490px]  lg:max-w-none">
                {selected?.address?.city &&
                  selected.locationName &&
                  `${selected.address.city}, ${selected.locationName}`}

                {selected && !selected.locationName && `${selected?.name}`}
              </h2>
              {!selected && (
                <p className="text-xs font-medium text-muted sm:text-[13px]">
                  Toque no mapa para definir o local.
                </p>
              )}
            </div>

            <div className="flex flex-row gap-2 items-center">
              <CalendarCheck className="h-4 w-4 text-accentStrong" />
              <h2 className="max-w-[260px]  truncate text-sm font-semibold text-primaryStrong sm:max-w-[490px]  lg:max-w-none">
                {targetDate && <>Data · {dateLabel}</>}
              </h2>
              {!selected && (
                <p className="text-xs font-medium text-muted sm:text-[13px]">
                  Defina a data da pesca.
                </p>
              )}
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Fish className="h-4 w-4 text-accentStrong" />
              {selectedFish && (
                <div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
                  {selectedFish[0] && (
                    <Badge
                      variant="secondary"
                      className="bg-[color-mix(in_srgb,var(--color-highlight)_65%,var(--color-surface)_35%)]  text-accentStrong "
                    >
                      <BadgeCheckIcon />
                      {selectedFish[0].name}
                    </Badge>
                  )}
                  {selectedFish[1] && (
                    <Badge
                      variant="secondary"
                      className="bg-[color-mix(in_srgb,var(--color-highlight)_65%,var(--color-surface)_35%)]  text-accentStrong "
                    >
                      <BadgeCheckIcon />
                      {selectedFish[1].name}
                    </Badge>
                  )}
                  {selectedFish[2] && (
                    <Badge
                      variant="secondary"
                      className="bg-[color-mix(in_srgb,var(--color-highlight)_65%,var(--color-surface)_35%)]  text-accentStrong "
                    >
                      <BadgeCheckIcon />
                      {selectedFish[2].name}
                    </Badge>
                  )}
                </div>
              )}
              {!selected && (
                <p className="text-xs font-medium text-muted sm:text-[13px]">
                  Escolha pelo menos um peixe
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
