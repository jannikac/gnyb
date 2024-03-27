import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

interface NavbarItem {
  name: string;
  href: string;
}

const NavbarItems: NavbarItem[] = [
  { name: "Serverinfos", href: "/servers" },
  { name: "Apex Generator", href: "/roll/apex" },
  { name: "LoL Generator", href: "/roll/lol" },
  { name: "Wichteln", href: "/wichteln" },
];

const Navbar = () => {
  return (
    <nav className="flex text-nowrap">
      {NavbarItems.map((item) => (
        <NavBarItem key={item.name} name={item.name} href={item.href} />
      ))}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            title="Navigation öffnen"
            variant="outline"
            className="block sm:hidden"
          >
            <IconMenu2 />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col">
            <SheetClose asChild>
              <Link className="p-2 hover:bg-muted/50" href={"/"}>
                Home
              </Link>
            </SheetClose>
            {NavbarItems.map((item) => (
              <SheetClose key={item.name} asChild>
                <Link className="p-2 hover:bg-muted/50" href={item.href}>
                  {item.name}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

const NavBarItem = ({ name, href }: NavbarItem) => {
  return (
    <Link
      className="hidden rounded-[--radius] p-4 text-lg hover:bg-muted/50 sm:inline"
      href={href}
    >
      {name}
    </Link>
  );
};

export default Navbar;
