"use client";
import React from "react";
import Link from "next/link";
import { menuItems, menuItemsLight } from "@/data/menu";
import { usePathname } from "next/navigation";
export default function Nav1() {
  const pathname = usePathname();
  // menu-item-open
  return (
    <>
      <ul className="tmp-mainmenu dark-content">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`${item.hasDropdown ? "has-dropdown" : ""} ${
              item.submenu
                ? item.submenu.some(
                    (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                  )
                  ? "menu-item-open"
                  : ""
                : ""
            }`}
          >
            {item.isLink ? (
              <Link
                className={`${
                  item.href.split("/")[1] == pathname.split("/")[1]
                    ? "active"
                    : ""
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            ) : (
              <a href={item.href}>
                {item.label}
                {item.hasDropdown && (
                  <i className="fa-regular fa-chevron-down" />
                )}
              </a>
            )}

            {item.hasDropdown && (
              <ul className="submenu">
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      className={`${
                        subItem.href.split("/")[1] == pathname.split("/")[1]
                          ? "active"
                          : ""
                      }`}
                      href={subItem.href}
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <ul className="tmp-mainmenu light-content">
        {menuItemsLight.map((item, index) => (
          <li
            key={index}
            className={`${item.hasDropdown ? "has-dropdown" : ""} ${
              item.submenu
                ? item.submenu.some(
                    (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                  )
                  ? "menu-item-open"
                  : ""
                : ""
            }`}
          >
            {item.isLink ? (
              <Link
                className={`${
                  item.href.split("/")[1] == pathname.split("/")[1]
                    ? "active"
                    : ""
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            ) : (
              <a href={item.href}>
                {item.label}
                {item.hasDropdown && (
                  <i className="fa-regular fa-chevron-down" />
                )}
              </a>
            )}

            {item.hasDropdown && (
              <ul className="submenu">
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      className={`${
                        subItem.href.split("/")[1] == pathname.split("/")[1]
                          ? "active"
                          : ""
                      }`}
                      href={subItem.href}
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
