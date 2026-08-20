import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { BlogProvider } from './context/BlogContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
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
import { NotFoundPage } from './pages/NotFoundPage';
import { initAnalytics } from './lib/analytics';

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
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
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-purple-500/30 selection:text-white">
              <Navbar />
              <main className="flex-1">
                <Routes>
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
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BlogProvider>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
