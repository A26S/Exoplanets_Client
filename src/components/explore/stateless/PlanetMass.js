import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as THREE from 'three'
import { PlaneGeometry } from 'three'

const PlanetMass = ({planets}) => {

    const exoplanetTextures = ['531_PIA17386.jpg', '4k_makemake_fictional.jpg']
    const randomise = (array) => {
        return array[Math.floor(Math.random() * array.length)]
    }

    const [planet, setPlanet] = useState({
        name: 'EARTH',
        img: 'land_ocean_ice_cloud_2048.jpg',
        mass: 1
    }) 
    const [exoplanet, setExoplanet] = useState(null)

    useEffect(() => {
        if (exoplanet) {
            createScene()
        }
    }, [planet, exoplanet])

    const exoplanetMass = () => {
        switch (planet.name) {
            case "EARTH":
                return exoplanet.pl_bmasse
            case "JUPITER":
                return exoplanet.pl_bmassj
            case "SUN":
                return exoplanet.pl_bmassj / 1048
        }
    }

    const selectPlanet = e => {
        switch (e.target.innerText) {
            case "EARTH":
                return setPlanet({
                    name: e.target.innerText,
                    img: 'land_ocean_ice_cloud_2048.jpg',
                    mass: 1
                })
            case "JUPITER":
                return setPlanet({
                    name: e.target.innerText,
                    img: '8k_jupiter.jpg',
                    mass: 1
                })
            case "SUN":
                return setPlanet({
                    name: e.target.innerText,
                    img: '8k_sun.jpg',
                    mass: 1
                })
            default:
                setPlanet({
                    name: 'EARTH',
                    img: 'land_ocean_ice_cloud_2048.jpg',
                    mass: 1
                })
            //
        }
    }

    const selectExoplanet = e => {
        const filterPlanets = planets.filter(exo => exo.pl_bmasse)

        switch (e.target.innerText) {
            case "HEAVIEST":
                const heaviestSort = filterPlanets.sort((a,b) => {
                    return b.pl_masse - a.pl_masse
                })
                return setExoplanet(heaviestSort.slice(0,1)[0])
            case "LIGHTEST":
                const lightestSort = filterPlanets.sort((a,b) => {
                    return a.pl_bmasse - b.pl_bmasse
                })
                return setExoplanet(lightestSort.slice(0,1)[0])
            default: 
                return setExoplanet(heaviestSort.slice(0,1)[0])
            //
        }
    }
    
    const createScene = () => {
        
        const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#mass-canvas'), antialias: true, alpha: true })
        renderer.setClearColor(0,0)
        renderer.setPixelRatio(devicePixelRatio)
        const width = window.innerWidth / 3 * 2
        const height = window.innerHeight / 3 * 2
        renderer.setSize(width, height)
        
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
        camera.position.z = 500
        const scene = new THREE.Scene()
        
        const light = new THREE.AmbientLight(0xffffff, 0.6)
        const light1 = new THREE.PointLight(0xffffff, 0.9)
        scene.add(light, light1)

        // calculations
        const exoM = exoplanetMass()
        let velocity = 0.95
        let acceleration = 0.05
        let exoVelocity = 0.9
        let exoAcceleration = 0.01
        let gravity = 1
        let exoGravity = 1
        // console.log(exoVelocity, velocity)
        // 16.6k
        // 9k
        // console.log(factor)
        // calculations
        
        const textureLoader = new THREE.TextureLoader
        let planetModel
        let exoplanetModel
        textureLoader.load(planet.img, map => {
            const globe = new THREE.SphereGeometry(50,100,100)
            const texture = new THREE.MeshLambertMaterial({ map })
            planetModel = new THREE.Mesh(globe,texture)
            planetModel.position.x = 150
            planetModel.position.y = 150
            scene.add(planetModel)
            animate()
        })
        textureLoader.load(randomise(exoplanetTextures), map => {
            const globe = new THREE.SphereGeometry(50,100,100)
            const texture = new THREE.MeshLambertMaterial({ map })
            exoplanetModel = new THREE.Mesh(globe,texture)
            exoplanetModel.position.x = -150
            exoplanetModel.position.y = 150
            scene.add(exoplanetModel)
            animateE()
        })

        const animate = () => {
            planetModel.rotation.y += 0.005
            planetModel.position.y -= (gravity += acceleration)
            console.log(planetModel.position.y) 
            if (planetModel.position.y >= 150) {
                planetModel.position.y -= (gravity *= acceleration)
            } else if (planetModel.position.y < -155) {
                acceleration = 0
                gravity = 0
            } else if (planetModel.position.y <= -150) {
                gravity *= (velocity * -1)
            } 
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        const animateE = () => {
            exoplanetModel.rotation.y -= 0.005
            exoplanetModel.position.y -= (exoGravity += exoAcceleration)
            if (exoplanetModel.position.y >= 150) {
                exoplanetModel.position.y -= (exoGravity *= exoAcceleration)
            } else if (exoplanetModel.position.y < -153.5) {
                exoAcceleration = 0
                exoGravity = 0
            } else if (exoplanetModel.position.y <= -150) {
                exoGravity *= (exoVelocity * -1)
            }
            
            renderer.render(scene, camera)
            requestAnimationFrame(animateE)
        }
        
        const onWindowResize = () => {
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize( width, height )
        }
        
        window.addEventListener( 'resize', onWindowResize, false )   

    }

    return (
        <section className="planet-mass" id="planet-mass">
            <canvas id="mass-canvas" />
            <div className="exoplanet-mass-options">
                <div className="heaviest"
                onClick={selectExoplanet}>heaviest</div>
                <div className="lightest"
                onClick={selectExoplanet}>lightest</div>
            </div>
            <div className="planet-mass-options">
                <div className="planet-earth"
                onClick={selectPlanet}>earth</div>
                <div className="planet-jupiter"
                onClick={selectPlanet}>jupiter</div>
                <div className="planet-sun"
                onClick={selectPlanet}>sun</div>
            </div>
            {exoplanet ? 
                <React.Fragment>
                    <div className="name">{exoplanet.pl_name}</div>
                    {exoplanetMass() > planet.mass ?
                    <div className="mass">
                        This planet is <strong>{Math.round((exoplanetMass() / planet.mass) * 100).toLocaleString()}</strong> times as heavy as {planet.name !== "JUPITER" && 'the'} {planet.name}
                    </div>
                    :
                    <div className="mass">
                        {planet.name !== "JUPITER" && 'the'} {planet.name} is <strong>{Math.round((planet.mass / exoplanetMass()) * 100).toLocaleString()}</strong> times heavier than this planet
                    </div>}
                    {exoplanet.pl_orbper ? 
                    <div className="orb-per">
                        orbital period <br/> <strong>{Math.round(exoplanet.pl_orbper)}</strong> <em>days</em>
                    </div>
                        : 
                    <div className="orb-per">
                        orbital period <br/><strong> 80.3 </strong> <em>years!</em>
                    </div>}
                    <div className="disc">year of discovery
                    <strong>{exoplanet.pl_disc}</strong></div> 
                </React.Fragment>
                    :
                <div className="before-load">
                    toggle between the options to get started!
                </div> 
            }
                <div className="bottom"/>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        planets: state.nasa.planets
    }
}

export default connect(mapStateToProps)(PlanetMass)
