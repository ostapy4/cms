import { ReviewForm } from "./ReviewForm";
import Image from "next/image";

import { Container, Title } from "app/_components/common";

import { prismaDB } from "lib/db";

export default async function ReviewsSection() {
  const reviews = await prismaDB.review.findMany();

  return (
    <section>
      <Container>
        <div className={"py-12"}>
          <Title className={"mb-8 text-lime-800"}>Reviews</Title>
          <ReviewForm />
          <div>
            <ul className={"flex flex-col gap-y-2"}>
              {reviews.map((r, Idx) => {
                return (
                  <li key={r.id}>
                    <div
                      className={
                        "flex items-center gap-x-2 divide-x-2 divide-lime-700 rounded-lg border border-lime-700 p-1"
                      }
                    >
                      <div
                        className={
                          "min-w-12 px-2 text-center text-xl font-semibold"
                        }
                      >
                        {Idx + 1}
                      </div>
                      {r.avatar ? (
                        <div className={"px-2"}>
                          <div
                            className={
                              "relative size-10 overflow-hidden rounded-full"
                            }
                          >
                            <Image
                              src={r.avatar}
                              alt={"Avatar"}
                              fill
                              className={"object-cover"}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className={"px-2"}>
                          <div
                            className={
                              "flex size-10 items-center justify-center rounded-full bg-lime-600 text-2xl font-bold text-white"
                            }
                          >
                            <span>{r.name[0].toLocaleUpperCase()}</span>
                          </div>
                        </div>
                      )}

                      <p className={"min-w-28 px-2"}>{r.name}</p>
                      <p className={"line-clamp-1 flex-1 px-2"}>{r.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
