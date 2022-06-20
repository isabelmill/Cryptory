import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLoggedInUser } from '../store/actions/userActions'
// import { userService } from "../../srvices/userService"

export function Home() {

    useEffect(() => {
        dispatch(loadLoggedInUser())
        // eslint-disable-next-line
    }, [])
    
    const dispatch = useDispatch()

    const { loggedInUser } = useSelector(state => state.userModule)

    if (!loggedInUser) return <div>Loading...</div>
    return (
        <div>
            <h1>Hello {loggedInUser.name}</h1>
        </div>
    )
}