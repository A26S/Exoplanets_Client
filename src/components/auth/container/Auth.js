import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Register from '../presentational/Register'
import SignIn from '../presentational/SignIn'
import Loading from '../../utils/Loading'
import { connect } from 'react-redux'
import fetchUser from '../../../store/actions/authActions'


const Auth = (props) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const signUp = async (e) => {
        e.preventDefault()

        setLoading(true)
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                nickname: e.target.nickname.value,
                username: e.target.username.value,
                password: e.target.password.value
            })
        }

        const response = await fetch('http://localhost:5000/auth/signup', config)
        const data = await response.json()
        // console.log(response)
        // console.log(data)
        if (response.ok) {
            console.log(data)
            setError('')
            setLoading(false)
        } else {
            setError(data.message)
            setLoading(false)
        }
    }

    const login = async (e) => {
        e.preventDefault()
        
        setLoading(true)

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value
            })
        }
        const response = await fetch('http://localhost:5000/auth/login', config)
        const data = await response.json()
        if (response.ok) {
            props.setUser(data.user)
            localStorage.setItem('token', data.token)
            setError('')
            setLoading(false)
            props.history.push('/')
        } else {
            setError(data.message)
            setLoading(false)
        }
    }
    
    // console.log(props.auth)
    // const OAuth = async e => {
    //     e.preventDefault()
        
    //     const response = await fetch('/auth/google')
    //     console.log(response)
        // console.log('response')
    // }
    
    return (
        <section className="auth">
            <div className="error-or-loading">
            {loading ?
            <div className="loading-icon">
                <span/>
            </div>
            : error }
            </div>
            <Register signUp={signUp}/>
            <SignIn login={login}/>
            <div className="o-auth">
                <h4>don't feel like signing up? well... </h4>
                <a href="http://localhost:5000/auth/google" className="google-signin"
                // onClick={OAuth}
                />
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    setUser: data => dispatch({type: "SET_USER", data})
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
