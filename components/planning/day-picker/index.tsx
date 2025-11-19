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
      <p className="text-sm font-medium text-muted px-2 sm:text-[13px] mb-2">
        Selecione o dia que pretende pescar!
      </p>
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
        {/*  <HourPicker /> */}
      </div>
    </div>
  );
}
