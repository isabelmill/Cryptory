import { NavLink } from "react-router-dom";

export function AppHeader() {

    return (
        <section className="app-header">
            <div className="logo">
                Cryptory
            </div>
            <div className="nav-bar">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/data'>Data</NavLink>
                <NavLink to='/stats'>Stats</NavLink>
            </div>
        </section>
    )
}