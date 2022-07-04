import { useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { signup } from '../store/actions/userActions'
import { userService } from '../srvices/userService';
import { useNavigate } from "react-router-dom";

export function Signup() {
    const [user, handleChange, setUser] = useForm(null)
    const navigate = useNavigate();

    useEffect(() => {
        makeUser()
        // eslint-disable-next-line
    }, [])

    const dispatch = useDispatch()

    const makeUser = () => {
        const newUser = userService.getEmptyUser()
        setUser(newUser);
    }

    const signupUser = async (ev) => {
        ev.preventDefault()
        dispatch(signup(user))
        makeUser()
        navigate("/stats");
    }

    if (!user) return <div>Loading...</div>
    return (
        <section className="signup-form">
            <div className="form">
                <form onSubmit={signupUser} >
                    <h1>Sign Up</h1>
                    <p>Your wallet number will be generated automaticaly</p>
                    <p>Name</p>
                    <input name="name" id="name" onChange={handleChange} type="text" value={user.name} required />
                    <p>Email</p>
                    <input name="email" id="email" onChange={handleChange} type="text" value={user.email} required />
                    <p>Password</p>
                    <input onChange={handleChange} value={user.password} type="password" name="password" id="password" />
                    <p>Balance</p>
                    <input name="coins" id="coins" onChange={handleChange} type="number" value={user.coins} required />
                    <p>Image - please write href link</p>
                    <input name="img" id="img" onChange={handleChange} type="text" value={user.img} required />
                    {user.img && <img src={user.img} alt="" />}
                    {!user.img && <div className='img'>IMG</div>}
                    <button className='signup-btn'>Signup</button>
                </form>
                <div className="login">
                    <p>Already have an account?</p>
                    <NavLink className="link" to='/login'>
                        Login
                    </NavLink>
                </div>
            </div>
        </section>
    )
}