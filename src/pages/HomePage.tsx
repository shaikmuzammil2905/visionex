import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { MissionMultiplierSection } from '../components/home/MissionMultiplierSection';
import { OurWhySection } from '../components/home/OurWhySection';
import { StudentJourneySection } from '../components/home/StudentJourneySection';
import { ChangingWorldSection } from '../components/home/ChangingWorldSection';
import { TheProblemSection } from '../components/home/TheProblemSection';
import { HomeBlogSection } from '../components/home/HomeBlogSection';
import { HomeCTASection } from '../components/home/HomeCTASection';
import { trackPageView } from '../lib/analytics';

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "THE VISIONEX | Don't Just Find Your Future. Build It.";
    trackPageView('/', document.title);
  }, []);

  return (
    <div className="space-y-4">
      <HeroSection />
      <MissionMultiplierSection />
      <OurWhySection />
      <StudentJourneySection />
      <ChangingWorldSection />
      <TheProblemSection />
      <HomeBlogSection />
      <HomeCTASection />
    </div>
  );
};
