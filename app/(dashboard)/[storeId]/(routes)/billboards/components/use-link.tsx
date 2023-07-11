import Link from "next/link";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

interface LinkProps {
  href: string;
}

export const useLink = (path: string): LinkProps => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/${params.storeId}`;
  const href = `${baseUrl}/${path}`;

  return { href };
};
