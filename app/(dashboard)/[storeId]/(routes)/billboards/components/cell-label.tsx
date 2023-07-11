import Link from "next/link";

import { BillboardColumn } from "./columns";
import { useLink } from "./use-link";

interface CellLabelProps {
  url: BillboardColumn;
  label: string;
}

export const CellLabel: React.FC<CellLabelProps> = ({ label, url }) => {
  const { href } = useLink(`billboards/${url.id}`);

  return <Link href={href}>{label}</Link>;
};
