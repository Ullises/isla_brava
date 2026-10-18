import React from 'react';
import { useLanguage } from '../context/LanguageContext';
const HERO_IMAGE = "/assets/02_hero_scene.png";
const HERO_LOGO = "/assets/isla_brava_logo_adaptive.svg";

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="inicio" data-testid="hero-section" className="isla-hero">
      <img src={HERO_IMAGE} alt={t('hero.title')} className="isla-hero__image" />

      <div className="isla-hero__logo-wrap" aria-label="Isla Brava logo">
        <img src={HERO_LOGO} alt="Isla Brava Yachts & Jet Skis" className="isla-hero__logo" />
        <p className="isla-hero__tagline">
          Yacht &amp; Jet Ski Rentals in Cancun
          <span className="isla-hero__tagline-accent">Private yacht charters</span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
