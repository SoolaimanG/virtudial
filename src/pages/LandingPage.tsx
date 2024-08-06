import { LandingPageNavbar } from "../components/landing-page-navbar";
import { Hero } from "../components/hero";
import { LandingPageFeatures } from "../components/landing-page-features";
import { LandingPageHowItWorks } from "../components/landing-page-how-it-works";
import { LandingPagePricing } from "../components/landing-page-pricing";
import { LandingPageContactPage } from "../components/landing-page-contact-us";
import { EventBanner } from "../components/event-banner";
import { LandingPageFooter } from "../components/landing-page-footer";

const LandingPage = () => {
  return (
    <main className="overflow-hidden w-full">
      <LandingPageNavbar />
      <Hero />
      <LandingPageFeatures />
      <LandingPageHowItWorks />
      <LandingPagePricing />
      <LandingPageContactPage />
      <EventBanner />
      <LandingPageFooter />
    </main>
  );
};

export default LandingPage;
