"use client";

import { SectionForm } from "./SectionForm";
import { useEffect, useState } from "react";

import { Button } from "app/_components/common/UI";

type InitialSectionForm = {
  isSections: boolean;
};

export function InitialSectionForm({ isSections }: InitialSectionForm) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isSections) setIsVisible(true);
  }, [isSections]);
  return (
    <>
      {(!isSections || isVisible) && <SectionForm />}
      <Button
        className={{ button: "self-start" }}
        colorVariant={"cms"}
        onClick={() => setIsVisible(true)}
        disabled={isVisible}
      >
        Add new Section
      </Button>
    </>
  );
}
