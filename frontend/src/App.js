import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Filter from './pages/Filter'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Map from './pages/Map'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="pages">
        <Routes>
          <Route 
            path="/"
            element={<Home />}
          />
          <Route 
            path="/filter"
            element={<Filter />}
          />
          <Route 
            path="/contact"
            element={<Contact />}
          />
          <Route 
            path="/admin-page"
            element={<Admin />}
          />
          <Route 
            path="/map"
            element={<Map />}
          />
        </Routes>
      </div>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
