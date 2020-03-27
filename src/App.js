import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from './components/utils/Loading'
import Home from './components/home/container/Home'
import Explore from './components/explore/container/Explore'
import TakeTheTest from './components/takeTheTest/container/TakeTheTest'
import NavBar from './components/utils/NavBar'
import Cursor from './components/utils/Cursor'
import Auth from './components/auth/container/Auth'
import Quiz from './components/takeTheTest/stateless/Quiz'
import MyQuizzes from './components/takeTheTest/stateless/MyQuizzes'


const App = ({url, fetchPlanets, user, setUser}) => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url)
      const data = await res.json()
      fetchPlanets(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchUser = async () => {
      const res = await fetch('http://localhost:5000/auth/current_user', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (Object.keys(data).includes('user')) {
        setUser(data.user)
      }
    }
    fetchUser()
  }, [user])

  return (
    <React.Fragment>
      <Cursor/>
      {loading ? 
      <Loading/>
      :
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/explore" component={Explore}/>
          <Route exact path="/take-the-test" component={TakeTheTest}/>
          <Route exact path="/quiz" component={Quiz}/>
          <Route exact path="/my-quizzes" component={MyQuizzes}/>
          <Route exact path="/auth" component={Auth}/>
        </Switch>
      </BrowserRouter>}
    </React.Fragment>  
  )
}

const mapStateToProps = (state) => {
  return {
    // planets: state.nasa.planets,
    url: state.nasa.baseUrl,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlanets: (data) =>  dispatch({type: "FETCH_PLANETS", data}) ,
    setUser: data => dispatch({type: "SET_USER", data})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)