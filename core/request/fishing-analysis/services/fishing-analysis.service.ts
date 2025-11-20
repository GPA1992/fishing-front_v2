import axios from "axios";
import { type ApiResponse } from "../../types";
import {
  type ScoreDataBody,
  type fishAnalysisData as FishAnalysisData,
} from "../types";

const baseUrl = "http://localhost:3001/score/post-score";

function normalizeBaseUrl(url: string) {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function resolveEndpoint(path: string) {
  const normalizedBase = normalizeBaseUrl(baseUrl);
  return normalizedBase ? `${normalizedBase}${path}` : path;
}

function extractData(
  payload: ApiResponse<FishAnalysisData> | FishAnalysisData
): FishAnalysisData {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    (payload as ApiResponse<FishAnalysisData>).data !== undefined
  ) {
    return (payload as ApiResponse<FishAnalysisData>).data;
  }

  return payload as FishAnalysisData;
}

export async function fetchFishingAnalysisService(
  body: ScoreDataBody
): Promise<FishAnalysisData> {
  const response = await axios.post<
    ApiResponse<FishAnalysisData> | FishAnalysisData
  >(baseUrl, body);

  return extractData(response.data);
}
