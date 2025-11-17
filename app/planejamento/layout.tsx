import PlanningData from "@/components/planning-data";
import Stepper from "@/components/stepper";

import type { ReactNode } from "react";

export default function FormLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 sm:gap-7 lg:gap-10">
      <div className="w-full">{children}</div>

      <div className="flex flex-col gap-4 sm:gap-5 lg:grid lg:grid-cols-[2fr_minmax(300px,1fr)] lg:items-start lg:gap-6">
        <Stepper />
        <PlanningData />
      </div>
    </div>
  );
}
