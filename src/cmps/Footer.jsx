import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLoggedInUser, logout } from '../store/actions/userActions'
import { useNavigate } from "react-router-dom";


export function Footer() {
    // const location = useLocation();
    // const { loggedInUser } = useSelector(state => state.userModule)
    // const dispatch = useDispatch()
    // const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(loadLoggedInUser())
    //     // eslint-disable-next-line
    // }, [])

    // const logoutUser = () => {
    //     // const newUser = {
    //     //     email: 'Guest-user@gmail.com',
    //     //     password: '123'
    //     // }
    //     dispatch(logout())
    //     navigate("/data");
    // }

    // if (!loggedInUser) return <div>Loading...</div>
    // let navBtn;
    // if (loggedInUser.name === 'Guest-user') {
    //     navBtn = <NavLink className="login" to='/login'>Login</NavLink>
    // } else {
    //     navBtn = <button className="logout" onClick={logoutUser}>Logout</button>
    // }

    return (
        <section className="footer">
            
        </section>

    )
}