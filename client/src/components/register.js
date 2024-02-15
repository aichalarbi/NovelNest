
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions"; 
import { useNavigate } from "react-router-dom";
import logo from '../novelnew.webp'; 
import axios from "axios"; 
import './register.css'; 

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [image, setImage] = useState(""); 
  const [uploading, setUploading] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      fullName,
      password,
      age,
      favoriteGenre,
      image: image || null, 
    };

    try {
      dispatch(register(newUser));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignInClick = () => {
    navigate("/users/login");
  };

  const uploadProfileImage = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);

    try {
      const response = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage(response.data); 
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Welcome To NovelNest</h1>
        {image ? (
          <img
            src={image}
            width="100%"
            style={{ margin: "8px 0" }}
            height="150px"
            alt="Uploaded"
          />
        ) : (
          <div style={{ margin: "8px 0" }}>
            {!uploading ? "Upload Image For Profile" : "Loading ..."}
          </div>
        )}
        <div>
          Select File
          <input
            accept="image/*"
            type="file"
            onChange={uploadProfileImage}
          />
        </div>

        <input
          type="text"
          id="fullName"
          className="form-control"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label className="form-label" htmlFor="fullName">Full Name</label>

        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="form-label" htmlFor="email">Email Address</label>

        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="form-label" htmlFor="password">Password</label>

        <input
          type="number" 
          id="age"
          className="form-control"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label className="form-label" htmlFor="age">Age</label>

        <input
          type="text"
          id="favoriteGenre"
          className="form-control"
          placeholder="Favorite Genre"
          value={favoriteGenre}
          onChange={(e) => setFavoriteGenre(e.target.value)}
        />
        <label className="form-label" htmlFor="favoriteGenre">Favorite Genre</label>
       
        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
      <button onClick={handleSignInClick} className="btn-primary btn-sm mt-3">
        Already a member? Sign in
      </button>
      <img src={logo} width="120" height="80" className="d-inline-block align-top" alt="Logo" />
    </>
  );
};

export default SignInForm;


// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { register } from "../redux/actions"; 
// import { useNavigate } from "react-router-dom";
// import logo from '../novelnew.webp'; 
// import './register.css'; 

// const SignInForm = () => {
 
//   const [email, setEmail] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [password, setPassword] = useState("");
//   const [age, setAge] = useState("");
//   const [favoriteGenre, setFavoriteGenre] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newUser = {
//       email,
//       fullName,
//       password,
//       age,
//       favoriteGenre,
//     };
//     dispatch(register(newUser)); 
//     navigate("/"); 
//   };

//   const handleSignInClick = () => {
//     navigate("/users/login");
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="register-form">
//         <h1>Welcome To NovelNest</h1>
//         <div className="form-outline mb-4">
//           <input
//             type="text"
//             id="fullName"
//             className="form-control"
//             placeholder="Full Name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//           />
//           <label className="form-label" htmlFor="fullName">Full Name</label>
//         </div>
//         <div className="form-outline mb-4">
//           <input
//             type="email"
//             id="email"
//             className="form-control"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <label className="form-label" htmlFor="email">Email Address</label>
//         </div>
//         <div className="form-outline mb-4">
//           <input
//             type="password"
//             id="password"
//             className="form-control"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <label className="form-label" htmlFor="password">Password</label>
//         </div>
//         <div className="form-outline mb-4">
//           <input
//             type="number" 
//             id="age"
//             className="form-control"
//             placeholder="Age"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//           />
//           <label className="form-label" htmlFor="age">Age</label>
//         </div>
//         <div className="form-outline mb-4">
//           <input
//             type="text"
//             id="favoriteGenre"
//             className="form-control"
//             placeholder="Favorite Genre"
//             value={favoriteGenre}
//             onChange={(e) => setFavoriteGenre(e.target.value)}
//           />
//           <label className="form-label" htmlFor="favoriteGenre">Favorite Genre</label>
//         </div>
       
//         <button type="submit" className="btn-primary">
//           Register
//         </button>
//       </form>
//       <button onClick={handleSignInClick} className="btn-primary btn-sm mt-3">
//         Already a member? Sign in
//       </button>
//       <img src={logo} width="120" height="80" className="d-inline-block align-top" alt="Logo" />
      
//     </>
//   );
// };

// export default SignInForm;
