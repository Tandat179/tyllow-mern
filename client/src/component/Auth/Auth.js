import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import { AuthContext } from "../../context/auth/AuthContext";

import LoadingModel from "../Loading/loading";

import MailOutlineIcon from "../../assets/mail.svg";
import LockOpenIcon from "../../assets/password.svg";
import FaceIcon from "../../assets/person-circle.svg";
import ImageCard from "../../assets/card-image.svg";

import "./Auth.css";

const Auth = () => {

  const navigate = useNavigate();

  const {
    authState: { message, isAuthenticated },
    loginUser,
    registerUser,
    setMessage,
  } = useContext(AuthContext);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState(ImageCard);
  const [isLoading, setLoading] = useState(false);

  //Register
  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setFormRegister({ ...formRegister, avatar: reader.result });
        }
      };

      reader.readAsDataURL(e.target.files[0]);

      //Get catch value name from value.name from Form Register
    } else {
      setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    }
  };


  //Login
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, message]);

  const loadingShow = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Get and catch value name from Form Login
  const handleOnChangeLogin = (e) =>
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });

  const submitLoginHandle = async (e) => {
    e.preventDefault();
    loadingShow();
    await loginUser(formLogin);
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    loadingShow();
    await registerUser(formRegister);
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      setMessage();
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      setMessage();
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      <LoadingModel show={isLoading} />
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>

            {/* Click change tab */}
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>

          {/* Login Form */}
          <form
            className="loginForm"
            ref={loginTab}
            onSubmit={submitLoginHandle}
          >

            {/* Response message from server */}
            <p style={{ color: "red", textAlign: "center" }}>{message}</p>


            {/* Email */}
            <div className="loginEmail">
              <img src={MailOutlineIcon} alt="s" className="svgImg" />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={formLogin.email}
                onChange={handleOnChangeLogin}
              />
            </div>

            {/* Password */}
            <div className="loginPassword">
              <img src={LockOpenIcon} alt="s" className="svgImg" />
              <input
                type="password"
                placeholder="Password"
                value={formLogin.password}
                required
                name="password"
                onChange={handleOnChangeLogin}
              />
            </div>

            {/* Forget Password */}
            <Link to="/password/forgot">Forget Password ?</Link>

            {/* Button Submit */}
            <input type="submit" value="Login" className="loginBtn" />
          </form>



          {/* Form Register (SignUp) */}
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            {/* Message from Server */}
            <p style={{ color: "red", textAlign: "center" }}>{message}</p>
            <div className="signUpName">
              <img src={FaceIcon} alt="s" className="svgImg" />

              {/* Input Name */}
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                onChange={registerDataChange}
                value={formRegister.name}
              />
            </div>


            {/* Input Mail */}
            <div className="signUpEmail">
              <img src={MailOutlineIcon} alt="s" className="svgImg" />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                onChange={registerDataChange}
                value={formRegister.email}
              />
            </div>

            {/* Input Password */}
            <div className="signUpPassword">
              <img src={LockOpenIcon} alt="s" className="svgImg" />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                onChange={registerDataChange}
                value={formRegister.password}
              />
            </div>


            {/* Input Avatar */}
            <div id="registerImage">
              <img alt="Avatar Preview" src={avatarPreview} />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>

            {/* Submit */}
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
