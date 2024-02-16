import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/booklist';
import BookDetails from './components/details';
import SignInForm from './components/register';
import Login from './components/login';
import UpdateProfile from './components/profileUpdate';
import UserProfile from './components/Profile';
import './App.css'; 
import { useDispatch } from 'react-redux';
import { get_auth_user } from './redux/actions';
import Favorite from './components/favorite';
import { useEffect } from 'react';
import EditBookForm from './components/edit';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_auth_user());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/getBook/:id" element={<BookDetails />} />
        <Route path="/users/register" element={<SignInForm />} />
        <Route path="/users/login" element={<Login/>} />
        <Route path="/users/updateUser/:id" element={<UpdateProfile/>} />
        <Route path="/users/profile" element={<UserProfile/>} />
        <Route path="/book/favorites" element={<Favorite />} />
        <Route path="/book/updateBook/user._id" element={<EditBookForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
