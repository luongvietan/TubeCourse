import {
  Header,
  Hero,
  Portfolio,
  Features,
  Niches,
  HowItWorks,
  Pricing,
  FAQ,
  CTA,
  Footer,
} from "@/components/marketing";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <Features />
        <Niches />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
