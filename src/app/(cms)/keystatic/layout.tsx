import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "OORTSKY - Dashboard CMS",
  description: "Dashboard for OORTSKY's Content Management System."
};

export default function Layout() {
  return <KeystaticApp />;
}
