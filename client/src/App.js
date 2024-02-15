
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/booklist';
import BookDetails from './components/details';
import SignInForm from './components/register';
import Login from './components/login';
import UpdateProfile from './components/profileUpdate';
import './App.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { get_auth_user } from './redux/actions';
import UserProfile2 from './components/Profile2';

function App() {
  const dispatch = useDispatch()
  dispatch(get_auth_user())

    return (
      <Router>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/getBook/:id" element={<BookDetails />} />
          <Route path="/users/register" element={<SignInForm />} />
          <Route path="/users/login" element={<Login/>} />
          <Route path="/users/updateUser" element={<UpdateProfile/>} />
          <Route path="/users/profile" element={<UserProfile2 />} />
        </Routes>
      </Router>
    );
}

export default App;

