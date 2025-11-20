"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  fetchFishingAnalysisAction,
  fishAnalysisDataStore,
  planningStore,
} from "@/core/request";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function FinishButton() {
  const pathname = usePathname();
  const router = useRouter();
  const analysisLoading = fishAnalysisDataStore(
    (state) => state.analysisLoading
  );

  const fishAnalysisData = fishAnalysisDataStore(
    (state) => state.fishAnalysisData
  );
  const selected = planningStore((state) => state.selected);
  const targetDate = planningStore((state) => state.targetDate);
  const selectedFish = planningStore((state) => state.selectedFish);
  if (pathname !== "/planejamento/peixe") {
    return null;
  }

  const handleSubmit = async () => {
    if (!selected || !selectedFish || !targetDate) {
      return null;
    }
    const date = new Date(targetDate);

    const data = {
      latitude: selected.center[0],
      longitude: selected.center[1],
      targetDay: String(date.getUTCDate()).padStart(2, "0"),
      targetMonth: String(date.getUTCMonth() + 1).padStart(2, "0"),
      fishList: selectedFish.map((f) => f.slug),
    };

    await fetchFishingAnalysisAction(data);

    if (fishAnalysisData) {
      router.push("/resultado");
    }
  };

  return (
    <div className=" h-[8vh] flex flex-row items-center justify-center">
      <Button
        onClick={handleSubmit}
        className={`bg-accentStrong relative isolate overflow-hidden rounded-2xl text-left transition 
              duration-200 hover:-translate-y-0.5
             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
             focus-visible:outline-primaryStrong  text-white w-[50%] py-6
          }`}
      >
        {analysisLoading && <Spinner />}
        {!analysisLoading && "Iniciar analise"}
      </Button>
    </div>
  );
}
