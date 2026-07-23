import MainLayout from "../components/layout/MainMenu";
import Hero from "../components/home/Hero";
import WhyChooseUs from "../components/home/WhyChooseUs";
import FeaturedProducts from "../components/home/FeaturedProducts";
import HowItWorks from "../components/home/HowItWorks";
import CTA from "../components/home/CTA";

function Home() {
  return (
    <MainLayout>
      <Hero />
       <FeaturedProducts />
        <WhyChooseUs />
        <HowItWorks />
         <CTA />
    </MainLayout>
  );
}

export default Home;