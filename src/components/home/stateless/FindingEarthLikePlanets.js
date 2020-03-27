import React, { useState, useEffect } from 'react'

const FindingEarthLikePlanets = ({planets}) => {

    const [groundPercentage, setGroundPercentage] = useState(null)
    const [spacePercentage, setSpacePercentage] = useState(null)

    useEffect(() => {
        calcPercentages()
    }, [groundPercentage, spacePercentage])

    const calcPercentages = () => {
        const groundVal = (planets.filter(exoplanet => exoplanet.pl_locale === "Ground").length / planets.length * 100).toFixed(1)
        setGroundPercentage(groundVal) 
        const spaceVal = (planets.filter(exoplanet => exoplanet.pl_locale === "Space").length / planets.length * 100).toFixed(1)
        setSpacePercentage(spaceVal)
    }

    return (
        <section className="finding-earth-like-planets" id="finding-earth-like-planets">
            <h3>Finding Earth-like exoplanets</h3>
            <p>
                in 2009, to find smaller planets, NASA launched the 
                <strong>
                    Kepler
                </strong>
                space telescope, which has since been reincarnated by the
                <strong>
                    K2
                </strong>
                telescope.
            </p>
            <p>
                the Kepler spacecraft used something called the transit method.
                <br/>
                a transit is When a planet passes in front of its star.
                <br/>
                when a planet is in transit, its star will look marginally less bright .
                <br/>
                Astronomers observe this change in brightness and figure out the size of the planet.
            </p>
            <div className="ground-or-space">
                <h4>where do exoplanet discoveries take place?</h4>
                <div className="numbers">
                    <strong>{groundPercentage}%</strong>
                    <strong>{spacePercentage}%</strong>
                </div>
                <div className="number-tags">
                    <p>ground</p>
                    <p>space</p>
                </div>
            </div>
        </section>
    )
}

export default FindingEarthLikePlanets