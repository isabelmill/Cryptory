import { NavLink } from "react-router-dom";

export function AppHeader() {

    return (
        <header className="app-header">
            <section className="container">
                <h1>App header</h1>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/data'>Data</NavLink>
                <NavLink to='/stats'>Stats</NavLink>
            </section>
        </header>
    )
}