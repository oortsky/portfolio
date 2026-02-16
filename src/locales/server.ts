import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getCurrentLocale, getStaticParams } =
  createI18nServer({
    en: () => import("./en"),
    id: () => import("./id"),
    jp: () => import("./jp"),
    kr: () => import("./kr")
  });
