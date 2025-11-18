"use client";

import Image from "next/image";
import { planningStore } from "@/core/request";
import { FishIcon } from "lucide-react";
import { fishingList } from "./data";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const MAX_SELECTION = 3;
const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export function Fish() {
  const selectedFish = planningStore((state) => state.selectedFish ?? []);
  const setProperty = planningStore((state) => state.setProperty);
  const selectedCount = selectedFish.length;
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = normalizeText(searchTerm);

  const filteredFish = useMemo(() => {
    if (!normalizedSearch) return fishingList;
    return fishingList.filter((fish) =>
      normalizeText(fish.name).includes(normalizedSearch)
    );
  }, [normalizedSearch]);

  const toggleFish = (id: string) => {
    const current = selectedFish;
    if (current.includes(id)) {
      setProperty(
        "selectedFish",
        current.filter((item) => item !== id)
      );
      return;
    }

    if (current.length >= MAX_SELECTION) return;
    setProperty("selectedFish", [...current, id]);
  };

  const clearSelection = () => {
    if (!selectedCount) return;
    setProperty("selectedFish", []);
  };

  return (
    <section className="flex flex-col gap-4 sm:gap-6 lg:gap-7 pb-2">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-highlight)_70%,var(--color-surface)_30%)] text-primaryStrong ring-1 ring-[color-mix(in_srgb,var(--color-primary)_20%,var(--color-border)_80%)] shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
          <FishIcon className="h-5 w-5" />
        </span>

        <div>
          <h2 className="truncate text-sm font-semibold text-primaryStrong sm:text-base sm:max-w-[490px] max-w-[260px]">
            Peixes
          </h2>
          <p className="text-[11px] font-medium text-muted sm:text-[13px]">
            Crie sua combinação preferida de espécies para acompanhar a pescaria
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-border)_88%)]">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-primaryStrong sm:text-base">
            Selecione até {MAX_SELECTION} espécies
          </p>
        </div>
        <div className="w-full sm:w-auto sm:min-w-[240px]">
          <label htmlFor="fish-search" className="sr-only">
            Pesquisar peixes
          </label>
          <div className="relative">
            <input
              id="fish-search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Pesquisar espécie"
              className="w-full rounded-xl border-none bg-[color-mix(in_srgb,var(--color-surface)_92%,var(--color-highlight)_8%)] px-3 py-2 text-sm text-primaryStrong shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-[color-mix(in_srgb,var(--color-primary)_15%,var(--color-border)_85%)] placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryStrong"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-primary opacity-80">
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16.5 16.5 4 4" />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-xl bg-[color-mix(in_srgb,var(--color-primary)_16%,var(--color-surface)_84%)] px-3 py-1 text-xs font-semibold text-primaryStrong ring-1 ring-[color-mix(in_srgb,var(--color-primary)_25%,var(--color-border)_75%)]">
            {selectedCount}/{MAX_SELECTION} selecionadas
          </span>
          <button
            type="button"
            onClick={clearSelection}
            disabled={!selectedCount}
            className="underline-offset-4 transition hover:underline disabled:cursor-not-allowed disabled:opacity-40 text-xs font-semibold text-primary"
          >
            Limpar
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 auto-rows-max",
          "pt-2 h-[40vh] px-0 overflow-y-auto scroll-smooth pb-2 fish-scroll"
        )}
      >
        {filteredFish.length === 0 && (
          <div className="col-span-full rounded-xl bg-[color-mix(in_srgb,var(--color-surface)_92%,var(--color-highlight)_8%)] px-4 py-6 text-center text-sm font-medium text-muted ring-1 ring-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-border)_88%)]">
            Nenhuma espécie encontrada
          </div>
        )}
        {filteredFish.map((fish) => {
          const isSelected = selectedFish.includes(fish.id);
          const isDisabled = !isSelected && selectedCount >= MAX_SELECTION;

          return (
            <button
              type="button"
              key={fish.id}
              onClick={() => toggleFish(fish.id)}
              disabled={isDisabled}
              className={`group relative isolate overflow-hidden rounded-2xl text-left transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryStrong ${
                isDisabled ? "opacity-70" : ""
              }`}
            >
              <div className="relative overflow-hidden rounded-xl bg-surface shadow-[0_6px_12px_rgba(0,0,0,0.05)] ring-1 ring-[color-mix(in_srgb,var(--color-border)_85%,transparent_15%)] transition duration-200 group-hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)]">
                <div className="relative h-14 w-full overflow-hidden sm:h-16 border">
                  <Image
                    src={`/peixes/${fish.image}`}
                    alt={fish.name}
                    fill
                    sizes="(min-width: 1280px) 160px, (min-width: 640px) 120px, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/0" />

                  <div className="absolute left-2 right-2 top-2 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                      {isSelected ? "Selecionado" : "Disponível"}
                    </span>
                    {isSelected && (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/80 text-emerald-600 shadow text-xs">
                        ✓
                      </span>
                    )}
                  </div>

                  {isDisabled && (
                    <div
                      className="absolute inset-0 bg-white/50 backdrop-blur-[1px]"
                      aria-hidden
                    />
                  )}
                </div>

                <div className="flex items-start justify-between gap-2 px-2.5 py-2.5">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-semibold text-primaryStrong sm:text-sm">
                      {fish.name}
                    </p>
                    <p className="text-[10px] text-muted sm:text-xs">
                      {isSelected
                        ? "Na sua lista. Toque para remover."
                        : "Clique para adicionar a sua lista."}
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--color-highlight)_65%,var(--color-surface)_35%)] px-2 py-0.5 text-[9px] font-semibold text-primaryStrong ring-1 ring-[color-mix(in_srgb,var(--color-primary)_18%,var(--color-border)_82%)]">
                    {isSelected ? "Escolhido" : "Selecionar"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .fish-scroll {
          scrollbar-width: thin;
          scrollbar-color: color-mix(
              in srgb,
              var(--color-primary) 40%,
              var(--color-border)
            )
            color-mix(
              in srgb,
              var(--color-surface) 88%,
              var(--color-highlight) 12%
            );
        }

        .fish-scroll::-webkit-scrollbar {
          width: 10px;
        }

        .fish-scroll::-webkit-scrollbar-track {
          background: color-mix(
            in srgb,
            var(--color-surface) 88%,
            var(--color-highlight) 12%
          );
          border-radius: 9999px;
        }

        .fish-scroll::-webkit-scrollbar-thumb {
          background: color-mix(
            in srgb,
            var(--color-primary) 46%,
            var(--color-border)
          );
          border: 2px solid
            color-mix(
              in srgb,
              var(--color-surface) 85%,
              var(--color-highlight) 15%
            );
          border-radius: 9999px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .fish-scroll::-webkit-scrollbar-thumb:hover {
          background: color-mix(
            in srgb,
            var(--color-primaryStrong) 55%,
            var(--color-primary)
          );
        }
      `}</style>
    </section>
  );
}
