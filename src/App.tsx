import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { TechnicalEventsPage } from './pages/TechnicalEventsPage';
import { NonTechnicalEventsPage } from './pages/NonTechnicalEventsPage';
import { RegistrationPage } from './pages/RegistrationPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#0F172A',
              color: '#fff',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#6366F1',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/technical" element={<TechnicalEventsPage />} />
            <Route path="/non-technical" element={<NonTechnicalEventsPage />} />
            <Route path="/register" element={<RegistrationPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;