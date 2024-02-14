import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/booklist';
import BookDetails from './components/details';
import SignInForm from './components/register';
import Login from './components/login';
import UpdateProfile from './components/profileUpdate';
import UserProfile from './components/profile';
import './App.css'; 

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/getBook/:id" element={<BookDetails />} />
          <Route path="/users/register" element={<SignInForm />} />
          <Route path="/users/login" element={<Login/>} />
          <Route path="/users/updateUser" element={<UpdateProfile/>} />
        </Routes>
      </Router>
    );
}

export default App;

