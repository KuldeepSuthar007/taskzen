import React from 'react'
import style from './Header.module.css';
import keep from '../../asset/keeps.png';
import searchicon from '../../asset/search.png';
import { useNavigate } from "react-router-dom";

function Header({ searchQuery, setSearchQuery, login, setlogin, fetchtasks }) {

    const navigate = useNavigate();
    function handlelogout() {
        localStorage.clear();
        setlogin(false);
    }

    // optimise searchhandler

    function Debounce(call, delay) {
        let timer;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                call();
            }, delay)
        }
    }
    const optimisesearch = Debounce(fetchtasks, 2000);

    function handlesearch(e) {
        setSearchQuery(e.target.value);
        optimisesearch();
    }

    return (
        <>
            <header>
                <div className={style.top}>
                    <div className={style.topleft}>
                        <div className={style.logobox}>
                            <div>
                                <img src={keep} alt="" />
                                <span>TaskZen</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.searchbox}>
                        <button><img src={searchicon} alt="" /></button>
                        <input type="text" placeholder='Search' value={searchQuery}
                            onChange={(e) => handlesearch(e)} />
                    </div>
                    <div className={style.bottom}>
                        {!login && (
                            <>
                                <button
                                    className={style.h_btn}
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>
                                |{" "}
                                <button
                                    className={style.h_btn}
                                    onClick={() => navigate("/signup")}
                                >
                                    Signup
                                </button>
                            </>
                        )}
                        {login && (
                            <button className={style.h_btn} onClick={handlelogout}>
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </header>
            <hr />
        </>
    )
}

export default Header