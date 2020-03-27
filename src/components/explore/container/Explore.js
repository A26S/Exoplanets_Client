import React from 'react'
import ExploreIntro from '../stateless/ExploreIntro'
import PlanetRadius from '../stateless/PlanetRadius'
import PlanetMass from '../stateless/PlanetMass'

const Explore = () => {
    return (
        <React.Fragment>
            <ExploreIntro/>
            <PlanetRadius/>
            <PlanetMass/>
        </React.Fragment>
    )
}

export default Explore
