import React from 'react'

const Register = ({signUp}) => {

    const handleChange = (e) => {
        e.target.classList.add('activated')
    }

    return (
        <div className="register">
            <h3>create an account</h3>
            <form onSubmit={signUp}>
                <input type="text" name="nickname" className="register-input" required/>
                <label className="register-label">nickname</label>

                <input type="text" name="username" className="register-input" required/>
                <label className="register-label">username</label>

                <input type="password" name="password" className="register-input" required/>
                <label className="register-label">password</label>

                <input type="password" name="repeat-password" className="register-input" required/>
                <label className="register-label"
                onClick={handleChange}>repeat password</label>

                <input type="submit" value="register"/>
            </form>
        </div>
    )
}

export default Register
