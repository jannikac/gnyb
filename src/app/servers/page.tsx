import { CustomCard } from "~/components/ui/CustomCard";
import { Button } from "~/components/ui/button";
import { default as NextLink } from "next/link";
import { IconDownload, IconLogin } from "@tabler/icons-react";
import Link from "~/components/ui/Link";

const Page = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TTTCard />
      <TeamspeakCard />
      <MinecraftCard />
    </div>
  );
};

const TTTCard = () => {
  return (
    <CustomCard>
      <CustomCard.Title>Trouble in Terrorist Town</CustomCard.Title>
      <CustomCard.Content>
        <CustomCard.Buttons>
          <Button className="w-32" asChild>
            <NextLink href="https://www.troubleinterroristtown.com/">
              <IconDownload />
              Download
            </NextLink>
          </Button>
          <Button className="w-32" asChild>
            <NextLink href="steam://connect/gnyb.ddns.net">
              <IconLogin />
              Join
            </NextLink>
          </Button>
        </CustomCard.Buttons>
        <p>Passwort: Das gleiche wie für Trouble in Terrorist Town.</p>
        <p>Erforderlich:</p>
        <ul className="list-inside list-disc">
          <li>
            <Link href="https://gmod.facepunch.com/">Garry&apos;s Mod</Link>
          </li>
          <li>
            <Link href="https://steamcommunity.com/sharedfiles/filedetails/?id=2098633357">
              Aktuelle Collection (Waffen / Addons / Maps)
            </Link>
          </li>
          <li>
            <Link href="https://github.com/Thendon/Gspeak">
              Counter Strike: Source Game Files
            </Link>
          </li>
        </ul>
        <p>Nice to have:</p>
        <ul className="list-inside list-disc">
          <li>
            <Link href="https://gspeak.l1m.it/">Gspeak</Link>
          </li>
        </ul>
      </CustomCard.Content>
    </CustomCard>
  );
};

const TeamspeakCard = () => {
  return (
    <CustomCard>
      <CustomCard.Title>Teamspeak</CustomCard.Title>
      <CustomCard.Content>
        <CustomCard.Buttons>
          <Button className="w-32" asChild>
            <NextLink href="https://www.teamspeak.com/en/downloads/">
              <IconDownload />
              Download
            </NextLink>
          </Button>
          <Button className="w-32" asChild>
            <NextLink href="ts3server://gnyb.teamspeak.de">
              <IconLogin />
              Join
            </NextLink>
          </Button>
        </CustomCard.Buttons>
        <p>Passwort: Das gleiche wie für TeamSpeak.</p>
        <p>Nice to have:</p>
        <ul className="list-inside list-disc">
          <li>
            <Link href="https://github.com/randomhost/teamspeak-dark">
              Dark Theme
            </Link>
          </li>
        </ul>
      </CustomCard.Content>
    </CustomCard>
  );
};

const MinecraftCard = () => {
  return (
    <CustomCard>
      <CustomCard.Title>Minecraft (Java)</CustomCard.Title>
      <CustomCard.Content>
        <CustomCard.Buttons>
          <Button className="w-32" asChild>
            <NextLink href="https://www.minecraft.net/de-de/download">
              <IconDownload />
              Download
            </NextLink>
          </Button>
          <Button className="w-32" asChild>
            <NextLink href="minecraft://gnyb.ddns.net">
              <IconLogin />
              Join
            </NextLink>
          </Button>
        </CustomCard.Buttons>
        <p>Whitelist: Schreibt mich an, falls ihr mitspielen möchtet.</p>
        <p>Nice to have:</p>
        <ul className="list-inside list-disc">
          <li>
            <Link href="https://fabricmc.net/">Fabric Modloader</Link>
          </li>
          <li>
            <Link href="https://modrinth.com/mod/sodium">
              Sodium - FPS Verbesserung
            </Link>
          </li>
        </ul>
      </CustomCard.Content>
    </CustomCard>
  );
};

export default Page;
