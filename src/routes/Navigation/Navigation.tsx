import { Fragment } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import "./Navigation.styles.scss"

export const Navigation: React.FC = () => {
    return (
        <Fragment>
        <div className="c-navigation">
            <span>
            <Logo />
            </span>
            <span >
                <NavLink to="/" className="c-navigation__back"><Arrow /><span>Back to list</span></NavLink>
            </span>
        </div>
        <Outlet />
      </Fragment>
    )
}