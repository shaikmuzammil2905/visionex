import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { BlogProvider } from './context/BlogContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AnnouncementBanner } from './components/layout/AnnouncementBanner';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WhyPage } from './pages/WhyPage';
import { MissionPage } from './pages/MissionPage';
import { DigitalEntrepreneurshipPage } from './pages/DigitalEntrepreneurshipPage';
import { CommunityPage } from './pages/CommunityPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { FounderPage } from './pages/FounderPage';
import { ContactPage } from './pages/ContactPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { initAnalytics } from './lib/analytics';

// Helper to scroll to top on route change & initialize scroll reveal observer
function ScrollHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

function MainLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-purple-500/30 selection:text-white font-sans">
      {!isAdminRoute && <AnnouncementBanner />}
      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/why" element={<WhyPage />} />
          <Route path="/philosophy" element={<WhyPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/digital-entrepreneurship" element={<DigitalEntrepreneurshipPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:slug" element={<BlogDetailPage />} />
          <Route path="/founder" element={<FounderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Admin CMS Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/:tab" element={<AdminPage />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <BlogProvider>
            <ScrollHandler />
            <MainLayout />
          </BlogProvider>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
