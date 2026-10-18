import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, ChevronLeft, Clock, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import Footer from './Footer';
import { Navbar } from './Navbar';

const API = process.env.REACT_APP_BACKEND_URL;

const getImage = (item) => item.images?.[0] || item.image || '/assets/02_hero_scene.png';

export const CatalogPage = ({ type }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isFleet = type === 'fleet';

  useEffect(() => {
    let active = true;
    const loadItems = async () => {
      try {
        const response = await axios.get(`${API}/${isFleet ? 'fleet' : 'experiences'}`);
        if (active) setItems(response.data.data || []);
      } catch (requestError) {
        console.error('Error loading catalog:', requestError);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadItems();
    return () => { active = false; };
  }, [isFleet]);

  const text = isFleet
    ? (language === 'es' ? 'Nuestra flota' : 'Our fleet')
    : (language === 'es' ? 'Experiencias en el mar' : 'Experiences at sea');
  const subtitle = isFleet
    ? (language === 'es' ? 'Elige la embarcación ideal para tu día en el Caribe.' : 'Choose the perfect vessel for your day in the Caribbean.')
    : (language === 'es' ? 'Reserva tu próxima aventura con Isla Brava.' : 'Book your next adventure with Isla Brava.');

  return (
    <>
      <Navbar />
      <main className="catalog-page">
        <div className="catalog-page__header">
          <button type="button" className="catalog-page__back" onClick={() => navigate('/')}>
            <ChevronLeft size={16} /> {language === 'es' ? 'Volver al inicio' : 'Back home'}
          </button>
          <p className="eyebrow">Isla Brava</p>
          <h1>{text}</h1>
          <p>{subtitle}</p>
        </div>

        {loading && <p className="catalog-page__status">{language === 'es' ? 'Cargando opciones...' : 'Loading options...'}</p>}
        {error && <p className="catalog-page__status">{language === 'es' ? 'No pudimos cargar las opciones.' : 'We could not load the options.'}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="catalog-page__status">{language === 'es' ? 'No hay opciones disponibles por ahora.' : 'No options are available right now.'}</p>
        )}

        <div className="catalog-grid">
          {items.map((item) => {
            const title = isFleet ? item.name : (language === 'es' ? item.title_es : item.title_en);
            const description = language === 'es' ? item.description_es : item.description_en;
            const price = isFleet ? item.price_per_hour : item.price;
            const bookingPath = isFleet ? `/booking/fleet/${item.id}` : `/booking/${item.id}`;
            return (
              <article className="catalog-card" key={item.id}>
                <img src={getImage(item)} alt={title} className="catalog-card__image" />
                <div className="catalog-card__body">
                  <p className="catalog-card__type">{isFleet ? (language === 'es' ? 'Embarcación' : 'Vessel') : (item.category || (language === 'es' ? 'Experiencia' : 'Experience'))}</p>
                  <h2>{title}</h2>
                  <p className="catalog-card__description">{description}</p>
                  <div className="catalog-card__meta">
                    {isFleet ? <span><Users size={15} /> {item.capacity} {language === 'es' ? 'personas' : 'people'}</span> : <span><Clock size={15} /> {item.duration_minutes} min</span>}
                    <strong>${Number(price || 0).toLocaleString()} MXN{isFleet && <small> / hr</small>}</strong>
                  </div>
                  <Button asChild className="isla-button isla-button--green catalog-card__button">
                    <Link to={bookingPath}>
                      <Calendar size={15} />
                      {language === 'es' ? 'Reservar' : 'Book now'}
                      <ArrowRight size={15} />
                    </Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
