export type fishAnalysisData = Record<
  string,
  {
    hourly: Hourly[];
  }
>;

export interface Hourly {
  time: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  probability: number;
  rain: number;
  showers: number;
  total: number;
  pressureTrend6h: number;
  score: Score;
  moonPhase: string;
}

export interface Score {
  hourlyScore: number;
  breakdown: Breakdown;
  moonBonus: number;
  solunarBonus: number;
  moonPhaseBonus: number;
  hourBonus: number;
}

export interface Breakdown {
  temperature: number;
  humidity: number;
  pressure: number;
  wind: number;
  rain: number;
}
