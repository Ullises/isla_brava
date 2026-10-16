import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider } from "./context/LanguageContext";

// Components
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { Footer } from "./components/Footer";
import {
  AboutSection,
  BenefitsStrip,
  CallToActionSection,
  CategoryShowcase,
  CategoryStrip,
} from "./components/LandingShowcase";
import { BookingPage } from "./components/BookingPage";
import { PaymentSuccess, PaymentCancel } from "./components/PaymentPages";
import { AdminLogin, AdminDashboard } from "./components/AdminDashboard";
import { CatalogPage } from "./components/CatalogPage";
import { WhatsAppFloat } from "./components/WhatsApp";

// Landing Page
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CategoryStrip />
        <AboutSection />
        <CategoryShowcase />
        <BenefitsStrip />
        <CallToActionSection />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/experiences" element={<CatalogPage type="experiences" />} />
            <Route path="/fleet" element={<CatalogPage type="fleet" />} />
            
            {/* Booking Routes */}
            <Route path="/booking/:experienceId" element={
              <>
                <Navbar />
                <BookingPage />
              </>
            } />
            <Route path="/booking/fleet/:fleetId" element={
              <>
                <Navbar />
                <BookingPage />
              </>
            } />
            
            {/* Payment Routes */}
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
          <WhatsAppFloat />
        </BrowserRouter>
        <Toaster position="top-center" richColors />
      </div>
    </LanguageProvider>
  );
}

export default App;
