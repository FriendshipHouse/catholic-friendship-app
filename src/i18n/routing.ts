import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en-US", "zh-TW"],

  defaultLocale: "en-US",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
