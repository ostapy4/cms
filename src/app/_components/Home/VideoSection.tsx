import { VideoForm } from "./VideoForm";

import { Container, Title } from "app/_components/common";

import { prismaDB } from "lib/db";

export default async function VideoSection() {
  const youtubeVideo = await prismaDB.youtubeVideo.findMany();

  return (
    <section>
      <Container>
        <div className={"py-12"}>
          <Title className={"mb-8 text-lime-800"}>YouTube Video</Title>
          <VideoForm data={youtubeVideo} />
        </div>
      </Container>
    </section>
  );
}
