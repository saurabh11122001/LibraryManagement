import { Routes, Route, BrowserRouter } from 'react-router-dom'; // Use BrowserRouter instead of Router
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Navbar from './components/shared/Navbar'; // Import the Navbar
import CategoryPage from './components/Category/CategoryPage';
import PurchasedPage from './components/PurchasedPage';
import Books from './components/Books';
import BooksPage from './components/Admin/BooksPage';
import ProtectedRoute from './hooks/ProtectedRoute';



function App() {
  return (
    <div>
      <BrowserRouter> 
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/category" element={<CategoryPage />}/>
          <Route path="/purchased" element={<PurchasedPage />}/>
          <Route path="/dashboard" element={<ProtectedRoute><BooksPage /></ProtectedRoute>}/>
          <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
