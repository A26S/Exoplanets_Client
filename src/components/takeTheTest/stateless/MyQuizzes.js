import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const MyQuizzes = ({user}) => {

    const [quizResults, setQuizResults] = useState([])

    useEffect(() => {
        const fetchQuizzes = async () => {
            const res = await fetch(`http://localhost:5000/quiz/${user._id}`)
            const data = await res.json()
            setQuizResults(data)
        }
        fetchQuizzes()
    }, [])

    const deleteQuiz = async (quizId) => {
        await fetch(`http://localhost:5000/quiz/${quizId}`)
    }
    
    return (
        <section className="my-quizzes">
            <div className="quiz-slider">
            {quizResults.map(quizResult => {
                const quizId = quizResult._id
                return <div className="quiz-box" key={quizId}>
                    <div className="grade"><em>Grade:</em> {quizResult.grade}/4</div>
                    {/* <div className="time-taken"><em>Time to complete:</em> 20s</div> */}
                    <div className="delete-quiz" onClick={quizId => deleteQuiz(quizId)}>&times;</div>
                </div>
            })}
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(MyQuizzes)
