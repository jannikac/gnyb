import type { GeneralSummary } from "~/lib/roll";

export const getData = async () => {
  const result = await fetch(
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json",
  ).then((val) => val.json() as Promise<ChampionSummary[]>);
  // add a real url to the squarePortraitPath
  const champs = result.map((item) => ({
    ...item,
    image: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${item.id}.png`,
  }));
  // remove first element as it is -1 or a placeholder
  champs.shift();
  return champs;
};

export interface ChampionSummary extends GeneralSummary {
  id: number;
  alias: string;
  squarePortraitPath: string;
  roles: string[];
}
