import React, { useState } from "react";
import style from "./Signup.module.css";
import { useNavigate } from "react-router-dom";

import { Signup } from "../../apis/auth";

function SignupComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handlesignup = async (e) => {
    e.preventDefault();
    if (
      user.name === "" ||
      user.mobile === "" ||
      user.email === "" ||
      user.password === ""
    ) {
      setError(true);
    } else {
      const { name, mobile, email, password } = user;
      Signup(name, mobile, email, password);
      navigate("/login");
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
          Create Account <span>.Don’t have an account?</span>{" "}
        </p>
        <form action="" onSubmit={handlesignup}>
          <label>Your name</label>
          <input
            type="name"
            value={user.name}
            required
            onInput={(e) => setUser({ ...user, name: e.target.value })}
          />
          {error && <p className={style.errortext}>Field is required</p>}
          <label>Mobile number</label>
          <input
            type="number"
            value={user.mobile}
            maxLength={10}
            minLength={10}
            required
            onInput={(e) => setUser({ ...user, mobile: e.target.value })}
          />
          {error && <p className={style.errortext}>Field is required</p>}
          <label>Email Id</label>
          <input
            type="email"
            value={user.email}
            required
            onInput={(e) => setUser({ ...user, email: e.target.value })}
          />
          {error && <p className={style.errortext}>Field is required</p>}
          <label>Password</label>
          <input
            type="password"
            value={user.password}
            required
            onInput={(e) => setUser({ ...user, password: e.target.value })}
          />
          {error && <p className={style.errortext}>Field is required</p>}
          <p className={style.h4}>
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from Task. Message
            and data rates may apply.
          </p>
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
      <p className={style.h5}>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Sign in</span>
      </p>

      <div className={style.fotlog}></div>
    </div>
  );
}

export default SignupComponent;
