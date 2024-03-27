import { Badge } from "~/components/ui/badge";
import type { LegendSummary } from "./server";

const EliminationDisplay = ({
  eliminated,
  total,
}: {
  eliminated: LegendSummary[];
  total: LegendSummary[];
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <h3 className="my-2">Ungerollte Legenden</h3>
        <LegendMap data={total.filter((item) => !eliminated.includes(item))} />
      </div>
      <div>
        <h3 className="my-2">Gerollte Legenden</h3>
        <LegendMap data={eliminated} />
      </div>
    </div>
  );
};

const LegendMap = ({ data }: { data: LegendSummary[] }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {data.map((item) => (
        <Badge variant="outline" key={item.name}>
          {item.name}
        </Badge>
      ))}
    </div>
  );
};
export default EliminationDisplay;
