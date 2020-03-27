import React, { useState, useEffect } from 'react'

const HowWeLookForPlanets = ({planets}) => {

    const [lightYears, setLightYears] = useState(null)

    useEffect(() => {
        findDist()
    }, [lightYears])

    const findDist = () => {
        const filtered = planets.filter(exoplanet => exoplanet.st_dist)
        
        const result = filtered.sort((a,b) => {
            return a.st_dist - b.st_dist
        })
        setLightYears((result[0].st_dist * 3.26).toFixed(1))
    }   

    return (
        <section className="how-we-look-for-planets" id="how-we-look-for-planets">
            <h3>How do we look for exoplanets?</h3>
            <p>
                <br/>
                Exoplanets are very hard to see directly with telescopes.
                <br/>
                Therefore, we look for stars that wobble.
                <br/>
                A star that has planets orbiting around it wobbles because of the gravitational pull created by its planets.
            </p>
            <p>
                <br/>
                The downfall is that only large exoplanets the size of Jupiter can be seen this way.
                <br/>
                <br/>
                So, how can we find smaller, Earth-like exoplanets?
            </p>
            <div className="stellar-distance">
                the closest planetery system to us is
                <strong>{lightYears}</strong>
                light years away...
            </div>
        </section>
    )
}

export default HowWeLookForPlanets