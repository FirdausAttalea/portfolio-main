import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Certifications from './pages/Certifications';
import DeliverableDetail from './pages/DeliverableDetail';
import CodingProjectDetail from './pages/CodingProjectDetail';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/coding/:id" element={<CodingProjectDetail />} />
              
              {/* Product Documentation Routes (Distinct route: /product/:id) */}
              <Route path="/product/:id" element={<DeliverableDetail />} />
              <Route path="/deliverables/:id" element={<DeliverableDetail />} />
              
              <Route path="/certifications" element={<Certifications />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
