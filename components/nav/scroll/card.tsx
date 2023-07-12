import React from "react";
import Link from "next/link";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { Button } from "@/components/ui/button";

export function Card({
  title,
  itemId,
  href,
}: {
  title: string;
  itemId: string;
  href: string;
}) {
  const visibility = React.useContext(VisibilityContext);

  const visible = visibility.isItemVisible(itemId);

  return (
    <Link href={href}>
      <div style={{ display: "flex", justifyContent: "center", margin: "4px" }}>
        <Button tabIndex={0} variant="secondary" className="card p-2">
          <div>{title}</div>
        </Button>
      </div>
    </Link>
  );
}
