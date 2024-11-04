import { getData } from "./server";
import { RollCard } from "./RollCard";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import UnorderedList from "~/components/ui/UnorderedList";
import Link from "~/components/ui/Link";

const LolRoll = async () => {
  const data = await getData();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <RollCard data={data} />
      <InfoCard />
    </div>
  );
};

const InfoCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Random Champion Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Der GNYB Random Champion Generator!</p>
        <p>
          Mit diesem Tool kannst du einen zufälligen Champion unter allen
          verfügbaren League of Legends Champions auswählen.
        </p>
        <p>Warum unser Generator besser ist:</p>
        <UnorderedList>
          <UnorderedList.Item>immer up-to-date</UnorderedList.Item>
          <UnorderedList.Item>
            <Link className="underline" href="https://github.com/jannikac/gnyb">
              vollständig Open Source
            </Link>
          </UnorderedList.Item>
          <UnorderedList.Item>mit Liebe gemacht</UnorderedList.Item>
        </UnorderedList>
      </CardContent>
    </Card>
  );
};

export default LolRoll;
