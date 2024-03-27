import Link from "next/link";
import Logo from "../../public/img/logo.png";
import Image from "next/image";
import Navbar from "./Navbar";

const Header = () => (
  <header className="my-4 flex items-center justify-between">
    <Link href="/">
      <div className="flex items-center">
        <span className="relative aspect-[122/127] h-14 md:h-28">
          <Image
            priority
            src={Logo}
            sizes="56px 112px"
            fill
            quality={100}
            alt="GNYB Logo"
          />
        </span>
        <h1 className="text-2xl">
          <span className="hidden xl:inline">Willkommen im Imperium</span>
          <span className="inline xl:hidden">GNYB</span>
        </h1>
      </div>
    </Link>
    <Navbar />
  </header>
);

export default Header;
