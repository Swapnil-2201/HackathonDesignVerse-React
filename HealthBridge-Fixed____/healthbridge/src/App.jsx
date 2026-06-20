import AppProviders from './app/providers';
import MainLayout from './layouts/MainLayout';

import Hero from './components/Hero/Hero';
import BarrierSection from './components/BarrierSection/BarrierSection';
import TrustSection from './components/TrustSection/TrustSection';
import MentalHealth from './components/MentalHealth/MentalHealth';
import Stories from './components/Stories/Stories';

import {SymptomCheckerModal} from './components/SymptomChecker/SymptomCheckerModal';
import {AISymptomCheckerProvider} from './context/AISymptomCheckerContext';
import {RiskMeter} from './components/RiskMeter/RiskMeter';

import ResourceHub from './components/ResourceHub/ResourceHub';



export default function App() {
  return (
    <AppProviders>
  <AISymptomCheckerProvider>
    <MainLayout>
      <Hero />
      <BarrierSection />
      <TrustSection />
      <MentalHealth />
      <Stories />

      
      <RiskMeter />
      <ResourceHub />
      

      <SymptomCheckerModal />
    </MainLayout>
  </AISymptomCheckerProvider>
</AppProviders>
  );
}
