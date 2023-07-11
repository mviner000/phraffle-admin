import Link from "next/link";
import copy from "copy-text-to-clipboard";
import { Copy } from "lucide-react";
import { useLink } from "./use-link";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { BillboardColumn } from "./columns";

interface CellCopyProps {
  url: BillboardColumn;
}

export const CellCopy: React.FC<CellCopyProps> = ({ url }) => {
  const { href } = useLink(`billboards/${url.id}`);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    copy(href);
    setIsCopied(true);
    toast.success(`Copied: ${href}`);
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={handleCopyClick}
          className="flex items-center mr-2 whitespace-nowrap"
        >
          <Copy className="h-4 w-4 mr-1" />
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </>
  );
};
