import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

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
        </Routes>
      </div>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
