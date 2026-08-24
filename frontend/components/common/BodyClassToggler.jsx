"use client";
import React, { useEffect } from "react";

export default function BodyClassToggler({
  classes = ["spybody", "color-blue", "box-body"],
}) {
  useEffect(() => {
    classes.forEach((className) => {
      document.body.classList.add(className);
    });

    return () => {
      classes.forEach((className) => {
        document.body.classList.remove(className);
      });
    };
  }, []);

  return <></>;
}
