import Link from "next/link";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import SigninButton from "@/components/SigninButton";
import siteMetadata from "@/data/siteMetadata";
import navLinks from "@/data/navLinks";
//import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
  return (
    <header>
      <nav className="w-full flex items-center justify-between p-8 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <div>
          <div className="flex items-center justify-between">
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              {" "}
              <div className="mr-3">
                <Image
                  src="/logo-removebg.png"
                  alt="empddh logo"
                  className=""
                  width={160}
                  height={160}
                  quality={100}
                  priority
                />
              </div>
            </Link>
            {typeof siteMetadata.headerTitle === "string" ? (
              <div className="hidden text-xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          {navLinks
            .filter((link) => link.href !== "/")
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
              >
                {link.title}
              </Link>
            ))}{" "}
          <SigninButton />
          {/*  <ModeToggle />         
         
          <MobileNav />*/}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
