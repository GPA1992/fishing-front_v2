"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function FinishButton() {
  const pathname = usePathname();
  if (pathname !== "/planejamento/peixe") {
    return null;
  }
  return (
    <div className=" h-[8vh] flex flex-row items-center justify-center">
      <Button
        className={`bg-accentStrong relative isolate overflow-hidden rounded-2xl text-left transition 
              duration-200 hover:-translate-y-0.5
             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
             focus-visible:outline-primaryStrong  text-white w-[50%] py-6
          }`}
      >
        Iniciar analise
      </Button>
    </div>
  );
}
