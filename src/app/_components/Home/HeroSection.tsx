import { MainImageForm } from "./MainImageForm";

import { Container, Title } from "app/_components/common";

import { prismaDB } from "lib/db";

export default async function HeroSection() {
  const mainImageData = await prismaDB.mainImage.findFirst();

  return (
    <section>
      <Container>
        <div className={"py-12"}>
          <Title className={"mb-8 text-lime-800"}>Main Image</Title>
          <MainImageForm data={mainImageData} />
        </div>
      </Container>
    </section>
  );
}
