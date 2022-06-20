import { NavLink } from "react-router-dom";


export function AppHeader() {

    return (
        <section className="app-header">
            <div className="logo">
                <img src={require("../assets/imgs/logo.png")} alt="" />
            </div>
            <div className="nav-bar">
                <NavLink className="link" to='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" width="24"><path d="M4 21V9L12 3L20 9V21H14V14H10V21Z" /></svg>
                    Home
                </NavLink>
                <NavLink className="link" to='/data'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" width="24"><path d="M4 21Q3.175 21 2.588 20.413Q2 19.825 2 19V8Q2 7.175 2.588 6.588Q3.175 6 4 6H8V4Q8 3.175 8.588 2.587Q9.175 2 10 2H14Q14.825 2 15.413 2.587Q16 3.175 16 4V6H20Q20.825 6 21.413 6.588Q22 7.175 22 8V19Q22 19.825 21.413 20.413Q20.825 21 20 21ZM10 6H14V4Q14 4 14 4Q14 4 14 4H10Q10 4 10 4Q10 4 10 4Z" /></svg>
                    Portfolio
                </NavLink>
                <NavLink className="link" to='/stats'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" width="24"><path d="M3 11V3H11V11ZM3 21V13H11V21ZM13 11V3H21V11ZM13 21V13H21V21Z" /></svg>
                    Stats
                </NavLink>
            </div>
            <div className="login">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" width="24"><path d="M12 21V19H19Q19 19 19 19Q19 19 19 19V5Q19 5 19 5Q19 5 19 5H12V3H19Q19.825 3 20.413 3.587Q21 4.175 21 5V19Q21 19.825 20.413 20.413Q19.825 21 19 21ZM10 17 8.625 15.55 11.175 13H3V11H11.175L8.625 8.45L10 7L15 12Z" /></svg>
                Login
            </div>
            <div className="user">
                <div className="notifications">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="40" width="40"><path d="M4.625 32.708V28.25H8.5V17.167Q8.5 13.333 10.75 10.167Q13 7 16.792 6.042V5.083Q16.792 3.75 17.729 2.854Q18.667 1.958 20 1.958Q21.333 1.958 22.271 2.854Q23.208 3.75 23.208 5.083V6.042Q27.042 6.958 29.312 10.125Q31.583 13.292 31.583 17.167V28.25H35.417V32.708ZM20.042 37.875Q18.5 37.875 17.375 36.771Q16.25 35.667 16.25 34.125H23.792Q23.792 35.708 22.688 36.792Q21.583 37.875 20.042 37.875Z"/></svg>
                </div>
                <div className="user-logo">
                    <p>GU</p>
                </div>
            </div>
        </section>
    )
}