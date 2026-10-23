import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { WhatsAppIcon, getWhatsAppUrl } from './WhatsApp';

const LOGO_URL = "/assets/01_logo_header.png";

// Landing sections watched for the active-link underline, in page order.
// The category showcase (#experiencias) highlights the Experiences link.
const SECTION_LINKS = [
  { id: 'inicio', href: '#inicio' },
  { id: 'servicios', href: '#servicios' },
  { id: 'nosotros', href: '#nosotros' },
  { id: 'experiencias', href: '/experiences' },
  { id: 'contacto', href: '#contacto' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio');
  const { toggleLanguage, language, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isYachtPage = location.pathname === '/yachts';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (location.pathname !== '/') return;
      const offset = 140;
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      let current = SECTION_LINKS[0].href;
      SECTION_LINKS.forEach(({ id, href }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = href;
      });
      setActiveSection(atBottom ? '#contacto' : current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Coming from another page via "/#section": scroll there once the landing renders.
  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [location.pathname, location.hash]);

  const navLinks = isYachtPage
    ? [
      { href: '/', label: language === 'es' ? 'Inicio' : 'Home' },
      { href: '/yachts', label: language === 'es' ? 'Yates' : 'Yachts' },
      { href: '/fleet', label: 'Jet Ski' },
      { href: '/experiences', label: language === 'es' ? 'Pesca' : 'Fishing' },
      { href: '/experiences', label: language === 'es' ? 'Experiencias' : 'Experiences' },
      { href: '/#contacto', label: language === 'es' ? 'Contacto' : 'Contact' },
    ]
    : [
      { href: '#inicio', label: t('nav.inicio') },
      { href: '#nosotros', label: t('nav.nosotros') },
      { href: '#servicios', label: t('nav.servicios') },
      { href: '/fleet', label: t('nav.flota') },
      { href: '/experiences', label: t('nav.experiencias') },
      { href: '#contacto', label: t('nav.contacto') },
    ];

  const whatsappUrl = getWhatsAppUrl(language);

  const isActive = (href) => isYachtPage
    ? href === '/yachts'
    : location.pathname === '/'
      ? activeSection === href
      : location.pathname.startsWith(href);

  const scrollToSection = (href) => {
    if (href.startsWith('/') || (href.startsWith('#') && location.pathname !== '/')) {
      navigate(href.startsWith('/') ? href : `/${href}`);
      setIsMobileMenuOpen(false);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      data-testid="navbar"
      className={`site-navbar ${isYachtPage ? 'site-navbar--yacht' : ''} ${isScrolled ? 'site-navbar--scrolled' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="logo">
            <img 
              src={LOGO_URL} 
              alt="Isla Brava Yachts & Jet Skis"
              className="site-navbar__logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 site-navbar__nav-links">
            {navLinks.map((link) => (
              <button
                key={`${link.href}-${link.label}`}
                onClick={() => scrollToSection(link.href)}
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`site-navbar__link ${isActive(link.href) ? 'site-navbar__link--active' : ''}`}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-4 site-navbar__actions">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              data-testid="language-toggle"
              className="site-navbar__language"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language.toUpperCase()}</span>
            </button>

            {/* CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-reservar"
              className="isla-button isla-button--gold site-navbar__cta"
            >
              <WhatsAppIcon className="site-navbar__cta-icon" />
              {t('nav.reservar')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            className="site-navbar__mobile-toggle lg:hidden"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 bg-white rounded-2xl shadow-xl p-4 animate-fade-in-up">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={`${link.href}-${link.label}`}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-[#0F2C59] font-medium py-2 px-4 rounded-lg hover:bg-gray-100 text-left border-l-2 ${isActive(link.href) ? 'border-[#B8945F]' : 'border-transparent'}`}
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t pt-3 mt-2">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 text-[#0F2C59] py-2 px-4 rounded-lg hover:bg-gray-100 w-full"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === 'es' ? 'English' : 'Español'}</span>
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="isla-button isla-button--gold site-navbar__cta w-full mt-3"
                >
                  <WhatsAppIcon className="site-navbar__cta-icon" />
                  {t('nav.reservar')}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
