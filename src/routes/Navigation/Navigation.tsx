import { Fragment } from "react"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import "./Navigation.styles.scss"

export const Navigation: React.FC = () => {
    const location = useLocation();
    
    return (
        <Fragment>
        <div className="c-navigation">
            <span>
            <Logo aria-hidden="true" />
            </span>
            {location.pathname !== '/' && (
            <span className="c-navigation__btn">
                <NavLink to="/" className="c-navigation__back" role="link" aria-label="Back to list">
                <Arrow aria-hidden="true" />
                <span className="sr-only">Back to list</span>
                </NavLink>
            </span>
            )}
        </div>
        <Outlet />
      </Fragment>
    )
}
