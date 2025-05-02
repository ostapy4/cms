"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "app/_components/common";

import { cn } from "utils/cn";

import { AdminUrls } from "route-urls";

const links = [
  {
    label: "Home",
    url: AdminUrls._getRoot(),
  },
  {
    label: "About",
    url: AdminUrls.getAboutMe(),
  },
  {
    label: "Lessons",
    url: AdminUrls.getAcccordionLessons(),
  },
  {
    label: "Sheet Music",
    url: AdminUrls.getSheetMusic(),
  },
  {
    label: "Contacts",
    url: AdminUrls.getContacts(),
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className={"bg-gradient-to-br from-lime-600 to-lime-800 py-4"}>
      <Container>
        <nav>
          <ul
            className={"flex flex-wrap items-center gap-x-8 gap-y-1 text-white"}
          >
            {links.map((link) => (
              <li
                key={link.url}
                className={cn(
                  "relative transition-colors duration-300 before:absolute before:bottom-0 before:right-0 before:h-0.5 before:w-0 before:rounded-full before:bg-white before:transition-[width] before:duration-300",
                  {
                    "text-white before:w-full": pathname === link.url,
                    "before:hover:left-0 before:hover:w-full":
                      pathname !== link.url,
                  },
                )}
              >
                <Link href={link.url}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
