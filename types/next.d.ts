// types/next.d.ts
import "next";

declare module "next" {
  type PageProps = {
    params?: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  };
}
