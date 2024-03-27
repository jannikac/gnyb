import { JSDOM } from "jsdom";
import { cache } from "react";
import type { GeneralSummary } from "~/lib/roll";
import invariant from "tiny-invariant";

export const getData = cache(async () => {
  const raw = await fetch("https://apexlegends.fandom.com/wiki/Legend");
  const text = await raw.text();
  const dom = new JSDOM(text);
  const document = dom.window.document;
  const legends: LegendSummary[] = [];

  const galleries = document.querySelectorAll(".gallery");
  for (const gallery of galleries) {
    const galleryBoxes = gallery.querySelectorAll(".gallerybox");
    for (const galleryBox of galleryBoxes) {
      const galleryText = galleryBox.querySelector(".gallerytext");
      invariant(galleryText, "No elements with .gallerytext found");
      const name = galleryText.querySelector("a")?.text;
      invariant(name, "No <a> element found");
      const tagline = galleryText?.textContent
        ?.replace(name, "")
        .replace(/[\n\r]/g, "");
      let image = galleryBox.querySelector("img")?.getAttribute("data-src");
      if (!image) {
        image = galleryBox.querySelector("img")?.src;
      }
      if (name === undefined || tagline === undefined || image === undefined)
        throw new Error("Name, Tagline or Image not found");
      legends.push({ name, tagline, image });
    }
  }
  return legends;
});

export interface LegendSummary extends GeneralSummary {
  tagline: string;
}
