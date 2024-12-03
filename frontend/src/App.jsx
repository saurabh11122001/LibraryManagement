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
import Loader from './components/shared/Loader';
import { useSelector } from 'react-redux';
import AdminProtected from './hooks/AdminProtected';
import BookIssue from './components/Admin/BookIssue';
import Maintain from './components/Admin/Maintain';
import SearchResult from './components/SearchResult';
import BookDetails from './components/BookDetails';
import ManageBooks from './components/Admin/ManageBooks';


function App() {
  const { loading } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        {/* {loading ?<Loader/>:""} */}
        <Routes>
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/category/:name" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>}/>
          <Route path="/purchased" element={<ProtectedRoute><PurchasedPage /></ProtectedRoute>}/>
          <Route path="/dashboard" element={<AdminProtected><BooksPage /></AdminProtected>}/>
          <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
          <Route path="/" element={<Login />} />
          <Route path="/issue" element={<AdminProtected><BookIssue /></AdminProtected>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/maintain" element={<AdminProtected><Maintain /></AdminProtected>} />
          <Route path="/managebook" element={<AdminProtected><ManageBooks /></AdminProtected>} />
          <Route path="/search" element={<ProtectedRoute><SearchResult /></ProtectedRoute>} />
          <Route path="/details/:id" element={<ProtectedRoute><BookDetails/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
