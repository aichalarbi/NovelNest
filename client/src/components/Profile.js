import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { fetchUserImage, get_auth_user } from '../redux/actions';
import './profile.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user); 
    
    useEffect(() => {
        dispatch(get_auth_user());
    }, [dispatch]);

    useEffect(() => {
        if (user && user._id) {
            dispatch(fetchUserImage(user._id));
        }
    }, [dispatch, user]);

    return (
        <section className="user-profile">
            <div className="user-profile__container">
                <div className="user-profile__content">
                    <div className="user-profile__avatar">
                        {user && user.image ? (
                            <img src={user.image} alt="Avatar" className="user-profile__avatar-img" />
                        ) : (
                            <div className="user-profile__avatar-placeholder"></div>
                        )}
                    </div>
                    <div className="user-profile__details">
                        <h2 className="user-profile__name">{user && user.fullName}</h2>
                        <p className="user-profile__age">Age: {user && user.age}</p>
                        <p className="user-profile__favorite-genre">Favorite Genre: {user && user.favoriteGenre}</p>
                        <p className="user-profile__email">Email: {user && user.email}</p>
                        <div className="user-profile__social-links">
                            <a href="#!" className="user-profile__social-link"><i className="fab fa-facebook-f"></i></a>
                            <a href="#!" className="user-profile__social-link"><i className="fab fa-twitter"></i></a>
                            <a href="#!" className="user-profile__social-link"><i className="fab fa-instagram"></i></a>
                        </div>
                        <Link to={`/users/updateUser/${user && user._id}`} className="btn btn-edit-profile">Edit Profile</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
