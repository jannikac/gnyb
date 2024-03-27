import Link from "next/link";
import { Button } from "~/components/ui/button";

const NotFound = () => {
  return (
    <div className="mt-16 flex flex-col gap-2">
      <h2 className="text-xl">404 - Diese Seite exisitiert nicht</h2>
      <p>Die Seite, die du angefragt hast, konnte nicht gefunden werden.</p>
      <span>
        <Button asChild>
          <Link href="/">Zurück zur Homepage</Link>
        </Button>
      </span>
    </div>
  );
};

export default NotFound;
