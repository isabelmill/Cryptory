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
        if (!user.email || !user.password) return
        dispatch(login(user))
        navigate("/");
    }

    if (!user) return <div>Loading...</div>
    return (
        <section className="login-form">
            <div className="form">
                <form onSubmit={loginUser} >
                    <h1>Log In</h1>
                    <p>Email</p>
                    <input required name="email" id="email" onChange={handleChange} type="text" value={user.email} />
                    <p>Password</p>
                    <input required onChange={handleChange} value={user.password} type="password" name="password" id="password" />
                    <button className='login-btn'>Login</button>
                </form>
                <div className="signup">
                    <p>Don`t have an account?
                    </p>
                        <NavLink className="link" to='/signup'>
                            Signup here
                        </NavLink>
                </div>
            </div>
        </section>
    )
}