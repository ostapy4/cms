import VideoSection from "./_components/Home/VideoSection";

import GallerySection from "app/_components/Home/GallerySection";
import HeroSection from "app/_components/Home/HeroSection";
import ReviewsSection from "app/_components/Home/ReviewsSection";

export default function AdminHomePage() {
  return (
    <>
      <HeroSection />
      <GallerySection />
      <VideoSection />
      <ReviewsSection />
    </>
  );
}
