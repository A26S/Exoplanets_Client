const init = {
    baseUrl: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_orbper,pl_eqt,pl_disc,pl_rade,pl_rads,pl_radj,st_dist,pl_locale,pl_instrument,st_mass,pl_masse,pl_bmasse,pl_massj,pl_bmassj&format=json',
    planets: []
}

const nasaReducer = (state = init, action) => {
    switch (action.type) {
        case "FETCH_PLANETS":
            return {
                ...state,
                planets: action.data
            }
        default:
            return state
    }
}

export default nasaReducer