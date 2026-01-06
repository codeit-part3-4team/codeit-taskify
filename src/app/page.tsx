import HeroSection from "@/app/_components/landing/HeroSection/HeroSection";
import LandingGnb from "@/components/Gnb/variants/LandingGnb/LandingGnb";
import PointSection from "@/app/_components/landing/PointSection/PointSection";
import SettingsSection from "@/app/_components/landing/SettingsSection/SettingsSection";
import LandingFooter from "@/app/_components/landing/LandingFooter/LandingFooter";

export default function Home() {
  return (
    <>
    <LandingGnb />
    <main id="main-content">
      <HeroSection />
      <PointSection />
      <SettingsSection />
    </main>
    <LandingFooter />
    </>
  );
}
