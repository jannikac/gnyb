"use client";
import { useState } from "react";
import Image from "next/image";
import EliminationDisplay from "./EliminationDisplay";
import type { LegendSummary } from "./server";
import { rollFromData } from "~/lib/roll";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

export const RollCard = ({ data }: { data: LegendSummary[] }) => {
  const [champion, setChampion] = useState(NoChamp);
  const [rolling, setRolling] = useState(false);
  const [elimination, setElimination] = useState(false);
  const [eliminated, setEliminated] = useState<LegendSummary[]>([]);
  const roll = async () => {
    setRolling(true);
    if (elimination) {
      const lastRoll = await rollFromData(
        data.filter((item) => !eliminated.includes(item)),
        setChampion,
      );
      setEliminated((prev) => [...prev, lastRoll]);
    } else {
      await rollFromData(data, setChampion);
    }
    setRolling(false);
  };

  return (
    <Card>
      <CardHeader className="flex items-center">
        <CardTitle>Random Apex Legend Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-2">
          <Image
            priority={true}
            alt="Champion image"
            src={champion.image}
            width={120}
            height={134}
          />
          <div className="flex flex-col items-center">
            <p>{champion.name}</p>
            <p className="text-xs">{champion.tagline}</p>
          </div>

          {
            //show reset button if all champs have been rolled
            data.filter((item) => !eliminated.includes(item)).length === 0 ? (
              <Button onClick={() => setEliminated([])}>Reset</Button>
            ) : (
              <Button disabled={rolling} onClick={roll}>
                Rollen
              </Button>
            )
          }
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            title="Elimination Mode aktivieren"
            id="eliminationMode"
            disabled={rolling}
            checked={elimination}
            onCheckedChange={() => setElimination((prev) => !prev)}
          />
          <Label htmlFor="eliminationMode">Elimination Mode</Label>
        </div>
        {elimination && (
          <EliminationDisplay eliminated={eliminated} total={data} />
        )}
      </CardContent>
    </Card>
  );
};

const NoChamp: LegendSummary = {
  name: "Kein Champion",
  tagline: "-",
  image: "https://placehold.co/120x134/png",
};
