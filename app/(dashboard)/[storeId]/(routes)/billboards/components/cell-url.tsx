import { useEffect, useState } from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";
import copy from "copy-text-to-clipboard";
import { Copy } from "lucide-react";

import { BiCopy, BiSolidCopyAlt } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { BillboardColumn } from "./columns";
import { useLink } from "./use-link";

interface CellUrlProps {
  data: BillboardColumn;
}

const truncateMiddle = (str: string, maxLength: number) => {
  if (str.length <= maxLength) {
    return str;
  }

  const leftHalf = maxLength / 2;
  const rightHalf = str.length - leftHalf;

  return str.slice(0, leftHalf) + "..." + str.slice(rightHalf);
};

export const CellUrl: React.FC<CellUrlProps> = ({ data }) => {
  const { href } = useLink(`billboards/${data.id}`);
  const truncatedText = truncateMiddle(href, 25);

  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          display: "inline-block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "150px", // Adjust this value as needed
          textDecoration: "underline", // Add underline to simulate link style
          cursor: "pointer", // Change cursor on hover
          padding: "10px", // Add padding to increase clickable area
        }}
      >
        <Link2 />
        <button
          onClick={handleCopyClick}
          className="flex items-center mr-2 whitespace-nowrap"
        >
          {isCopied ? (
            <BiSolidCopyAlt className="mr-1" />
          ) : (
            <BiCopy className="mr-1" />
          )}{" "}
          {truncatedText}
        </button>
      </div>
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: "-100%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#000",
            color: "#fff",
            padding: "0.5rem",
            borderRadius: "4px",
            zIndex: 1,
            whiteSpace: "nowrap", // Display the full link in one line
          }}
        >
          {href}
        </div>
      )}
    </div>
  );
};
