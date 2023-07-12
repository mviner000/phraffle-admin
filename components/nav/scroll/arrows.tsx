import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { Button } from "@/components/ui/button";

function Arrow({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <Button
      variant="ghost"
      className="mt-1.5"
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
        borderRadius: "50%", // Make the border circle
        width: "32px", // Adjust the width to fit the circle
        height: "32px", // Adjust the height to fit the circle
      }}
    >
      {children}
    </Button>
  );
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <div className="mr-1">
      <Arrow disabled={disabled} onClick={() => scrollPrev()}>
        <ChevronLeft size={24} /> {/* Use ChevronLeft icon from lucide-react */}
      </Arrow>
    </div>
  );
}

export function RightArrow({ limit }: { limit: number }) {
  const { isLastItemVisible, scrollNext, visibleElements, items } =
    React.useContext(VisibilityContext);
  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (isLastItemVisible) {
    }
    if (items.toItemsWithoutSeparators().length >= limit) {
      setDisabled(isLastItemVisible);
    }
  }, [items, limit, isLastItemVisible]);

  return (
    <div className="ml-1">
      <Arrow disabled={disabled} onClick={() => scrollNext()}>
        <ChevronRight size={24} />{" "}
        {/* Use ChevronLeft icon from lucide-react */}
      </Arrow>
    </div>
  );
}
