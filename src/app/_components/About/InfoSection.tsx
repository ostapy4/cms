import { InitialSectionForm } from "./InitialSectionForm";
import { SectionForm } from "./SectionForm";

import { Container, Title } from "app/_components/common";

import { prismaDB } from "lib/db";

export default async function InfoSection() {
  const sections = await prismaDB.section.findMany({
    include: { details: true },
  });

  return (
    <section>
      <Container>
        <div className={"flex flex-col gap-y-8 py-12"}>
          <Title className={"text-lime-800"}>About me Info</Title>
          {sections.map((section) => {
            return <SectionForm key={section.id} data={section} />;
          })}
          <InitialSectionForm isSections={sections.length > 0} />
        </div>
      </Container>
    </section>
  );
}
