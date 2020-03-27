import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const TakeTheTest = ({ isAuthenticated }) => {
    return (
        <section className="take-the-test">
            {!isAuthenticated ? 
            <h2>Sign in to unlock access this section!</h2>
            :
            <>
                <h2>Put your knowledge to the test!</h2>
                <NavLink to="/quiz" className="begin-quiz">
                    <span/>
                    <h3>Begin quiz</h3>
                    <span/>
                    <span/>
                </NavLink>
                <NavLink to="/my-quizzes" className="my-quizzes">
                    <span/>
                    <h3>my quizzes</h3>
                    <span/>
                    <span/>
                </NavLink>
            </>}
        </section>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(TakeTheTest)
