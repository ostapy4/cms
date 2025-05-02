import { Loader } from "app/_components/common/Loader";

export default function Loading() {
  return (
    <section className={"flex h-screen items-center justify-center"}>
      <Loader className={{ icon: "text-lime-300", wrapper: "p-16" }} />
    </section>
  );
}
