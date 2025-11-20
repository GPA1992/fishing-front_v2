import axios from "axios";
import { fishAnalysisDataStore } from "../store/fishing-analysis.store";
import { fetchFishingAnalysisService } from "../services/fishing-analysis.service";
import { type ScoreDataBody } from "../types";

export async function fetchFishingAnalysisAction(
  params: ScoreDataBody
): Promise<void> {
  const { setProperty } = fishAnalysisDataStore.getState();

  setProperty("analysisLoading", true);
  setProperty("fishAnalysisData", null);

  try {
    const analysis = await fetchFishingAnalysisService(params);
    setProperty("fishAnalysisData", analysis);
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Erro ao buscar análise de pesca", error);
    }
    setProperty("fishAnalysisData", null);
  } finally {
    setProperty("analysisLoading", false);
  }
}

export function resetFishingAnalysisAction(): void {
  fishAnalysisDataStore.getState().reset();
}
