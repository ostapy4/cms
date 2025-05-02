"use client";

import { useEffect } from "react";

import { Container, Title } from "app/_components/common";
import { Button } from "app/_components/common/UI";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section>
      <Container>
        <div
          className={
            "flex min-h-[70vh] items-center justify-center py-16 text-center"
          }
        >
          <div
            className={
              "mx-auto flex max-w-screen-lg flex-col items-center gap-y-6"
            }
          >
            <Title size={"4xl"}>Something went wrong!</Title>
            <p className={"w-full break-all leading-relaxed"}>
              {error.message}
            </p>
            <Button className={{ button: "mx-auto" }} onClick={() => reset()}>
              Try again
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
