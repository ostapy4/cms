import { SheetList } from "./SheetList";

import { Container, Title } from "app/_components/common";

import { prismaDB } from "lib/db";

export default async function SheetMusicSection() {
  const sheets = await prismaDB.sheetMusic.findMany();

  return (
    <section>
      <Container>
        <div className={"py-12"}>
          <Title className={"mb-8 text-lime-800"}>Sheet Music Form</Title>
          <SheetList sheets={sheets} />
        </div>
      </Container>
    </section>
  );
}
