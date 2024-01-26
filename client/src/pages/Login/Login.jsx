import React, { useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { Login } from "../../apis/auth";

function LoginComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handlelogin = (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      setError(true);
    } else {
      const { email, password } = user;
      Login(email, password);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.greeting}>
        {" "}
        <p>Welcome</p>
      </div>
      <div className={style.formcontainer}>
        <p className={style.h2}>
          Sign in <span>. Already a customer?</span>
        </p>

        <form action="" onSubmit={handlelogin}>
          <label>Enter your email</label>
          <input
            type="email"
            value={user.email}
            onInput={(e) => setUser({ ...user, email: e.target.value })}
          />
          {error && <p className={style.errortext}>Field is required</p>}
          <label>Password</label>
          <input
            type="password"
            value={user.password}
            onInput={(e) => setUser({ ...user, password: e.target.value })}
          />
          {error && <p className={style.errortext}>Field is required</p>}
          <div style={{ display: "contents" }}>
            <button type="submit" className={style.continue_btn}>
              Continue
            </button>
          </div>
        </form>
        <p className={style.term}>
          By continuing, you agree to Task privacy notice and conditions of use.
        </p>
      </div>
      <p className={style.h6}>New to Task?</p>

      <button className={style.create_btn} onClick={() => navigate("/signup")}>
        Create your account
      </button>
      <div className={style.fotlog}></div>
    </div>
  );
}

export default LoginComponent;
