"use client";
import { useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { HourPicker } from "../hour-picker";
import { Clock } from "lucide-react";
import { planningStore } from "@/core/request";
import { ptBR } from "react-day-picker/locale";

export function MyDatePicker() {
  const [selected, setSelected] = useState<Date>();
  const setProperty = planningStore((state) => state.setProperty);

  return (
    <div className=" items-start w-full flex flex-col justify-start h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-highlight)_70%,var(--color-surface)_30%)] text-primaryStrong ring-1 ring-[color-mix(in_srgb,var(--color-primary)_20%,var(--color-border)_80%)] shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
          <Clock className="h-5 w-5" />
        </span>

        <div>
          <h2 className="truncate text-sm font-semibold text-primaryStrong sm:text-base sm:max-w-[490px] max-w-[260px]">
            Dia e hora
          </h2>
          <p className="text-[12px] font-medium text-muted sm:text-[13px]">
            Selecione o dia e a hora que pretende pescar!
          </p>
        </div>
      </div>

      <div className=" items-center w-full flex flex-col justify-start gap-2 h-full">
        <DayPicker
          animate
          locale={ptBR}
          navLayout="around"
          className="truncate text-sm font-semibold text-primaryStrong sm:text-base"
          mode="single"
          selected={selected}
          onSelect={(v) => {
            if (v) {
              setProperty("targetDate", v);
              setSelected(v);
            }
          }}
        />
        <HourPicker />
      </div>
    </div>
  );
}
