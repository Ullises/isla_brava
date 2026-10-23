import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getWhatsAppUrl } from './WhatsApp';

const imageRoot = '/assets/isla_brava_boat_discovery_assets/images';

const boats = [
  {
    name: 'Azura 72',
    image: 'azura_72_night_yacht.png',
    altEs: 'Yate de lujo iluminado por la noche',
    altEn: 'Luxury yacht illuminated at night',
  },
  {
    name: 'Seaborn Echo',
    image: 'seaborn_echo_aerial_yacht.png',
    altEs: 'Yate visto desde arriba en aguas turquesa',
    altEn: 'Yacht viewed from above in turquoise water',
  },
  {
    name: 'Horizon Drift',
    image: 'horizon_drift_motor_yacht.png',
    altEs: 'Yate de motor navegando en aguas azules',
    altEn: 'Motor yacht cruising in deep blue water',
  },
  {
    name: 'Golden Dolphin',
    image: 'golden_dolphin_bow_view.png',
    altEs: 'Proa de un yate frente al mar',
    altEn: 'Yacht bow facing the sea',
  },
];

const boatInquiryUrl = (language, boatName) => {
  const message = language === 'es'
    ? `Hola Isla Brava, quisiera conocer las opciones disponibles para ${boatName}.`
    : `Hi Isla Brava, I'd like to know about available options for ${boatName}.`;

  const url = new URL(getWhatsAppUrl(language));
  url.searchParams.set('text', message);
  return url.toString();
};

export const BoatDiscoverySection = () => {
  const { language } = useLanguage();
  const isSpanish = language === 'es';
  const [firstBoatIndex, setFirstBoatIndex] = useState(0);
  const visibleBoats = boats.map((_, index) => boats[(firstBoatIndex + index) % boats.length]);

  const moveBoats = (direction) => {
    setFirstBoatIndex((current) => (current + direction + boats.length) % boats.length);
  };

  return (
    <section className="boat-discovery" aria-labelledby="boat-discovery-title">
      <div className="boat-discovery__inner">
        <p className="boat-discovery__eyebrow">
          {isSpanish ? 'Tu próxima aventura comienza aquí' : 'Your next adventure starts here'}
        </p>
        <h2 id="boat-discovery-title">
          {isSpanish
            ? <>Encuentra el yate ideal<br />para tu próxima escapada.</>
            : <>Find the perfect boat<br />for your next escape.</>}
        </h2>
        <div className="boat-discovery__cards" aria-live="polite">
          {visibleBoats.map((boat) => (
            <a
              className="boat-discovery__card"
              href={boatInquiryUrl(language, boat.name)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${isSpanish ? 'Consultar disponibilidad para' : 'Check availability for'} ${boat.name}`}
              key={boat.name}
            >
              <img
                src={`${imageRoot}/${boat.image}`}
                alt={isSpanish ? boat.altEs : boat.altEn}
                loading="lazy"
              />
              <span>{boat.name}</span>
            </a>
          ))}
        </div>
        <div className="boat-discovery__controls" aria-label={isSpanish ? 'Controles de yates' : 'Yacht carousel controls'}>
          <button
            type="button"
            onClick={() => moveBoats(-1)}
            aria-label={isSpanish ? 'Ver yates anteriores' : 'Show previous yachts'}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => moveBoats(1)}
            aria-label={isSpanish ? 'Ver más yates' : 'Show more yachts'}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <p className="boat-discovery__note">
          {isSpanish
            ? 'Imágenes ilustrativas y nombres de ejemplo. Consulta con nuestro equipo las embarcaciones disponibles.'
            : 'Illustrative images and sample names. Contact our team to check available boats.'}
        </p>
      </div>
    </section>
  );
};

export default BoatDiscoverySection;
