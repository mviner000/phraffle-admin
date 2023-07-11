import Link from "next/link";

import { BillboardColumn } from "./columns";
import { useLink } from "./use-link";

interface CellImageProps {
  url: BillboardColumn;
  imageUrl: string;
}

export const CellImage: React.FC<CellImageProps> = ({ imageUrl, url }) => {
  const { href } = useLink(`billboards/${url.id}`);

  return (
    <Link href={href}>
      <img alt="hey" width={40} height={40} src={imageUrl} />
    </Link>
  );
};
