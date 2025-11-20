"use client";

import { fishAnalysisDataStore } from "@/core/request";
import { cn } from "@/lib/utils";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { useMemo, useState } from "react";

type HourlyEntry = {
  time: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  probability: number;
  moonPhase: string;
  score: {
    hourlyScore: number;
    breakdown: {
      temperature: number;
      humidity: number;
      pressure: number;
      wind: number;
      rain: number;
    };
    moonBonus: number;
    solunarBonus: number;
    moonPhaseBonus: number;
  };
};

type FishAnalysis = {
  hourly: HourlyEntry[];
};

const formatHour = (time: string) =>
  new Date(time).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function FishAnalysis() {
  const data = fishAnalysisDataStore((s) => s.fishAnalysisData);
  const fishEntries = useMemo(
    () => (data ? Object.entries(data as Record<string, FishAnalysis>) : []),
    [data]
  );
  const [selectedFishKey, setSelectedFishKey] = useState<string | null>(null);

  const activeFishKey = useMemo(() => {
    if (selectedFishKey && data?.[selectedFishKey]) {
      return selectedFishKey;
    }
    return fishEntries[0]?.[0] ?? null;
  }, [selectedFishKey, data, fishEntries]);

  const selectedFish: FishAnalysis | undefined =
    activeFishKey !== null ? data?.[activeFishKey] : undefined;

  const chartData = useMemo(
    () =>
      selectedFish?.hourly.map((h) => ({
        timeLabel: formatHour(h.time),
        score: Number(h.score.hourlyScore.toFixed(2)),
        temperature: h.temperature,
        windSpeed: h.windSpeed,
        probability: h.probability,
      })) ?? [],
    [selectedFish]
  );

  const stats = useMemo(() => {
    if (!selectedFish || selectedFish.hourly.length === 0) {
      return null;
    }

    const highest = selectedFish.hourly.reduce((prev, current) =>
      current.score.hourlyScore > prev.score.hourlyScore ? current : prev
    );

    const lowest = selectedFish.hourly.reduce((prev, current) =>
      current.score.hourlyScore < prev.score.hourlyScore ? current : prev
    );

    const average =
      selectedFish.hourly.reduce((acc, item) => acc + item.score.hourlyScore, 0) /
      selectedFish.hourly.length;

    const comfortTemperature =
      selectedFish.hourly.reduce((acc, item) => acc + item.temperature, 0) /
      selectedFish.hourly.length;

    return {
      highest,
      lowest,
      average,
      comfortTemperature,
    };
  }, [selectedFish]);

  return (
    <div className="min-h-screen w-full">
      {fishEntries.length === 0 && (
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-10 text-center sm:px-6">
          <div className="rounded-3xl bg-white/80 p-6 shadow-xl shadow-emerald-900/5 backdrop-blur">
            <p className="text-lg font-semibold text-primaryStrong">
              Nenhuma análise disponível ainda.
            </p>
            <p className="mt-2 text-sm text-muted">
              Volte à etapa de planejamento para selecionar um peixe e gerar as notas do dia.
            </p>
          </div>
        </div>
      )}
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsla(180,70%,82%,0.48),transparent_45%),radial-gradient(circle_at_80%_0%,hsla(180,95%,80%,0.55),transparent_35%),radial-gradient(circle_at_70%_70%,hsla(200,85%,78%,0.45),transparent_42%)]" />
        </div>

        <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 via-white/70 to-emerald-50/80 p-4 shadow-lg shadow-emerald-900/10 backdrop-blur sm:p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="inline-flex items-center rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Radar de captura
              </p>
              <h1 className="text-2xl font-semibold text-primaryStrong sm:text-3xl">
                Janela ideal para o seu peixe hoje
              </h1>
              <p className="text-sm text-muted sm:text-base">
                Visualize as notas de cada hora, acompanhe a curva de performance do dia e mergulhe na composição do score.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white/90 px-4 py-3 shadow-inner shadow-emerald-900/5">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-300 to-cyan-300 opacity-90 shadow-lg shadow-emerald-900/20" />
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Peixe selecionado</p>
                <p className="text-lg font-semibold capitalize text-primaryStrong">
                  {activeFishKey}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[320px,1fr] xl:grid-cols-[360px,1fr]">
          <aside className="space-y-4">
            <div className="rounded-2xl bg-white/90 p-4 shadow-lg shadow-emerald-900/8 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-primaryStrong">
                  Espécies analisadas
                </h2>
                <span className="text-xs text-muted">
                  {fishEntries.length} no radar
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {fishEntries.map(([key, value]) => {
                  const bestScore =
                    value.hourly.length > 0
                      ? Math.max(...value.hourly.map((h) => h.score.hourlyScore))
                      : null;

                  const isSelected = key === activeFishKey;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedFishKey(key)}
                      className={cn(
                        "group relative flex w-full items-start justify-between rounded-xl border border-border/70 px-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                        "bg-white/70 backdrop-blur",
                        isSelected
                          ? "border-accent shadow-lg shadow-emerald-900/10"
                          : "hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-900/10"
                      )}
                    >
                      <div className="space-y-1">
                        <span className="text-base font-semibold capitalize text-primaryStrong">
                          {key}
                        </span>
                        <div className="flex flex-wrap gap-2 text-xs text-muted">
                          <span className="flex items-center gap-1 rounded-full bg-surfaceMuted px-2 py-1">
                            {value.hourly.length} horas
                          </span>
                          {bestScore !== null && (
                            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">
                              Pico {bestScore.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        className={cn(
                          "mt-1 h-2 w-2 rounded-full",
                          isSelected ? "bg-accent" : "bg-emerald-200"
                        )}
                        aria-hidden
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <section className="space-y-5">
            {selectedFish && selectedFish.hourly.length > 0 ? (
              <>
                {stats && (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <StatPill
                      title="Média do dia"
                      value={stats.average.toFixed(1)}
                      description="Consistência geral"
                    />
                    <StatPill
                      title="Melhor janela"
                      value={formatHour(stats.highest.time)}
                      description={`Score ${stats.highest.score.hourlyScore.toFixed(1)}`}
                    />
                    <StatPill
                      title="Pior janela"
                      value={formatHour(stats.lowest.time)}
                      description={`Mínimo ${stats.lowest.score.hourlyScore.toFixed(1)}`}
                    />
                    <StatPill
                      title="Temperatura média"
                      value={`${stats.comfortTemperature.toFixed(1)}°C`}
                      description="Conforto térmico"
                    />
                  </div>
                )}

                <div className="overflow-hidden rounded-3xl bg-white/90 p-4 shadow-lg shadow-emerald-900/10 backdrop-blur sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-primaryStrong sm:text-lg">
                        Notas ao longo do dia
                      </h3>
                      <p className="text-sm text-muted">
                        Linha do tempo com score horário e referência do pico
                      </p>
                    </div>
                    {stats && (
                      <div className="w-full rounded-xl bg-emerald-50 px-3 py-2 text-center text-xs font-semibold text-emerald-700 sm:w-auto sm:rounded-full sm:px-3 sm:py-1 sm:text-left">
                        Pico em {formatHour(stats.highest.time)}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 h-[260px] w-full sm:h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ left: -12, right: 12 }}>
                        <defs>
                          <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 6" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="timeLabel"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={10}
                          tick={{ fill: "hsl(var(--muted))", fontSize: 12 }}
                        />
                        {stats && (
                          <ReferenceLine
                            x={formatHour(stats.highest.time)}
                            stroke="hsl(var(--accent))"
                            strokeDasharray="3 3"
                            label={{
                              position: "insideTop",
                              value: "Pico",
                              fill: "hsl(var(--accent))",
                              fontSize: 11,
                            }}
                          />
                        )}
                        <Tooltip
                          content={({ active, payload }) => {
                            if (!active || !payload || payload.length === 0) return null;
                            const item = payload[0].payload;
                            return (
                              <div className="rounded-xl border border-border bg-white/95 px-3 py-2 shadow-lg shadow-emerald-900/10">
                                <p className="text-xs font-semibold text-primaryStrong">
                                  {item.timeLabel}
                                </p>
                                <p className="text-sm font-semibold text-primary">
                                  Score {item.score.toFixed(1)}
                                </p>
                                <p className="text-[11px] text-muted">
                                  Temp {item.temperature.toFixed(1)}° · Vento {item.windSpeed.toFixed(1)}km/h · Chuva {item.probability.toFixed(0)}%
                                </p>
                              </div>
                            );
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="hsl(var(--accent))"
                          strokeWidth={3}
                          fill="url(#scoreGradient)"
                          activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--accent))" }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl bg-white/90 p-4 shadow-lg shadow-emerald-900/8 backdrop-blur lg:col-span-2">
                    <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-base font-semibold text-primaryStrong sm:text-lg">
                        Janela hora a hora
                      </h3>
                      <span className="w-fit rounded-full bg-surfaceMuted px-3 py-1 text-xs text-muted">
                        {selectedFish.hourly.length} pontos
                      </span>
                    </div>
                    <div className="flex flex-col gap-3 sm:hidden">
                      {selectedFish.hourly.map((h, idx) => {
                        const timeStr = formatHour(h.time);
                        return (
                          <div
                            key={`${h.time}-${idx}-mobile`}
                            className="rounded-xl border border-border/70 bg-white/80 px-3 py-3 shadow-sm"
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-semibold text-primaryStrong">{timeStr}</div>
                              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-primary">
                                Score {h.score.hourlyScore.toFixed(1)}
                              </span>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted">
                              <div className="flex items-center justify-between rounded-lg bg-surfaceMuted/70 px-2 py-1">
                                <span>Temp</span>
                                <span className="font-semibold text-primaryStrong">
                                  {h.temperature.toFixed(1)}°C
                                </span>
                              </div>
                              <div className="flex items-center justify-between rounded-lg bg-surfaceMuted/70 px-2 py-1">
                                <span>Umid</span>
                                <span className="font-semibold text-primaryStrong">
                                  {h.humidity.toFixed(0)}%
                                </span>
                              </div>
                              <div className="flex items-center justify-between rounded-lg bg-surfaceMuted/70 px-2 py-1">
                                <span>Pressão</span>
                                <span className="font-semibold text-primaryStrong">
                                  {h.pressure.toFixed(1)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between rounded-lg bg-surfaceMuted/70 px-2 py-1">
                                <span>Vento</span>
                                <span className="font-semibold text-primaryStrong">
                                  {h.windSpeed.toFixed(1)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between rounded-lg bg-surfaceMuted/70 px-2 py-1">
                                <span>Chuva</span>
                                <span className="font-semibold text-primaryStrong">
                                  {h.probability.toFixed(0)}%
                                </span>
                              </div>
                              <div className="flex items-center justify-between rounded-lg bg-surfaceMuted/70 px-2 py-1">
                                <span>Lua</span>
                                <span className="font-semibold text-primaryStrong">
                                  {h.moonPhase}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="hidden max-h-[420px] overflow-auto rounded-xl border border-border/70 sm:block">
                      <table className="min-w-full text-left text-sm">
                        <thead className="sticky top-0 bg-surfaceMuted text-[11px] uppercase tracking-wide text-muted">
                          <tr>
                            <th className="px-4 py-2">Hora</th>
                            <th className="px-4 py-2">Score</th>
                            <th className="px-4 py-2">Temp</th>
                            <th className="px-4 py-2">Umid</th>
                            <th className="px-4 py-2">Pressão</th>
                            <th className="px-4 py-2">Vento</th>
                            <th className="px-4 py-2">Chuva</th>
                            <th className="px-4 py-2">Lua</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedFish.hourly.map((h, idx) => {
                            const timeStr = formatHour(h.time);
                            return (
                              <tr
                                key={`${h.time}-${idx}`}
                                className={idx % 2 === 0 ? "bg-white/70" : "bg-surfaceMuted/80"}
                              >
                                <td className="whitespace-nowrap px-4 py-2 text-xs text-primaryStrong">
                                  {timeStr}
                                </td>
                                <td className="px-4 py-2 text-xs font-semibold text-primary">
                                  {h.score.hourlyScore.toFixed(1)}
                                </td>
                                <td className="px-4 py-2 text-xs text-muted">
                                  {h.temperature.toFixed(1)}°C
                                </td>
                                <td className="px-4 py-2 text-xs text-muted">{h.humidity.toFixed(0)}%</td>
                                <td className="px-4 py-2 text-xs text-muted">
                                  {h.pressure.toFixed(1)}
                                </td>
                                <td className="px-4 py-2 text-xs text-muted">
                                  {h.windSpeed.toFixed(1)}
                                </td>
                                <td className="px-4 py-2 text-xs text-muted">
                                  {h.probability.toFixed(0)}%
                                </td>
                                <td className="px-4 py-2 text-xs text-muted">{h.moonPhase}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/90 p-4 shadow-lg shadow-emerald-900/8 backdrop-blur">
                    <h3 className="text-base font-semibold text-primaryStrong sm:text-lg">
                      O que compõe o score
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      Destaques da primeira hora analisada. Use como referência dos pesos.
                    </p>
                    {(() => {
                      const first = selectedFish.hourly[0];
                      const { breakdown } = first.score;
                      const factors = [
                        { label: "Temperatura", value: breakdown.temperature },
                        { label: "Umidade", value: breakdown.humidity },
                        { label: "Pressão", value: breakdown.pressure },
                        { label: "Vento", value: breakdown.wind },
                        { label: "Chuva", value: breakdown.rain },
                        { label: "Bônus lua", value: first.score.moonBonus },
                        { label: "Solunar", value: first.score.solunarBonus },
                        { label: "Fase da lua", value: first.score.moonPhaseBonus },
                      ];

                      return (
                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2">
                          {factors.map(({ label, value }) => (
                            <div
                              key={label}
                              className="rounded-xl border border-border/70 bg-surfaceMuted/60 px-3 py-2"
                            >
                              <p className="text-[11px] uppercase tracking-wide text-muted">
                                {label}
                              </p>
                              <p className="text-sm font-semibold text-primaryStrong">
                                {value.toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-border/70 bg-white/60 p-8 text-center text-sm text-muted shadow-inner shadow-emerald-900/5">
                Selecione um peixe para visualizar o comportamento das notas.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

type StatPillProps = {
  title: string;
  value: string;
  description: string;
};

function StatPill({ title, value, description }: StatPillProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-white/90 px-4 py-3 shadow-inner shadow-emerald-900/5">
      <div>
        <p className="text-[11px] uppercase tracking-wide text-muted">{title}</p>
        <p className="text-lg font-semibold text-primaryStrong">{value}</p>
      </div>
      <span className="text-xs text-muted">{description}</span>
    </div>
  );
}
