"use client";

import { useState } from "react";
import Image from "next/image";
import type { ChampionSummary } from "./server";
import { rollFromData } from "~/lib/roll";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const RollCard = ({ data }: { data: ChampionSummary[] }) => {
  const [champion, setChampion] = useState(NoChamp);
  const [rolling, setRolling] = useState(false);
  const roll = async () => {
    setRolling(true);
    await rollFromData(data, setChampion);
    setRolling(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Random Champion Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-2">
          <Image
            priority={true}
            alt="Champion image"
            src={champion.image}
            width={120}
            height={120}
          />
          <p>{champion.name}</p>
          <Button disabled={rolling} onClick={roll}>
            Rollen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const NoChamp: ChampionSummary = {
  id: -1,
  alias: "",
  name: "Kein Champion",
  roles: [],
  squarePortraitPath:
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png",
  image:
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png",
};
