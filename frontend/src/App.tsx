import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Container } from 'react-bootstrap';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <main className="py-3">
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Container>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
