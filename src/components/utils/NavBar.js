import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const NavBar = ({isAuthenticated, logout}) => {

    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        const menu = document.querySelector('.menu')
        const text = document.querySelector('.text')
        const icon = document.querySelector('.icon')
        menu.addEventListener('mouseenter', () => {
            text.classList.add('show')
        })
        menu.addEventListener('mouseleave', () => {
            text.classList.remove('show')
        })
        menu.addEventListener('click', () => {
            icon.classList.toggle('transform')
        })
    }, [])

    const signout = () => {
        localStorage.removeItem('token')
        logout()
    }

    return (
        <div className="navbar">
            <div className="menu" 
            onClick={() => setIsClicked(!isClicked)}>
                <p className="text">menu</p>
                <div className="icon"/>
            </div>
            {isClicked &&
            <ul>
                <li><NavLink exact to="/" activeClassName="current">
                    home
                </NavLink></li>
                <li><NavLink exact to="/explore" activeClassName="current">
                    explore
                </NavLink></li>
                <li><NavLink exact to="/take-the-test" activeClassName="current">
                    take the test
                </NavLink></li>
                {isAuthenticated ? 
                <li><NavLink exact to="/" activeClassName="current" onClick={signout}>
                    sign out
                </NavLink></li>
                :
                <li><NavLink exact to="/auth" activeClassName="current">
                    log in
                </NavLink></li>
                }
            </ul>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({type: "LOGOUT"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)