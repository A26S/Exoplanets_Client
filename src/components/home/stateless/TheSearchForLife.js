import React, { useState, useEffect } from 'react'

const TheSearchForLife = ({planets}) => {

    const [mostUsedInstrument, setMostUsedInstrument] = useState('')
    const [instrumentPercentage, setInstrumentPercentage] = useState(null)

    useEffect(() => {
        instrumentFacts()
    }, [mostUsedInstrument, instrumentPercentage])

    const instrumentFacts = () => {
        const instruments = planets.map(exo => exo.pl_instrument)
        const mostCommon = instruments.sort((a,b) => {
            return instruments.filter(inst => inst === b).length
            - instruments.filter(inst => inst === a).length
        })
        setMostUsedInstrument(mostCommon[0])
        const percentage = Math.round((instruments.filter(instrument => instrument === mostCommon[0]).length 
                            / instruments.length) * 100)
        setInstrumentPercentage(percentage) 
    }
    
    return (
        <section className="search-for-life" id="search-for-life">
            <h3>The search for life</h3>
            <p>
                By studying the time between transits, astronomers can calculate the distance between the planet and the star.
                <br/>
                This then tells us something about the planet temperature.
            </p>
            <p>
                To find life, astronomers focus on the "habitable zone" around stars, 
                <br/>
                the right distance and temperature for water to exist.
            </p>
            <p>
                The need for water is non-negotiable for a planet bearing life,
                <br/>
                which is the ultimate goal of NASA's exoplanets program: 
                <span>finding life beyond Earth.</span>
            </p>
            <div className="most-used-instrument">
                did you know the 
                <strong>{mostUsedInstrument}</strong>
                is responsible for
                <strong>{instrumentPercentage}%</strong>
                of all exoplanet discoveries?
            </div>
        </section>
    )
}

export default TheSearchForLife
