import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const Quiz = ({user, history}) => {
    
    const [currentQuiz, setCurrentQuiz] = useState(null)
    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState([])
    
    useEffect(() => {
        setLoading(false)
        setCurrentQuiz(quiz1)
    }, [])
    
    const quiz1 = {
        question: "which exoplanet is larger than the sun?",
        options: ["NONE", "HD 100546 B", "HR 2562 B", "KEPLER-37 B"],
        answer: "NONE"
    }
    const quiz2 = {
        question: "what is the one constant astronomers look for in a life-bearing planet",
        options: ["WATER", "OXYGEN", "RADIOACTIVITY", "CARBON"],
        answer: "WATER"
    }
    const quiz3 = {
        question: "which telescope is currently deployed by nasa to look for exoplanets?",
        options: ["K2", "ORION", "HUBBLE", "KEPLER"],
        answer: "K2"
    }
    
    const nextQuiz = e => {
        switch (currentQuiz.question) {
            case quiz1.question:
                setCurrentQuiz(quiz2)
                return setResults([...results, e.target.innerText])
            case quiz2.question:
                setCurrentQuiz(quiz3)
                return setResults([...results, e.target.innerText])
            case quiz3.question:
                return setResults([...results, e.target.innerText])
            default: 
                return setCurrentQuiz(quiz1)
        }
    }

    const sendResults = async results => {
        const grade = results.reduce((correct, input) => {
            const answers = [quiz1.answer, quiz2.answer, quiz3.answer]
            answers.map(answer => {
                if (input === answer) {
                    correct++
                }
            })
            return correct
        }, 0)

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                grade,
                user
            })
        }
        const res = await fetch('http://localhost:5000/quiz/submit', config)
        const data = await res.json()
        history.push('/take-the-test')
        console.log(res)
        console.log(data)
    }

    if (results.length === 3) {
        sendResults(results)
    }

    return (
        <section className="quiz-container">
            {loading ? 
            <div>loading</div>
            :
            <React.Fragment>
                <h3>{currentQuiz.question}</h3>
                <div className="button-container">
                    <button onClick={nextQuiz}>{currentQuiz.options[0]}</button>
                    <button onClick={nextQuiz}>{currentQuiz.options[1]}</button>
                    <button onClick={nextQuiz}>{currentQuiz.options[2]}</button>
                    <button onClick={nextQuiz}>{currentQuiz.options[3]}</button>
                </div>
            </React.Fragment>
            }
        </section>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Quiz)
