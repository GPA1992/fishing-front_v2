"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex-1 items-center justify-center flex">
      <Button className="text-accent h-20 w-40">
        <Link href={"/planejamento/localizacao"}>Iniciar</Link>
      </Button>
    </div>
  );
}
