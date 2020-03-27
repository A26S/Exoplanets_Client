import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { connect } from 'react-redux'

const PlanetRadius = ({planets}) => {

    const exoplanetTextures = ['531_PIA17386.jpg', '4k_makemake_fictional.jpg']
    const randomise = (array) => {
        return array[Math.floor(Math.random() * array.length)]
    }

    const [planet, setPlanet] = useState({
            name: 'EARTH',
            img: 'land_ocean_ice_cloud_2048.jpg',
            radius: 1
        }) 
    
    const [exoplanet, setExoplanet] = useState(null)

    const findVolume = (radius) => {
        return (Math.PI * 4 / 3) * (radius ** 3)
    }

    const exoplanetRadius = () => {
        switch (planet.name) {
            case "EARTH":
                return exoplanet.pl_rade
            case "JUPITER":
                return exoplanet.pl_radj
            case "SUN":
                return exoplanet.pl_rads
        }
    }

    useEffect(() => {
        if (exoplanet) {

            createScene()
        }
    }, [planet, exoplanet])

    const selectPlanet = e => {
        switch (e.target.innerText) {
            case "EARTH":
                return setPlanet({
                    name: e.target.innerText,
                    img: 'land_ocean_ice_cloud_2048.jpg',
                    radius: 1
                })
            case "JUPITER":
                return setPlanet({
                    name: e.target.innerText,
                    img: '8k_jupiter.jpg',
                    radius: 1
                })
            case "SUN":
                return setPlanet({
                    name: e.target.innerText,
                    img: '8k_sun.jpg',
                    radius: 1
                })
            default:
                setPlanet({
                    name: 'EARTH',
                    img: 'land_ocean_ice_cloud_2048.jpg',
                    radius: 1
                })
            //
        }
    }

    const selectExoplanet = e => {
        const planetsRadii = planets.filter(exoplanet => {
            return exoplanet.pl_rade
        })
        switch (e.target.innerText) {
            case "LARGEST":
                const largestSort = planetsRadii.sort((a,b) => {
                    return b.pl_rade - a.pl_rade
                })
                return setExoplanet(largestSort.slice(0,1)[0])
            case "SMALLEST":
                const smallestSort = planetsRadii.sort((a,b) => {
                    return a.pl_rade - b.pl_rade
                })
                return setExoplanet(smallestSort.slice(0,1)[0])
            default: 
                return setExoplanet(largestSort.slice(0,1)[0])
            //
        }
    }

    const createScene = () => {
        
        const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#radius-canvas'), antialias: true, alpha: true })
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
        const exoR = exoplanetRadius()
        const scale = 175 / (exoR + planet.radius)
        const scaledRadiusPlanet = planet.radius * scale
        const scaledRadiusExoplanet = exoR * scale
        // calculations

        const textureLoader = new THREE.TextureLoader
        let planetModel
        let exoplanetModel
        textureLoader.load(planet.img, map => {
            const globe = new THREE.SphereGeometry(scaledRadiusPlanet,100,100)
            const texture = new THREE.MeshLambertMaterial({ map })
            planetModel = new THREE.Mesh(globe,texture)
            planetModel.position.x = 150
            scene.add(planetModel)
            animate()
        })
        textureLoader.load(randomise(exoplanetTextures), map => {
            const globe = new THREE.SphereGeometry(scaledRadiusExoplanet,100,100)
            const texture = new THREE.MeshLambertMaterial({ map })
            exoplanetModel = new THREE.Mesh(globe,texture)
            exoplanetModel.position.x = -150
            scene.add(exoplanetModel)
            animateE()
        })

        const animate = () => {
            planetModel.rotation.y += 0.005
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        const animateE = () => {
            exoplanetModel.rotation.y -= 0.005
            renderer.render(scene, camera)
            requestAnimationFrame(animateE)
        }
        
        // const rotateCamera = () => {
            // let c = 1
            // c *= -1.1
            // camera.position.x += Math.sin(cosine) * 10
            // camera.position.y += Math.sin(1) * 10
        //     camera.position.z += 15
        //     requestAnimationFrame(rotateCamera)
        // }
        // rotateCamera()

        const onWindowResize = () => {
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize( width, height )
        }
        
        window.addEventListener( 'resize', onWindowResize, false )   

    }

    return (
        <section className="planet-radius" id="planet-radius">
            <canvas id="radius-canvas" />
            <div className="exoplanet-radius-options">
                <div className="largest-exoplanet"
                onClick={selectExoplanet}>largest</div>
                <div className="smallest-exoplanet"
                onClick={selectExoplanet}>smallest</div>
            </div>
            <div className="planet-radius-options">
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
                {(findVolume(exoplanetRadius()) / findVolume(1)) > 1 ? 
                    <div className="volume">
                        this planet could squeeze <strong>{Math.round(findVolume(exoplanetRadius()) / findVolume(1)).toLocaleString()}</strong> {planet.name}s inside of it
                    </div>
                : 
                    <div className="volume">
                        {planet.name !== "JUPITER" && 'the'} {planet.name} could squeeze this planet <strong>{Math.floor(findVolume(1) / findVolume(exoplanetRadius())).toLocaleString()}</strong> times inside of it
                    </div>}
                {exoplanet.pl_orbper ? 
                    <div className="orb-per">
                        orbital period <br/> <strong>{Math.round(exoplanet.pl_orbper)}</strong> <em>days</em>
                    </div>
                : 
                    <div className="orb-per">
                        orbital period <br/><strong> 249.2 </strong> <em>years!</em>
                    </div>}
                <div className="disc">year of discovery
                <strong>{exoplanet.pl_disc}</strong></div> 
            </React.Fragment>
                :
            <div className="before-load">toggle between the options to get started!</div> 
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

export default connect(mapStateToProps)(PlanetRadius)
