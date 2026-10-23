import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Gauge,
  MapPin,
  Ruler,
  ShieldCheck,
  Ship,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Footer from './Footer';
import { Navbar } from './Navbar';
import { getWhatsAppUrl } from './WhatsApp';
import { BoatDiscoverySection } from './BoatDiscoverySection';

const assetRoot = '/assets/isla_brava_yacht_assets_generados';
const imageRoot = `${assetRoot}/imagenes`;
const iconRoot = `${assetRoot}/svg`;
const galleryImageUrl = (image) => image.startsWith('/') ? image : `${imageRoot}/${image}`;

const galleryItems = [
  { image: '/assets/yacht_sunseeker_hero.png', es: 'Sunseeker 60ft en el Caribe', en: 'Sunseeker 60ft in the Caribbean' },
  { image: 'salon_interior_generado.png', es: 'Salón interior', en: 'Interior lounge' },
  { image: 'area_popa_generado.png', es: 'Área de popa', en: 'Aft deck' },
  { image: 'solarium_proa_generado.png', es: 'Solárium en proa', en: 'Bow sun lounge' },
  { image: 'cabina_privada_generado.png', es: 'Cabina privada', en: 'Private cabin' },
];

const similarYachts = [
  { name: 'Azimut 55ft', image: 'azimut_55ft_generado.png', guests: 16, length: 55, price: 180 },
  { name: 'Princess 58ft', image: 'princess_58ft_generado.png', guests: 18, length: 58, price: 220 },
  { name: 'Fountaine Pajot 52ft', image: 'fountaine_pajot_52ft_generado.png', guests: 20, length: 52, price: 250 },
  { name: 'Viking 50ft', image: 'viking_50ft_generado.png', guests: 15, length: 50, price: 190 },
  { name: 'Sea Ray 42ft', image: 'sea_ray_42ft_generado.png', guests: 12, length: 42, price: 160 },
];

const inclusions = [
  { icon: 'tripulacion.svg', es: 'Tripulación profesional', en: 'Professional crew' },
  { icon: 'bebidas.svg', es: 'Bebidas', en: 'Drinks' },
  { icon: 'snorkel.svg', es: 'Equipo de snorkel', en: 'Snorkeling gear' },
  { icon: 'toallas.svg', es: 'Toallas', en: 'Towels' },
  { icon: 'musica.svg', es: 'Sistema de sonido', en: 'Sound system' },
];

const bookingUrlFor = (language, yachtName) => {
  const url = new URL(getWhatsAppUrl(language));
  const message = language === 'es'
    ? `Hola Isla Brava, me gustaría consultar disponibilidad para el ${yachtName}.`
    : `Hi Isla Brava, I'd like to check availability for the ${yachtName}.`;
  url.searchParams.set('text', message);
  return url.toString();
};

