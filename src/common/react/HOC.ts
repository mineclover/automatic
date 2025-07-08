import React, { Children, JSX, isValidElement } from "react";

/**
 * 허용된 이름의 컴포넌트를 찾아서 반환
 * @param children
 * @param displayName
 * @returns
 */
export const getChildrenOnDisplayName = (
  children: React.ReactNode,
  displayName?: string
) =>
  Children.map(children, (child) => {
    if (isValidElement(child))
      return typeof child.type === "function" &&
        "displayName" in child.type &&
        child.type.displayName === displayName
        ? child
        : null;
    return null;
  });

/**
 * 허용된 이름들을 키로 하는 객체를 반환
 * @param children
 * @param displayName
 * @returns
 */
export const getChildrenOnDisplayNameObject = <T extends string[]>(
  children: React.ReactNode,
  displayName: T
) => {
  const obj = {
    rest: [],
  } as Record<T[number] | "rest", React.ReactNode[]>;

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (typeof child.type === "function" && "displayName" in child.type) {
        const target = child.type.displayName as T[number];
        if (displayName.includes(target)) {
          if (!(target in obj)) obj[target] = [];
          obj[target].push(child);
        } else {
          obj.rest.push(child);
        }
      } else {
        obj.rest.push(child);
      }
    }
  });

  return obj;
};
