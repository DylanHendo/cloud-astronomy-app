const axios = require("axios");

/**
 * Given the data, this function searches for the most different value of currentValue, 
 * and then gets the name of that planet the data belongs to and sends it to the client.
 * @param {Object} data JSON object containing planetary data 
 * @param {int} currentValue Value being compared to (what was attained from search query)
 * @param {String} planetName Name of planet that was queried
 * @param {Object} res Response object
 * @param {String} value Name of JSON object key of planetary attribute being filtered
 */
function mostDifferent(data, currentValue, planetName, res, value) {
    let len = data.length;
    let diff = 0;
    let planet = planetName;
    for (let i = 0; i < len; i++) {
        currentDiff = Math.abs(currentValue - data[i][value]);
        if ((currentDiff > diff) && (planetName != data[i].englishName) && data[i].isPlanet
            && data[i].englishName != "136472 Makemake" && data[i].englishName != "Pluto") {
            planet = data[i].englishName
            diff = currentDiff
        }
    }
    finalPlanet = planet
    res.json(finalPlanet);
}

/**
 * Get the planet name belonging to the planet that has the closest gravity to the 
 * current gravity of the searched planet.
 * @param {int} currentGravity Gravity of queried planet
 * @param {string} planetName Name of queried planet
 * @param {*} res Response object
 */
function filterGravityDifferent(currentGravity, planetName, res) {
    // no planet gravities outside 3 and 25
    let url = `https://api.le-systeme-solaire.net/rest/bodies?filter=gravity,bt,3,25`;
    axios.get(url)
        .then(response => response.data)
        .then(gravityData => {
            let data = gravityData.bodies;
            mostDifferent(data, currentGravity, planetName, res, "gravity");
        })
        .catch(err => {
            console.log(err);
        });
}


/**
 * Get the planet name belonging to the planet that has the closest escape velocity to the 
 * current excape velocity of the searched planet.
 * @param {int} currentEscape Escape velocity of queried planet
 * @param {string} planetName Name of queried planet
 * @param {*} res Response object
 */
function filterEscapeDifferent(currentEscape, planetName, res) {
    let url = `https://api.le-systeme-solaire.net/rest/bodies?filter=escape,bt,4000,100000`;
    axios.get(url)
        .then(response => response.data)
        .then(escapeData => {
            let data = escapeData.bodies;
            mostDifferent(data, currentEscape, planetName, res, "escape");
        })
        .catch(err => {
            console.log(err);
        });
}


/**
 * Get the planet name belonging to the planet that has the closest radius to the 
 * current radius of the searched planet.
 * @param {int} currentRadius Radius of queried planet
 * @param {string} planetName Name of queried planet
 * @param {*} res Response object
 */
function filterRadiusDifferent(currentRadius, planetName, res) {
    let url = `https://api.le-systeme-solaire.net/rest/bodies?filter=meanRadius,bt,2000,100000`;
    axios.get(url)
        .then(response => response.data)
        .then(radiusData => {
            let data = radiusData.bodies;
            mostDifferent(data, currentRadius, planetName, res, "meanRadius");
        })
        .catch(err => {
            console.log(err);
        });
}


/**
 * Get the planet name belonging to the planet that has the closest density to the 
 * current density of the searched planet.
 * @param {int} currentDensity Density of queried planet
 * @param {string} planetName Name of queried planet
 * @param {*} res Response object
 */
function filterDensityDifferent(currentDensity, planetName, res) {
    let url = `https://api.le-systeme-solaire.net/rest/bodies?filter=density,bt,0,50`;
    axios.get(url)
        .then(response => response.data)
        .then(densityData => {
            let data = densityData.bodies;
            mostDifferent(data, currentDensity, planetName, res, "density");
        })
        .catch(err => {
            console.log(err);
        });
}


module.exports = {
    filterGravityDifferent: filterGravityDifferent,
    filterEscapeDifferent: filterEscapeDifferent,
    filterRadiusDifferent: filterRadiusDifferent,
    filterDensityDifferent: filterDensityDifferent
};