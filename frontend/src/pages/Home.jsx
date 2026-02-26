import React from "react";
import Hero from "../components/Hero";
import PromoBanner from "../components/PromoBanner";
import CategoryGrid from "../components/CategoryGrid";
import NewArrivals from "../components/NewArrivals";
import BestSellers from "../components/BestSellers";
import OurPolicy from "../components/OurPolicy";

function Home() {
  return (
    <div>
      <Hero />
      <PromoBanner />
      <CategoryGrid />
      <NewArrivals />
      <BestSellers />
      <OurPolicy />
    </div>
  );
}

export default Home;
