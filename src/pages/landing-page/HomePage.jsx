import React from "react";
import LandingPageLayout from "../../components/layouts/landindPage-layout";
import Hero from "./Hero";
import Stats from "./stats";
import CTA from "./CTA";
import Features from "./Features";

function Homepage() {
  return (
    <LandingPageLayout>
      <Hero />
      <Features />
      <Stats />
      <CTA />
    </LandingPageLayout>
  );
}

export default Homepage;
