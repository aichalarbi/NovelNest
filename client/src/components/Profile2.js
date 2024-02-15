import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchUserImage, get_auth_user } from '../redux/actions';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user); 
    
    useEffect(() => {
        if (user && user._id) {
            dispatch(fetchUserImage(user._id));
        }
    }, [dispatch, user]);

    dispatch(get_auth_user());

    return (
        <section style={{ backgroundColor: '#f4f5f7', minHeight: '100vh' }}>
            <div className="container py-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="text-center mb-4">
                                    {user && user.image ? (
                                        <img src={user.image} alt="Avatar" className="img-fluid rounded-circle mb-3" style={{ width: '120px' }} />
                                    ) : (
                                        <div className="bg-secondary rounded-circle mb-3" style={{ width: '120px', height: '120px' }}></div>
                                    )}
                                    <h2 className="fw-bold">{user && user.fullName}</h2>
                                    <p className="text-muted">{user && user.age}</p>
                                    <button className="btn btn-outline-dark btn-sm"><i className="far fa-edit me-2"></i>Edit Profile</button>
                                </div>
                                <hr />
                                <div className="mb-3">
                                    <h5 className="text-uppercase mb-2">Favorite Genre</h5>
                                    <p>{user && user.favoriteGenre}</p>
                                </div>
                                <div className="mb-3">
                                    <h5 className="text-uppercase mb-2">Email</h5>
                                    <p>{user && user.email}</p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <a href="#!" className="text-dark me-3"><i className="fab fa-facebook-f fa-lg"></i></a>
                                    <a href="#!" className="text-dark me-3"><i className="fab fa-twitter fa-lg"></i></a>
                                    <a href="#!" className="text-dark"><i className="fab fa-instagram fa-lg"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
