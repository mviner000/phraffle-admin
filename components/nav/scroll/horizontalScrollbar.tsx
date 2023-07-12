"use client";

import React from "react";
import ReactDOM from "react-dom";

import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "./arrows";
import { Card } from "./card";
import { Footer } from "./footer";
import { Header } from "./header";
import "./globalStyles.css";

// NOTE: embrace power of CSS flexbox!
import "./hideScrollbar.css";
// import "./firstItemMargin.css";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = "test";
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(15)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

export const HorizontalScrollbar = () => {
  //   const [items, setItems] = React.useState(getItems);
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
  ];

  const getItems = () => routes.map((_, ind) => ({ id: getId(ind) }));

  const [items, setItems] = React.useState(getItems);

  // NOTE: hack for right arrow don't blink
  const newItemsLimit = routes.length;
  // NOTE: next part in arrows.tsx file

  // NOTE: for add items
  //   const pushNewItems = () => {
  //     if (items.length > newItemsLimit) {
  //       return false;
  //     }
  //     const newItems = items.concat(
  //       Array(5)
  //         .fill(0)
  //         .map((_, ind) => ({ id: getId(items.length + ind) }))
  //     );
  //     console.log("push new items");
  //     setItems(newItems);
  //   };

  return (
    <>
      <div className="pt-4 pl-2 pr-2">
        <div>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={<RightArrow limit={newItemsLimit} />}
            onWheel={onWheel}
          >
            {items.map(({ id }, index) => (
              <Card
                title={routes[index]?.label} // Use the label of the corresponding route
                itemId={id}
                key={id}
                href={routes[index]?.href ?? ""}
                // Use the href of the corresponding route
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
};

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
