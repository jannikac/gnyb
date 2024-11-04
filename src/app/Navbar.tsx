import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
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

interface NavbarSubMenu {
  name: string;
  children: NavbarItem[];
}

type NavbarData = Array<NavbarItem | NavbarSubMenu>;

const isSubMenu = (arg: NavbarItem | NavbarSubMenu): arg is NavbarSubMenu => {
  return "children" in arg && "name" in arg;
};

const NavbarItems: NavbarData = [
  { name: "Serverinfos", href: "/servers" },
  { name: "Wichteln", href: "/wichteln" },
  {
    name: "Randomizer",
    children: [
      { name: "Apex Randomizer", href: "/roll/apex" },
      { name: "LoL Randomizer", href: "/roll/lol" },
    ],
  },
  {
    name: "Werkzeuge",
    children: [{ name: "ICAL Konverter", href: "/tools/ical" }],
  },
];

const Navbar = () => {
  return (
    <nav className="flex text-nowrap">
      <NavigationMenu className="hidden sm:flex">
        <NavigationMenuList style={{ display: "flex", listStyle: "none" }}>
          {NavbarItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              {isSubMenu(item) ? (
                <>
                  <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul>
                      {item.children.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink
                            className="w-full justify-start"
                            key={item.href}
                            href={item.href}
                          >
                            {item.name}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink href={item.href}>
                  {item.name}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
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
          <nav>
            <ul className="flex flex-col">
              <li className="flex">
                <SheetClose asChild>
                  <Link className="w-full p-2 hover:bg-muted/50" href={"/"}>
                    Home
                  </Link>
                </SheetClose>
              </li>
              {NavbarItems.map((item) => (
                <li className="flex flex-col" key={item.name}>
                  {isSubMenu(item) ? (
                    <>
                      <p className=" p-2">{item.name}</p>
                      <ul className="flex flex-col gap-2">
                        {item.children.map((item) => (
                          <li className="flex" key={item.name}>
                            <SheetClose asChild>
                              <Link
                                key={item.href}
                                className="ml-4 w-full p-2 hover:bg-muted/50"
                                href={item.href}
                              >
                                {item.name}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <SheetClose key={item.name} asChild>
                      <Link className="p-2 hover:bg-muted/50" href={item.href}>
                        {item.name}
                      </Link>
                    </SheetClose>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
