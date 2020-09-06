const current = 4;

let currentPlanet = "Saturn";

let obj = {
    bodies: [
        {
            planet: "Mercury",
            mass: {
                massValue: 3.30114,
                massExponent: 23
            },
            num: 3.7
        },
        {
            planet: "Venus",
            mass: {
                massValue: 4.86747,
                massExponent: 24
            },
            num: 8.87
        },
        {
            planet: "Earth",
            mass: {
                massValue: 5.97237,
                massExponent: 24
            },
            num: 9.8
        },
        {
            planet: "Mars",
            mass: {
                massValue: 6.41712,
                massExponent: 23
            },
            num: 3.71
        },
        {
            planet: "Jupiter",
            mass: {
                massValue: 1.89819,
                massExponent: 27
            },
            num: 24.79
        },
        {
            planet: "Saturn",
            mass: {
                massValue: 5.68336,
                massExponent: 26
            },
            num: 10.44
        },
        {
            planet: "Uranus",
            mass: {
                massValue: 8.68127,
                massExponent: 25
            },
            num: 8.77
        },
        {
            planet: "Neptune",
            mass: {
                massValue: 1.02413,
                massExponent: 26
            },
            num: 11.15
        }
    ]
}




// const mostSimilar = () => {
//     let data = obj.bodies;
//     let len = data.length;

//     let queriedPlanet = "Jupiter";
//     let massVal = 1.89819;
//     let massExp = 27;
//     //let currentMass = massVal * Math.pow(10, massExp);

//     let diffE = 10e10;
//     let diffV = 10e10;
//     let planet = "";

//     console.log();

//     for (let i = 0; i < len; i++) {

//         expDiff = Math.abs(massExp - data[i].mass.massExponent);
//         valDiff = Math.abs(massVal - data[i].mass.massValue);

//         console.log(`${data[i].planet}:` +
//             `${data[i].mass.massValue} x 10^${data[i].mass.massExponent}` +
//             `\t\t${expDiff}\t${valDiff}`);

//         if (queriedPlanet != data[i].planet) {

//             // if closer to OG
//             if (expDiff <= diffE) {
//                 diffE = expDiff;
//                 diffV = valDiff
//                 if (valDiff <= diffV) {
//                     planet = data[i].planet
//                 }
//             }

//             // // if closer to OG
//             // if (expDiff < diffE) {

//             //     if (valDiff < diffV) {
//             //         planet = data[i].planet
//             //         diffE = expDiff;
//             //         diffV = valDiff
//             //     }
//             // }
//         }
//     }

//     final_planet = planet
//     console.log(final_planet)
// }



// // this works, but the total mass might be too large, idk
// const mostSimilar = () => {
//     let data = obj.bodies;
//     let len = data.length;

//     let planetName = "Jupiter";
//     let massVal = 1.89819;
//     let massExp = 27;
//     let currentMass = massVal * Math.pow(10, massExp);

//     let diff = 10e100;
//     let planet = planetName;
//     for (let i = 0; i < len; i++) {

//         let v = data[i]["mass"]["massValue"];
//         let e = data[i]["mass"]["massExponent"];
//         let ans = v * Math.pow(10, e);

//         currentDiff = Math.abs(currentMass - ans);
//         if ((currentDiff < diff) && (planetName != data[i].planet) && (data[i].isPlanet === true)) {
//             planet = data[i].planet
//             diff = currentDiff
//         }
//     }

//     final_planet = planet
//     console.log(final_planet)
// }



const sort = () => {
    let len = obj.bodies.length;
    let data = obj.bodies;

    let index = 0;
    let temp = 100000000;
    for (let i = 0; i < len; i++) {
        if (data[i].num < temp) {
            temp = data[i].num;
            index = i;
        }
    }
    console.log(data[index].planet)
    console.log(index);
}


