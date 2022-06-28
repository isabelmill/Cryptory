import { useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { login } from '../store/actions/userActions'
import { useNavigate } from "react-router-dom";

export function Login() {

    const [user, handleChange, setUser] = useForm(null)

    useEffect(() => {
        makeUser()
        // eslint-disable-next-line
    }, [])

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const makeUser = () => {
        const newUser = {
            email: '',
            password: ''
        }
        setUser(newUser);
    }

    const loginUser = async (ev) => {
        ev.preventDefault()
        dispatch(login(user))
        makeUser()
        navigate("/");
    }

    if (!user) return <div>Loading...</div>
    return (
        <section className="login">
            <form onSubmit={loginUser} >
                <h1>LOGIN PAGE</h1>
                <p>Email</p>
                <input name="email" id="email" onChange={handleChange} type="text" value={user.email} />
                <p>Password</p>
                <input onChange={handleChange} value={user.password} type="password" name="password" id="password" />
                <button>Login</button>
            </form>
            <p>Dont have account?
                <NavLink className="link" to='/signup'>
                    Signup
                </NavLink>
            </p>
        </section>
    )
}