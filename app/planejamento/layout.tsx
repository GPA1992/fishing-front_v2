import FinishButton from "@/components/planning/finish-button";
import PlanningData from "@/components/planning/planning-data";
import Stepper from "@/components/planning/stepper";

import type { ReactNode } from "react";

export default function FormLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 pb-10 pt-6 sm:gap-6 sm:px-6 lg:gap-8 lg:px-10">
      <div className="flex flex-col gap-5 sm:gap-7 lg:gap-10">
        <PlanningData />
        <div className="w-full h-[50vh]">{children}</div>
        <Stepper />
        <FinishButton />
      </div>
    </div>
  );
}
