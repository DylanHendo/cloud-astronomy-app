const express = require('express');
const axios = require("axios");
const router = express.Router();
const filter = require('./filter');   // import module for filtering functions
require('dotenv').config()

// search page
router.get('/api', async function (req, res, next) {
    const planet = req.query.planet;

    const a = getImagesNASA(planet);
    const b = getPlanetData(planet);
    const c = getTweets(planet);

    // await values from promise until resolved, and able to send to client
    const result = await Promise.all([a, b, c]);
    const dataObj = {
        data: result
    };
    res.send(dataObj);
});

/**
 * 
 */
router.get('/api/gravity', function (req, res) {
    const currentGravity = req.query.gravity;
    const planetName = req.query.planet;
    filter.filterGravity(currentGravity, planetName, res);
});

/**
 *  */
router.get('/api/escape', function (req, res) {
    const currentEscape = req.query.escape;
    const planetName = req.query.planet;
    filter.filterEscape(currentEscape, planetName, res);
});

/**
 * 
 */
router.get('/api/radius', function (req, res) {
    const currentRadius = req.query.radius;
    const planetName = req.query.planet;
    filter.filterRadius(currentRadius, planetName, res);
});

/**
 * 
 */
router.get('/api/density', function (req, res) {
    const currentDensity = req.query.density;
    const planetName = req.query.planet;
    filter.filterDensity(currentDensity, planetName, res);
});


/**
 * Get relevant planet data from the Solar System OpenData API
 * @param {string} planet Planet query made by user
 */
function getPlanetData(planet) {
    let url = `https://api.le-systeme-solaire.net/rest/bodies/${planet}`;
    return axios.get(url)
        .then((response) => response.data)
        .then(planetData => {
            const name = planetData.englishName;
            const gravity = planetData.gravity;    //gravity (m/s ^ 2)
            const escape = planetData.escape;      //escape (m/s)           
            const radius = planetData.meanRadius;  //radius (km)
            const density = planetData.density;    // g . cm^3
            let numMoons = 0;
            try {
                numMoons = planetData.moons.length; // num moons
            } catch (e) {
                numMoons = 0;   // planet has no moons
            }

            const arr = [
                {
                    name: name,
                    gravity: gravity,
                    escape: escape,
                    radius: radius,
                    density: density,
                    numMoons: numMoons
                }
            ];

            return arr;
        })
        .catch((error) => console.log(error));
}


/**
 * Sends request to NASA's API for images relating to planet query
 * @param {string} planet Planet query made by user
 */
function getImagesNASA(planet) {

    let url = `https://images-api.nasa.gov/search?q=${planet}&keywords=${planet}&media_type=image&year_start=2010`;

    const maxReturn = 99;   // it can only return max 100 data objects
    let randomNum;

    return axios.get(url)
        .then((response) => response.data)
        .then(imgData => {

            let count = imgData.collection.metadata.total_hits;    // number of images returned
            if (count < maxReturn) {
                randomNum = Math.floor(Math.random() * count);
            } else {
                randomNum = Math.floor(Math.random() * maxReturn);
            }

            let imgTitle = "";
            let imgLink = "";

            // if error with data returned, send abritrary data
            try {
                imgTitle = imgData.collection.items[randomNum].data[0].title;
                imgLink = imgData.collection.items[randomNum].links[0].href;
            } catch (err) {
                imgTitle = "N/A";
                imgLink = "N/A"
            }

            let relevantData = {
                title: imgTitle,
                link: imgLink
            };

            return relevantData;
        })
        .catch((error) => console.log(error));

}


/**
 * Get most recent tweets from Twitter relating to planet query
 * @param {string} planet Planet query made by user
 */
function getTweets(planet) {

    const token = process.env.TOKEN;
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    const count = 50;
    let randomNum = Math.floor(Math.random() * count);

    let url = `https://api.twitter.com/1.1/search/tweets.json?q=${planet}%20@NASA&lang=en&count=${count}`;
    return axios.get(url, config)
        .then(rsp => rsp.data)
        .then(twitterData => {

            let len = twitterData.statuses.length - 1;
            if (len < count) {
                randomNum = Math.floor(Math.random() * len);
            }

            let time = "", id = 0, info = "", user = "";
            try {
                time = twitterData.statuses[randomNum].created_at;
                id = twitterData.statuses[randomNum].id;
                info = twitterData.statuses[randomNum].text;
                user = twitterData.statuses[randomNum].user.screen_name;
            } catch (err) {
                time = "time";
                info = "text";
                user = "user";
            }

            let obj = {
                created_at: time,
                id: id,
                text: info,
                username: user
            }

            return obj;
        })
        .catch(err => console.log(err));

}

module.exports = router;
