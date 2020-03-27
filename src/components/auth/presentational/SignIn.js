import React from 'react'

const SignIn = ({login}) => {

    return (
        <div className="sign-in">
            <h3>already have an account?</h3>
            <form onSubmit={login} >
                <input type="text" name="username" className="signin-input" required/>
                <label className="signin-label">username</label>

                <input type="password" name="password" className="signin-input" required/>
                <label className="signin-label">password</label>

                <input type="submit" value="sign in"/>
            </form>
            
        </div>
    )
}

export default SignIn
