import Link from "~/components/ui/Link";
import { RollCard } from "./RollCard";
import { getData } from "./server";
import UnorderedList from "~/components/ui/UnorderedList";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const ApexRoll = async () => {
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
        <CardTitle>Random Apex Legend Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Mit diesem Tool kannst du eine zufällige Legende unter allen
          verfügbaren Apex Legenden auswählen.
        </p>
        <p>Warum unser Generator besser ist:</p>
        <UnorderedList>
          <UnorderedList.Item>immer up-to-date</UnorderedList.Item>
          <UnorderedList.Item>
            <Link href="https://google.com">vollständig Open Source</Link>
          </UnorderedList.Item>
          <UnorderedList.Item>mit Liebe gemacht</UnorderedList.Item>
        </UnorderedList>
      </CardContent>
    </Card>
  );
};

export default ApexRoll;