export const YachtDetailPage = () => {
  const { language } = useLanguage();
  const isSpanish = language === 'es';
  const [activeImage, setActiveImage] = useState(0);
  const activeGalleryItem = galleryItems[activeImage];

  const changeImage = (direction) => {
    setActiveImage((current) => (current + direction + galleryItems.length) % galleryItems.length);
  };

  return (
    <>
      <Navbar />
      <main className="yacht-directory">
        <div className="yacht-directory__layout">
          <article className="yacht-detail" aria-labelledby="yacht-title">
            <section className="yacht-detail__gallery" aria-label={isSpanish ? 'Galería del yate' : 'Yacht gallery'}>
              <div className="yacht-detail__hero">
                <img
                  className="yacht-detail__hero-image"
                  src={galleryImageUrl(activeGalleryItem.image)}
                  alt={isSpanish ? activeGalleryItem.es : activeGalleryItem.en}
                />
                <div className="yacht-detail__hero-shade" />
                <div className="yacht-detail__hero-copy">
                  <span className="yacht-detail__location"><MapPin size={13} aria-hidden="true" /> Cancún, México</span>
                  <span className="yacht-detail__category">{isSpanish ? 'YATES' : 'YACHTS'}</span>
                  <h1 id="yacht-title">Sunseeker 60ft</h1>
                  <p>{isSpanish ? 'LUJO · CONFORT · EXPERIENCIAS INOLVIDABLES' : 'LUXURY · COMFORT · UNFORGETTABLE EXPERIENCES'}</p>
                </div>
                <button className="yacht-detail__gallery-arrow yacht-detail__gallery-arrow--previous" onClick={() => changeImage(-1)} aria-label={isSpanish ? 'Imagen anterior' : 'Previous image'}>
                  <ChevronLeft size={17} aria-hidden="true" />
                </button>
                <button className="yacht-detail__gallery-arrow yacht-detail__gallery-arrow--next" onClick={() => changeImage(1)} aria-label={isSpanish ? 'Imagen siguiente' : 'Next image'}>
                  <ChevronRight size={17} aria-hidden="true" />
                </button>
              </div>
              <div className="yacht-detail__thumbnails" aria-label={isSpanish ? 'Seleccionar imagen' : 'Select image'}>
                {galleryItems.map((item, index) => (
                  <button
                    className={`yacht-detail__thumbnail ${index === activeImage ? 'yacht-detail__thumbnail--active' : ''}`}
                    key={item.image}
                    onClick={() => setActiveImage(index)}
                    aria-label={`${isSpanish ? 'Ver' : 'View'} ${isSpanish ? item.es : item.en}`}
                    aria-pressed={index === activeImage}
                  >
                    <img src={galleryImageUrl(item.image)} alt="" />
                  </button>
                ))}
              </div>
            </section>

            <section className="yacht-detail__specs" aria-label={isSpanish ? 'Características del yate' : 'Yacht details'}>
              <div className="yacht-detail__spec">
                <Users aria-hidden="true" />
                <div><span>{isSpanish ? 'Capacidad' : 'Capacity'}</span><strong>20 {isSpanish ? 'pasajeros' : 'guests'}</strong></div>
              </div>
              <div className="yacht-detail__spec">
                <Ruler aria-hidden="true" />
                <div><span>{isSpanish ? 'Eslora' : 'Length'}</span><strong>60 {isSpanish ? 'pies' : 'ft'}</strong></div>
              </div>
              <div className="yacht-detail__spec">
                <Gauge aria-hidden="true" />
                <div><span>{isSpanish ? 'Velocidad' : 'Speed'}</span><strong>22 {isSpanish ? 'nudos' : 'knots'}</strong></div>
              </div>
              <div className="yacht-detail__spec">
                <CalendarDays aria-hidden="true" />
                <div><span>{isSpanish ? 'Renta mínima' : 'Minimum rental'}</span><strong>4 {isSpanish ? 'horas' : 'hours'}</strong></div>
              </div>
            </section>

            <section className="yacht-detail__about">
              <h2>{isSpanish ? 'Sobre este yate' : 'About this yacht'}</h2>
              <p>{isSpanish
                ? 'El Sunseeker 60ft combina elegancia, rendimiento y comodidad para ofrecerte una experiencia de lujo en el Caribe. Ideal para grupos grandes, celebraciones especiales o simplemente para disfrutar de un día inolvidable en el mar.'
                : 'The Sunseeker 60ft combines elegance, performance, and comfort for a luxury Caribbean experience. Ideal for larger groups, special celebrations, or simply enjoying an unforgettable day at sea.'}</p>
            </section>

            <section className="yacht-detail__includes">
              <h2>{isSpanish ? 'Incluye' : 'Included'}</h2>
              <div className="yacht-detail__inclusions">
                {inclusions.map((item) => (
                  <div className="yacht-detail__inclusion" key={item.icon}>
                    <img src={`${iconRoot}/${item.icon}`} alt="" aria-hidden="true" />
                    <span>{isSpanish ? item.es : item.en}</span>
                    {item.icon === 'bebidas.svg' && (
                      <small>{isSpanish ? '(agua, refrescos, cerveza)' : '(water, soft drinks, beer)'}</small>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="yacht-detail__booking" aria-label={isSpanish ? 'Precio y reservación' : 'Price and booking'}>
              <div className="yacht-detail__price">
                <span>{isSpanish ? 'Desde' : 'From'}</span>
                <strong>$200 <small>USD</small></strong>
                <span>{isSpanish ? 'por hora' : 'per hour'}</span>
              </div>
              <div className="yacht-detail__booking-action">
                <a href={bookingUrlFor(language, 'Sunseeker 60ft')} target="_blank" rel="noreferrer">
                  <img src={`${iconRoot}/whatsapp.svg`} alt="" aria-hidden="true" />
                  {isSpanish ? 'Consulta disponibilidad' : 'Check availability'}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <div className="yacht-detail__assurances">
                  <span><ShieldCheck size={13} aria-hidden="true" />{isSpanish ? 'Reserva segura' : 'Secure booking'}</span>
                  <span>{isSpanish ? 'Atención personalizada' : 'Personalized service'}</span>
                  <span>{isSpanish ? 'Experiencias a tu medida' : 'Tailored experiences'}</span>
                </div>
              </div>
            </section>
          </article>

          <aside className="yacht-similar" aria-labelledby="similar-yachts-title">
            <div className="yacht-similar__heading">
              <h2 id="similar-yachts-title">{isSpanish ? 'Yates similares' : 'Similar yachts'}</h2>
              <Link to="/fleet">{isSpanish ? 'Ver todos' : 'View all'} <ArrowRight size={13} aria-hidden="true" /></Link>
            </div>
            <div className="yacht-similar__list">
              {similarYachts.map((yacht) => (
                <article className="yacht-card" key={yacht.name}>
                  <img className="yacht-card__image" src={`${imageRoot}/${yacht.image}`} alt={`${yacht.name} ${isSpanish ? 'en el Caribe' : 'in the Caribbean'}`} />
                  <div className="yacht-card__details">
                    <h3>{yacht.name}</h3>
                    <span><Users size={12} aria-hidden="true" /> {isSpanish ? 'Capacidad:' : 'Capacity:'} {yacht.guests} {isSpanish ? 'pasajeros' : 'guests'}</span>
                    <span><Ship size={12} aria-hidden="true" /> {isSpanish ? 'Eslora:' : 'Length:'} {yacht.length} {isSpanish ? 'pies' : 'ft'}</span>
                    <span><Clock3 size={12} aria-hidden="true" /> {isSpanish ? 'Desde:' : 'From:'} ${yacht.price} USD/{isSpanish ? 'hora' : 'hour'}</span>
                    <a href={bookingUrlFor(language, yacht.name)} target="_blank" rel="noreferrer">
                      {isSpanish ? 'Ver detalles' : 'View details'} <ArrowRight size={12} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <section className="yacht-similar__help">
              <div aria-hidden="true" className="yacht-similar__wave">〰</div>
              <h3>{isSpanish ? '¿No encuentras el yate ideal?' : 'Can’t find the right yacht?'}</h3>
              <p>{isSpanish
                ? 'Contáctanos y te ayudamos a encontrar la mejor opción para tu experiencia.'
                : 'Contact us and we’ll help you find the best fit for your experience.'}</p>
              <a href={bookingUrlFor(language, 'un yate para mi experiencia')} target="_blank" rel="noreferrer">
                {isSpanish ? 'Habla con nosotros' : 'Chat with us'} <ArrowRight size={14} aria-hidden="true" />
              </a>
            </section>
            <p className="yacht-similar__disclaimer">
              {isSpanish
                ? 'Imágenes ilustrativas. Modelos, disponibilidad y especificaciones sujetos a confirmación.'
                : 'Illustrative images. Models, availability, and specifications are subject to confirmation.'}
            </p>
          </aside>
        </div>

        <div className="yacht-directory__signature">
          <span><MapPin size={15} aria-hidden="true" /> Cancún, México</span>
          <p>{isSpanish ? 'Vive la experiencia Isla Brava' : 'Live the Isla Brava experience'}</p>
          <Link to="/">{isSpanish ? 'Volver al inicio' : 'Back to home'} <ArrowLeft size={13} aria-hidden="true" /></Link>
        </div>
      </main>
      <BoatDiscoverySection />
      <Footer />
    </>
  );
};

export default YachtDetailPage;
