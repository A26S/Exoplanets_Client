import React from 'react'
import { NavLink } from 'react-router-dom'

const HomeScreen = (props) => {

    return (
        <section className="home-screen">
            <p className="before-h1"><span>"</span>Any planet beyond our solar system<span>"</span></p>
            <h1>Exoplanet</h1>
            <div className="information">
                <li>All of the planets in our solar system orbit around the Sun.</li> 
                <li>Planets that orbit around other stars are called exoplanets.</li>
            </div>
            <div className="live-planets">
                <p>live count</p>
                <strong>{props.planets.length}</strong>
                <p>confirmed exoplanets</p>
            </div>
            <ul className="sections">
                <li><a href="#how-we-look-for-planets" className="home-link">
                    <span className="home-span"/>
                    how we look for planets
                </a></li>
                <li><a href="#finding-earth-like-planets" className="home-link">
                    <span className="home-span"/>
                    finding earth like planets
                </a></li>
                <li><a href="#search-for-life" className="home-link">
                    <span className="home-span"/>
                    the search for life
                </a></li>
            </ul>
        </section>
    )
}

export default HomeScreen
