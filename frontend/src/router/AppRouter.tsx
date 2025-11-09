import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { History } from '../pages/History';
import { Community } from '../pages/Community';
import { About } from '../pages/About';
import { Privacy } from '../pages/Privacy';
import { Terms } from '../pages/Terms';
import { Contact } from '../pages/Contact';
import { NotFound } from '../pages/NotFound';
import { ROUTES } from '../utils/constants';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route
              path={ROUTES.HISTORY}
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.COMMUNITY}
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              }
            />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.PRIVACY} element={<Privacy />} />
            <Route path={ROUTES.TERMS} element={<Terms />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
