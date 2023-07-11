import Link from "next/link";

import { BillboardColumn } from "./columns";
import { useLink } from "./use-link";

interface CellDateProps {
  url: BillboardColumn;
  createdAt: string;
}

export const CellDate: React.FC<CellDateProps> = ({ createdAt, url }) => {
  const { href } = useLink(`billboards/${url.id}`);

  return <Link href={href}>{createdAt}</Link>;
};
