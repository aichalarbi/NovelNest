import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateProfile = () => {
    const { id } = useParams();
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [favoriteGenre, setFavoriteGenre] = useState('');
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/users/getUser/${id}`);
                const { user } = response.data;
                setUser(user);
                setUserName(user.userName);
                setUserAge(user.userAge);
                setUserEmail(user.userEmail);
                setFavoriteGenre(user.favoriteGenre);
                setFavoriteBooks(user.favoriteBooks);
                setImage(user.image);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
    }, [id]);

    const fullImagePath = `${process.env.REACT_APP_BACKEND_URL}/users/images/${id}`;

    const updateUserInfo = async () => {
        try {
            const response = await axios.put(`/users/updateUser/${id}`, {
                userName,
                userAge,
                userEmail,
                favoriteGenre,
                image
            });
            const { user } = response.data;
            console.log("User Info Updated:", user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>User Profile</h2>
            <form id="updateProfileForm">
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="userName" placeholder="Your Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="userAge" className="form-label">Age</label>
                    <input type="number" className="form-control" id="userAge" placeholder="Your Age" value={userAge} onChange={(e) => setUserAge(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="userEmail" placeholder="Your Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="favoriteGenre" className="form-label">Favorite Genre of Books</label>
                    <select className="form-select" id="favoriteGenre" value={favoriteGenre} onChange={(e) => setFavoriteGenre(e.target.value)}>
                        <option value="">Choose...</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Science Fiction">Science Fiction</option>
                    </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={updateUserInfo}>Update Info</button>
            </form>

            <h3 className="mt-5">Favorite Books</h3>
            <ul id="favoriteBooksList" className="list-group">
                {favoriteBooks.map((book, index) => (
                    <li key={index} className="list-group-item">{book}</li>
                ))}
            </ul>

            {!loading && (
                <div className="mt-5">
                    <h3>Profile Image</h3>
                    {user && user.image ? (
                        <img src={fullImagePath} alt="User Profile" />
                    ) : (
                        <div>No profile image available</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UpdateProfile;
