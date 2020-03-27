import React from 'react'

const ExploreIntro = () => {
    return (
        <section className="explore">
            <div className="title">
                <h2>Ex</h2>
                <h3>plore</h3>
                <h3>oplanets</h3>
            </div>
            <div className="explore-radius">
                <h3>Exoplanet radius</h3>
                <div>View to-scale, 3D, models of the <strong>largest</strong> and <em>smallest</em> exoplanets according to NASA.
                <br/>Compare radii to the Earth, Jupiter and the Sun!</div>
                <button><a href="#planet-radius">
                    explore radius
                </a></button>
            </div>
            <div className="explore-mass">
            <h3>Exoplanet mass</h3>
                <div>View <span className="to-scale">to-scale<span className="coming-soon">coming soon!</span></span>, 3D, models of the <strong>heaviest</strong> and <em>lightest</em> exoplanets according to NASA.
                <br/>Compare masses to the Earth, Jupiter and the Sun!</div>
                <button><a href="#planet-mass">explore mass</a></button>
            </div>
            <div className="bottom"/>
        </section>
    )
}

export default ExploreIntro
