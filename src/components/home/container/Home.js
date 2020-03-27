import React from 'react'
import { connect } from 'react-redux'
import HomeScreen from '../stateless/HomeScreen'
import HowWeLookForPlanets from '../stateless/HowWeLookForPlanets'
import FindingEarthLikePlanets from '../stateless/FindingEarthLikePlanets'
import TheSearchForLife from '../stateless/TheSearchForLife'

const Home = (props) => {
    return (
        <React.Fragment>
            <HomeScreen planets={props.planets}/>
            <HowWeLookForPlanets planets={props.planets}/>
            <FindingEarthLikePlanets planets={props.planets}/>
            <TheSearchForLife planets={props.planets}/>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        planets: state.nasa.planets
    }
}

export default connect(mapStateToProps)(Home)
