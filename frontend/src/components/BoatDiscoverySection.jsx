import React, { useRef, useState } from 'react';
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
  const [boatOrder, setBoatOrder] = useState([-2, -1, 0, 1, 2]);
  const [slideDirection, setSlideDirection] = useState('');
  const pointerStart = useRef(null);
  const suppressClick = useRef(false);

  const moveBoats = (direction) => {
    if (slideDirection) return;

    setBoatOrder((current) => direction > 0
      ? [...current.slice(1), current[current.length - 1] + 1]
      : [current[0] - 1, ...current.slice(0, -1)]);
    setSlideDirection(direction > 0 ? 'next' : 'previous');
  };

  const handleAnimationEnd = (event) => {
    if (event.target === event.currentTarget) setSlideDirection('');
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event) => {
    if (pointerStart.current === null) return;

    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;

    if (Math.abs(distance) < 40) return;

    suppressClick.current = true;
    moveBoats(distance < 0 ? 1 : -1);
  };

  const handleCardClick = (event) => {
    if (!suppressClick.current) return;
    event.preventDefault();
    suppressClick.current = false;
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
        <div
          className="boat-discovery__cards"
          aria-label={isSpanish ? 'Desliza para explorar los yates' : 'Swipe to explore yachts'}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStart.current = null; }}
          onClickCapture={handleCardClick}
        >
          <div
            className={`boat-discovery__track ${slideDirection ? `boat-discovery__track--${slideDirection}` : ''}`}
            onAnimationEnd={handleAnimationEnd}
          >
            {boatOrder.map((boatPosition, index) => {
              const boatIndex = ((boatPosition % boats.length) + boats.length) % boats.length;
              const boat = boats[boatIndex];

              return (
                <a
                  className="boat-discovery__card"
                  href={boatInquiryUrl(language, boat.name)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${isSpanish ? 'Consultar disponibilidad para' : 'Check availability for'} ${boat.name}`}
                  key={boatPosition}
                  data-position={index - 2}
                  tabIndex={slideDirection && index === boatOrder.length - 1 ? -1 : undefined}
                >
                  <img
                    src={`${imageRoot}/${boat.image}`}
                    alt={isSpanish ? boat.altEs : boat.altEn}
                    loading="lazy"
                    draggable="false"
                  />
                  <span>{boat.name}</span>
                </a>
              );
            })}
          </div>
        </div>
        <div className="boat-discovery__controls" aria-label={isSpanish ? 'Controles de yates' : 'Yacht carousel controls'}>
          <button
            type="button"
            onClick={() => moveBoats(-1)}
            aria-label={isSpanish ? 'Ver yates anteriores' : 'Show previous yachts'}
            disabled={Boolean(slideDirection)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => moveBoats(1)}
            aria-label={isSpanish ? 'Ver más yates' : 'Show more yachts'}
            disabled={Boolean(slideDirection)}
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
