import HeroSection from "@/components/HeroSection";
import Search from "@/components/Search";
import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import NavLinksBar from "@/components/shared/NavLinksBar";
// import AutoplayCarousel from "@/components/AutoplayCarousel";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Search />
      <NavLinksBar />
      {/* <AutoplayCarousel /> */}
      <HeroSection
        headline="Connect with Expert Liver Physicians"
        subheadline="Submit your condition and receive personalized treatment plans from trusted specialists."
        ctaText="Get Started"
      />
      <Footer />
    </div>
  );
};

export default Home;
