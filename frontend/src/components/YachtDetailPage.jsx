import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  MapPin,
  Music2,
  ShieldCheck,
  Sun,
  Users,
  Utensils,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Footer from './Footer';
import { Navbar } from './Navbar';
import { getWhatsAppUrl } from './WhatsApp';

const featureItems = [
  {
    icon: '/assets/capacidad_personas.svg',
    titleEs: 'Capacidad',
    titleEn: 'Capacity',
    detailEs: '20 pasajeros',
    detailEn: '20 guests',
  },
  {
    icon: '/assets/area_descanso.svg',
    titleEs: 'Área de descanso',
    titleEn: 'Lounge area',
    detailEs: 'Amplia y cómoda',
    detailEn: 'Spacious and comfortable',
  },
  {
    icon: '/assets/sol_cocina.svg',
    titleEs: 'Cocina y barra',
    titleEn: 'Galley and bar',
    detailEs: 'Completamente equipada',
    detailEn: 'Fully equipped',
  },
  {
    icon: '/assets/sistema_sonido.svg',
    titleEs: 'Sistema de sonido',
    titleEn: 'Sound system',
    detailEs: 'Audio de alta calidad',
    detailEn: 'High-quality audio',
  },
];

const galleryItems = [
  {
    image: '/assets/solarium_proa.png',
    es: 'Solárium en proa',
    en: 'Bow sun lounge',
    icon: Sun,
  },
  {
    image: '/assets/salon_interior.png',
    es: 'Salón interior',
    en: 'Interior lounge',
    icon: Utensils,
  },
  {
    image: '/assets/area_popa.png',
    es: 'Área de popa',
    en: 'Aft deck',
    icon: Users,
  },
  {
    image: '/assets/cabina_privada.png',
    es: 'Cabinas privadas',
    en: 'Private cabins',
    icon: BedDouble,
  },
];

export const YachtDetailPage = () => {
  const { language } = useLanguage();
  const isSpanish = language === 'es';
  const bookingUrl = getWhatsAppUrl(language);

  return (
    <>
      <Navbar />
      <main className="yacht-page">
        <div className="yacht-page__shell">
          <Link to="/" className="yacht-page__back">
            <ArrowLeft size={16} aria-hidden="true" />
            {isSpanish ? 'Volver al inicio' : 'Back to home'}
          </Link>

          <article className="yacht-feature" aria-labelledby="yacht-title">
            <div className="yacht-feature__hero">
              <img
                className="yacht-feature__hero-image"
                src="/assets/yacht_sunseeker_hero.png"
                alt={isSpanish ? 'Yate Sunseeker navegando en el Caribe' : 'Sunseeker yacht cruising in the Caribbean'}
              />
              <div className="yacht-feature__hero-shade" />
              <div className="yacht-feature__brand">
                <img src="/assets/01_logo_header.png" alt="Isla Brava" />
                <span>YACHTS · JET SKIS · FISHING</span>
              </div>
              <span className="yacht-feature__ribbon">YACHT CHARTER</span>
              <div className="yacht-feature__headline">
                <p>{isSpanish ? 'Lujo · confort · libertad' : 'Luxury · comfort · freedom'}</p>
                <h1 id="yacht-title">Sunseeker 60ft</h1>
              </div>
              <div className="yacht-feature__price" aria-label={isSpanish ? '200 dólares estadounidenses por hora' : '200 US dollars per hour'}>
                <strong>$200 <span>USD</span></strong>
                <small>{isSpanish ? 'por hora' : 'per hour'}</small>
              </div>
            </div>

            <div className="yacht-feature__content">
              <section className="yacht-feature__specs" aria-label={isSpanish ? 'Características' : 'Features'}>
                {featureItems.map((feature) => (
                  <div className="yacht-spec" key={feature.titleEn}>
                    <img src={feature.icon} alt="" aria-hidden="true" />
                    <div>
                      <span>{isSpanish ? feature.titleEs : feature.titleEn}</span>
                      <strong>{isSpanish ? feature.detailEs : feature.detailEn}</strong>
                    </div>
                  </div>
                ))}
              </section>

              <section className="yacht-feature__gallery" aria-label={isSpanish ? 'Espacios del yate' : 'Yacht spaces'}>
                {galleryItems.map((item) => (
                  <figure className="yacht-gallery-card" key={item.image}>
                    <img src={item.image} alt={isSpanish ? item.es : item.en} />
                    <figcaption>
                      <item.icon size={15} aria-hidden="true" />
                      {isSpanish ? item.es : item.en}
                    </figcaption>
                  </figure>
                ))}
              </section>

              <div className="yacht-feature__action-row">
                <a className="yacht-feature__cta" href={bookingUrl} target="_blank" rel="noreferrer">
                  <img src="/assets/calendario.svg" alt="" aria-hidden="true" />
                  {isSpanish ? 'Consulta disponibilidad' : 'Check availability'}
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
                <p className="yacht-feature__signature">
                  {isSpanish ? 'Vive la experiencia' : 'Live the experience'}
                  <span>Isla Brava</span>
                </p>
              </div>

              <div className="yacht-feature__trust">
                <span><MapPin size={19} aria-hidden="true" /> Cancún, México</span>
                <span><ShieldCheck size={19} aria-hidden="true" /> {isSpanish ? 'Tripulación profesional' : 'Professional crew'}</span>
                <span><Music2 size={19} aria-hidden="true" /> {isSpanish ? 'Experiencias personalizadas' : 'Tailored experiences'}</span>
              </div>

              <div className="yacht-feature__note">
                <img src="/assets/tripulacion_seguridad.svg" alt="" aria-hidden="true" />
                <p>{isSpanish
                  ? 'Un día privado en el Caribe, con atención de nuestra tripulación desde que subes a bordo.'
                  : 'A private day in the Caribbean, with attentive crew service from the moment you step aboard.'}</p>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default YachtDetailPage;