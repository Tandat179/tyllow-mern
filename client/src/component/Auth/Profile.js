import React, { Fragment, useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth/AuthContext";
import LoadingModal from "../Loading/loading";

import "./Profile.css";

function Profile() {
  //UseContext
  const {
    authState: { isAuthenticated, user },
    loadUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await loadUser();
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingModal show={loading} />
      ) : isAuthenticated ? (
        <>

          <div className="profileContainer">
           
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/updateProfile">Edit Profile</Link>
            </div>
            <div>

              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>

              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>

              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
              
            </div>
          </div>
        </>
      ) : (
        <>{navigate("/login", { replace: true })}</>
      )}
    </>
  );
}

export default Profile;
