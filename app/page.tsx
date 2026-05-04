import HeroSection from '@/components/HeroOne/page';
import Herotwo from '@/components/HeroTwo/page';
import HeroThree from '@/components/HeroThree/page';
import DestinationsSection from '@/components/DestinationsSection/page';
import TripPlanner from '@/components/TripPlanner/page';
import Team from '@/components/Team/page';
import Testimonials from '@/components/Testimonials/page';
import Faq from '@/components/FAQ/page';

export default function Home() {
  return (
    <main>
      <HeroSection /> <Herotwo /> <HeroThree /> <DestinationsSection />
      <TripPlanner />
      <Team />
      <Testimonials />
      <Faq />
    </main>
  );
}
