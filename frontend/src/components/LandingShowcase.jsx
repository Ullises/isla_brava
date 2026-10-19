import React from 'react';
import { ArrowRight, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const categories = [
  { icon: '/assets/yates.svg', image: '/assets/07_card_yates.png', to: '/yachts', es: 'Yates', en: 'Yachts', subEs: 'Lujo y confort', subEn: 'Luxury and comfort' },
  { icon: '/assets/motos_acuaticas.svg', image: '/assets/08_card_motos_acuaticas.png', es: 'Motos acuaticas', en: 'Jet skis', subEs: 'Adrenalina y diversion', subEn: 'Adrenaline and fun' },
  { icon: '/assets/pesca_deportiva.svg', image: '/assets/09_card_pesca_deportiva.png', es: 'Pesca deportiva', en: 'Sport fishing', subEs: 'Grandes experiencias', subEn: 'Big experiences' },
  { icon: '/assets/tours.svg', image: '/assets/10_card_tours.png', es: 'Tours', en: 'Tours', subEs: 'Explora el paraiso', subEn: 'Explore paradise' },
  { icon: '/assets/experiencias_vip.svg', image: '/assets/11_card_experiencias_vip.png', es: 'Experiencias VIP', en: 'VIP experiences', subEs: 'A tu medida', subEn: 'Made for you' },
];

const benefits = [
  { image: '/assets/14_icon_seguridad.svg', svg: '/assets/14_icon_seguridad.svg', es: 'Seguridad en todo momento', en: 'Safety at all times' },
  { image: '/assets/15_icon_embarcaciones.svg', svg: '/assets/15_icon_embarcaciones.svg', es: 'Embarcaciones de primer nivel', en: 'First-class vessels' },
  { image: '/assets/16_icon_personal.svg', svg: '/assets/16_icon_personal.svg', es: 'Personal capacitado', en: 'Trained staff' },
  { image: '/assets/17_icon_experiencias.svg', svg: '/assets/17_icon_experiencias.svg', es: 'Experiencias personalizadas', en: 'Personalized experiences' },
  { image: '/assets/18_icon_mar.svg', svg: '/assets/18_icon_mar.svg', es: 'Compromiso con el mar', en: 'Commitment to the sea' },
];

export const CategoryStrip = () => (
  <section className="category-strip" id="servicios" aria-label="Isla Brava services">
    {categories.map((category) => (
      <Link className="category-strip__item" to={category.to || '/experiences'} key={category.en}>
        <img src={category.icon || category.image} alt="" />
        <span>{category.en}</span>
      </Link>
    ))}
  </section>
);

export const AboutSection = () => {
  const { language } = useLanguage();
  const isSpanish = language === 'es';

  return (
    <section className="about-section" id="nosotros">
      <div className="about-section__copy">
        <p className="eyebrow">{isSpanish ? 'Sobre nosotros' : 'About us'}</p>
        <h2>Isla Brava</h2>
        <p className="about-section__brand">Yachts & Jet Skis</p>
        <h3 className="about-section__lead">{isSpanish
          ? 'Pesca deportiva y aventuras en moto acuática en Cancún e Isla Mujeres'
          : 'Fishing trips & jet ski adventures in Cancun and Isla Mujeres'}</h3>
        <p>{isSpanish
          ? 'Explora el mar Caribe a bordo de un yate privado o vive la emoción de una moto acuática. Paseos flexibles, tripulación profesional y servicio personalizado.'
          : 'Explore the Caribbean Sea aboard a private yacht or experience the thrill of a jet ski. Flexible trips, professional crew and personalized service.'}</p>
        <p>{isSpanish
          ? 'Somos una empresa dedicada a la renta de yates y motos acuaticas en Cancun y la Riviera Maya. Nuestra mision es brindarte experiencias inolvidables, con seguridad, confort y el mejor servicio.'
          : 'We are dedicated to yacht and jet ski rentals in Cancun and the Riviera Maya. Our mission is to create unforgettable experiences with safety, comfort, and the best service.'}</p>
        <p className="about-section__signature">{isSpanish ? 'Mas que un paseo, es un estilo de vida' : 'More than a ride, it is a way of life'} <span>♡</span></p>
      </div>
      <div className="about-section__image-wrap">
        <img src="/assets/06_about_photo.png" alt={isSpanish ? 'Experiencia Isla Brava en el mar' : 'Isla Brava experience at sea'} />
      </div>
    </section>
  );
};

export const CategoryShowcase = () => {
  const { language } = useLanguage();
  const isSpanish = language === 'es';

  return (
    <section className="showcase-section" id="experiencias" aria-label={isSpanish ? 'Categorías' : 'Categories'}>
      {categories.map((category) => (
        <Link className="showcase-card" to={category.to || '/experiences'} key={category.en}>
          <img src={category.image} alt="" />
          <span className="showcase-card__shade" />
          <span className="showcase-card__label">
            <strong>{isSpanish ? category.es : category.en}</strong>
            <small>{isSpanish ? category.subEs : category.subEn}</small>
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </Link>
      ))}
    </section>
  );
};

export const BenefitsStrip = () => {
  const { language } = useLanguage();
  const isSpanish = language === 'es';

  return (
    <section className="benefits-strip">
      {benefits.map((benefit) => (
        <div className="benefit-item" key={benefit.en}>
          <img src={benefit.svg || benefit.image} alt="" />
          <span>{isSpanish ? benefit.es : benefit.en}</span>
        </div>
      ))}
    </section>
  );
};

export const CallToActionSection = () => {
  const { language, t } = useLanguage();
  const isSpanish = language === 'es';

  return (
    <section
      className="cta-section"
      id="contacto"
      style={{ backgroundImage: "url('/assets/12_cta_background.png')" }}
    >
      <div className="cta-section__content">
        <p>{isSpanish ? '¿Listo para vivir la experiencia?' : 'Ready to live the experience?'}</p>
        <Link to="/experiences" className="isla-button isla-button--gold">
          <MessageCircle size={16} aria-hidden="true" />
          {t('nav.reservar')}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="cta-section__details">
        <span><Instagram size={15} /> @islabrava</span>
        <span><Phone size={15} /> +52 998 123 4567</span>
        <span><MapPin size={15} /> Cancun, Quintana Roo</span>
      </div>
    </section>
  );
};
