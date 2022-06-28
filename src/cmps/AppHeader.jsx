import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLoggedInUser } from '../store/actions/userActions'

export function AppHeader() {
    const location = useLocation();
    const { loggedInUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadLoggedInUser())
        // eslint-disable-next-line
    }, [])

    if (!loggedInUser) return <div>Loading...</div>
    return (
        <div>
            {(() => {
                if (location.pathname !== '/login' && location.pathname !== '/signup') {
                    return <section className="app-header">
                        <div className="logo">
                            <img src={require("../assets/imgs/logo.JPG")} alt="" />
                            <h1>Cryptory</h1>
                        </div>
                        <div className="nav-bar">
                            <NavLink className="link" to='/'>
                                <svg xmlns="http://www.w3.org/2000/svg"  height="24" width="24"><path d="M4 21V9L12 3L20 9V21H14V14H10V21Z" /></svg>
                                Home
                            </NavLink>
                            <NavLink className="link" to='/data'>
                                <svg xmlns="http://www.w3.org/2000/svg"  height="24" width="24"><path d="M4 21Q3.175 21 2.588 20.413Q2 19.825 2 19V8Q2 7.175 2.588 6.588Q3.175 6 4 6H8V4Q8 3.175 8.588 2.587Q9.175 2 10 2H14Q14.825 2 15.413 2.587Q16 3.175 16 4V6H20Q20.825 6 21.413 6.588Q22 7.175 22 8V19Q22 19.825 21.413 20.413Q20.825 21 20 21ZM10 6H14V4Q14 4 14 4Q14 4 14 4H10Q10 4 10 4Q10 4 10 4Z" /></svg>
                                Portfolio
                            </NavLink>
                            <NavLink className="link" to='/stats'>
                                <svg xmlns="http://www.w3.org/2000/svg"  height="24" width="24"><path d="M2.725 18.45 -0.025 16.475 5.8 7.1 8.35 10.075 11.875 4.35 15.5 9.825Q14.625 9.925 13.812 10.262Q13 10.6 12.3 11.15L11.975 10.65L8.825 15.825L6.25 12.85ZM21.625 24.05 18.4 20.8Q17.9 21.025 17.363 21.15Q16.825 21.275 16.275 21.275Q14.2 21.275 12.738 19.812Q11.275 18.35 11.275 16.275Q11.275 14.2 12.738 12.725Q14.2 11.25 16.275 11.25Q18.35 11.25 19.812 12.725Q21.275 14.2 21.275 16.275Q21.275 16.825 21.138 17.375Q21 17.925 20.775 18.425L24.05 21.625ZM16.275 17.875Q16.925 17.875 17.4 17.4Q17.875 16.925 17.875 16.275Q17.875 15.6 17.4 15.125Q16.925 14.65 16.275 14.65Q15.6 14.65 15.125 15.125Q14.65 15.6 14.65 16.275Q14.65 16.925 15.125 17.4Q15.6 17.875 16.275 17.875ZM19.05 10.35Q18.175 9.975 17.275 9.85Q16.375 9.725 15.425 9.8L21.3 0.2L24.05 2.2Z" /></svg>
                                Charts
                            </NavLink>
                        </div>
                        <div className="user">
                            <NavLink className="login" to='/login'>
                                Login |
                            </NavLink>
                            <NavLink className="signup" to='/signup'>
                                Signup
                            </NavLink>
                            <div className="notifications">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3.65 19.175V16.9h2.075v-6.775q0-2.15 1.288-3.838Q8.3 4.6 10.35 4.075V3.4q0-.675.488-1.15.487-.475 1.162-.475.675 0 1.163.475.487.475.487 1.15v.675q2.075.525 3.35 2.2 1.275 1.675 1.275 3.85V16.9h2.075v2.275ZM12 11.5Zm0 10.7q-.85 0-1.462-.6-.613-.6-.613-1.45h4.15q0 .85-.612 1.45-.613.6-1.463.6Zm-4-5.3h8v-6.775q0-1.65-1.175-2.825Q13.65 6.125 12 6.125q-1.65 0-2.825 1.175Q8 8.475 8 10.125Z"/></svg>
                            </div>
                            <div className="user-logo">
                                <img src={loggedInUser.img} alt="" />
                            </div>
                        </div>
                    </section>
                } else {
                    return null
                }
            })()}
        </div>
    )
}