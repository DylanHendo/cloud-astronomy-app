
let obj = {
    bodies: [
        {
            englishName: "Mercury",
            gravity: 3.7
        },
        {
            englishName: "Venus",
            gravity: 8.87
        },
        {
            englishName: "Earth",
            gravity: 9.8
        },
        {
            englishName: "Mars",
            gravity: 3.71
        },
        {
            englishName: "Jupiter",
            gravity: 24.79
        },
        {
            englishName: "Saturn",
            gravity: 10.44
        },
        {
            englishName: "Uranus",
            gravity: 8.77
        },
        {
            englishName: "Neptune",
            gravity: 11.15
        }
    ]
}


function mostDifferent(data, currentValue, planetName, value) {
    let len = data.bodies.length;
    let diff = 0;
    let planet = planetName;
    for (let i = 0; i < len; i++) {
        currentDiff = Math.abs(currentValue - data.bodies[i][value]);
        if ((currentDiff > diff) && (planetName != data.bodies[i].englishName)) {
            planet = data.bodies[i].englishName
            diff = currentDiff
        }
    }
    finalPlanet = planet
    console.log(finalPlanet);
}


let name = "Neptune";
let g = 11.15;
let v = "gravity"
mostDifferent(obj, g, name, v);



// function mostDifferent(data, currentValue, planetName, res, value) {
//     let len = data.length;
//     let diff = 0;
//     let planet = planetName;
//     for (let i = 0; i < len; i++) {
//         currentDiff = Math.abs(currentValue - data[i][value]);
//         // Makemake and Pluto are 2 dwarf planets I am excluding
//         if ((currentDiff > diff) && (planetName != data[i].englishName) && data[i].isPlanet
//             && data[i].englishName != "136472 Makemake" && data[i].englishName != "Pluto") {
//             planet = data[i].englishName
//             diff = currentDiff
//         }
//     }
//     finalPlanet = planet
//     res.json(finalPlanet);
// }