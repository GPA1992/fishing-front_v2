"use client";

import Search from "@/components/search";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../../components/map"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
      <Search />
      <Map />
    </div>
  );
}
