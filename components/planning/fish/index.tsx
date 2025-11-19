"use client";

import Image from "next/image";
import { planningStore } from "@/core/request";
import { FishIcon } from "lucide-react";
import { fishingList } from "./data";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const MAX_SELECTION = 3;
const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export type fishType = {
  id: string;
  name: string;
  slug: string;
  image: string;
};

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

  const toggleFish = (fish: fishType) => {
    const current = selectedFish;
    const isSelected = selectedFish.some((f) => f.id === fish.id);
    if (isSelected) {
      setProperty(
        "selectedFish",
        current.filter((item) => item.id !== fish.id)
      );
      return;
    }

    if (current.length >= MAX_SELECTION) return;
    setProperty("selectedFish", [...current, fish]);
  };

  const clearSelection = () => {
    if (!selectedCount) return;
    setProperty("selectedFish", []);
  };

  return (
    <section className="flex flex-col gap-4 sm:gap-6 lg:gap-7 pb-2">
      <div className="w-full sm:w-auto sm:min-w-full px-1 ">
        <p className="text-[11px] font-medium text-muted sm:text-[13px] mb-1 pl-1">
          Selecione entre 1 e 3 espécies para fazer a consulta
        </p>
        <label htmlFor="fish-search" className="sr-only">
          Pesquisar peixes
        </label>
        <div className="relative">
          <input
            id="fish-search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Pesquisar espécie"
            className="w-full rounded-xl h-10 border-none bg-[color-mix(in_srgb,var(--color-surface)_92%,var(--color-highlight)_8%)] px-3 py-2 text-sm text-primaryStrong shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-[color-mix(in_srgb,var(--color-primary)_15%,var(--color-border)_85%)] placeholder:text-muted focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-primaryStrong"
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
        <div className="flex items-center justify-start gap-3 rounded-xl mt-2 pl-2">
          <button
            type="button"
            onClick={clearSelection}
            disabled={!selectedCount}
            className="text-[11px] font-semibold text-primary underline-offset-4 transition hover:underline hover:text-primaryStrong disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:no-underline"
          >
            Limpar
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 rounded auto-rows-max",
          "pt-2 h-[33vh] sm:h-[38vh] px-0 overflow-y-auto scroll-smooth pb-2 px-2 fish-scroll"
        )}
      >
        {filteredFish.length === 0 && (
          <div className="col-span-full rounded-xl bg-[color-mix(in_srgb,var(--color-surface)_92%,var(--color-highlight)_8%)] px-4 py-6 text-center text-sm font-medium text-muted ring-1 ring-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-border)_88%)]">
            Nenhuma espécie encontrada
          </div>
        )}
        {filteredFish.map((fish) => {
          const isSelected = selectedFish.some((f) => f.id === fish.id);
          const isDisabled = !isSelected && selectedCount >= MAX_SELECTION;

          return (
            <button
              type="button"
              key={fish.id}
              onClick={() => toggleFish(fish)}
              disabled={isDisabled}
              className={`group relative isolate overflow-hidden rounded-xl text-left transition duration-200 hover:-translate-y-0.5 ${
                isDisabled ? "opacity-70" : ""
              }`}
            >
              <div className="relative overflow-hidden rounded-lg bg-surface shadow-sm ring-1 ring-[color-mix(in_srgb,var(--color-border)_85%,transparent_15%)] transition duration-200 group-hover:shadow-md">
                {/* 90% imagem */}
                <div className="relative h-32 w-full overflow-hidden border">
                  <Image
                    src={`/peixes/${fish.image}`}
                    alt={fish.name}
                    fill
                    sizes="100vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/0" />

                  <div className="absolute left-1.5 right-1.5 top-1.5 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-white/20 px-1.5 py-[1px] text-[8px] font-semibold text-white backdrop-blur-sm">
                      {isSelected ? "Selecionado" : "Disponível"}
                    </span>
                    {isSelected && (
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/80 text-emerald-600 text-[10px]">
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

                {/* 10% texto – card mais fino */}
                <div className="flex items-center justify-between gap-1.5 px-2 py-1.5">
                  <div className="space-y-[1px]">
                    <p className="text-[10px] font-semibold text-primaryStrong">
                      {fish.name}
                    </p>
                    <p className="text-[8px] text-muted">
                      {isSelected
                        ? "Toque para remover."
                        : "Toque para adicionar."}
                    </p>
                  </div>

                  <span className="inline-flex items-center justify-center rounded bg-[color-mix(in_srgb,var(--color-highlight)_65%,var(--color-surface)_35%)] px-1.5 py-[2px] text-[8px] font-semibold text-primaryStrong ring-1 ring-[color-mix(in_srgb,var(--color-primary)_18%,var(--color-border)_82%)]">
                    {isSelected ? "Escolhido" : "Selecionar"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
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
