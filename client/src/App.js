import React, { useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

// widths for the AgGrid
const nameWidth = 75, gravWidth = 130, escWidth = 120, radWidth = 120, densityWidth = 130, moonWidth = 80;
const totalWidth = nameWidth + gravWidth + escWidth + radWidth + densityWidth + moonWidth;

// AgGrid Columns
const columns = [
    { headerName: "Name", field: "name", width: nameWidth },
    { headerName: "Gravity (m/s ^ 2)", field: "gravity", width: gravWidth },
    { headerName: "Escape V. (m/s)", field: "escape", width: escWidth },
    { headerName: "Radius (km)", field: "radius", width: radWidth },
    { headerName: "Density (gcm^3)", field: "density", width: densityWidth },
    { headerName: "Moons", field: "numMoons", width: moonWidth }
];

function App() {
    const [text, setText] = useState("");          // search bar
    const [searchLoading, setSearchLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const [link, setLink] = useState("");          // NASA img LHS
    const [caption, setCaption] = useState("");    // NASA caption LHS
    const [link2, setLink2] = useState("");        // NASA img RHS
    const [caption2, setCaption2] = useState("");  // NASA caption RHS

    const [rowData, setRowData] = useState([]);    // planet data table
    const [rowData2, setRowData2] = useState([])   // planet data for most similar planet

    // LHS tweet data
    const [tweetData, setTweetData] = useState({
        created_at: "Date",
        id: 0,
        text: "Text",
        username: "Name"
    });

    // RHS tweet data
    const [tweetData2, setTweetData2] = useState({
        created_at: "Date",
        id: 0,
        text: "Text",
        username: "Name"
    });

    // get data from backend, display on LHS
    const callAPI = () => {
        setSearchLoading(true);   // data is loading
        // let url = `http://localhost:5000/api?planet=${text}`;
        let url = `${window.location.origin}/api?planet=${text}`;
        fetch(url)
            .then(res => res.json())
            .then(imgData => {
                setLink(imgData.data[0].link);
                setCaption(imgData.data[0].title);
                setRowData(imgData.data[1]);
                setTweetData(imgData.data[2]);
                setSearchLoading(false);  // data is loaded
            })
            .catch(err => console.log(err))
    }

    /**
     * Fetch data from backend related to planetName, and display on RHS of screen
     * @param {String} planetName Name of planet returned from performing filter
     */
    const getFilteredData = (planetName) => {
        let url = `${window.location.origin}/api?planet=${planetName}`;
        fetch(url)
            .then(res => res.json())
            .then(queriedData => {
                setLink2(queriedData.data[0].link);
                setCaption2(queriedData.data[0].title);
                setRowData2(queriedData.data[1]);
                setTweetData2(queriedData.data[2]);
            })
            .catch(err => console.log(err))
    }

    /**
     * Return name of planet with most similar attibute, then that name is used to get all the
     * relevant data about it (imgs, data, tweets)
     */
    const filterGravity = () => {
        try {
            setButtonLoading(true);
            let currentGravity = rowData[0].gravity;
            let currentPlanet = rowData[0].name;
            let url = `${window.location.origin}/api/gravity?gravity=${currentGravity}&planet=${currentPlanet}`;
            fetch(url)
                .then(res => res.json())
                .then(planetName => {
                    getFilteredData(planetName)
                    // setButtonLoading(false);
                })
                .then(() => setButtonLoading(false))
                .catch(e => console.log(e))
        } catch (err) {
            console.log(err);
            setButtonLoading(false);
        }
    }

    const filterEscape = () => {
        try {
            setButtonLoading(true);
            let currentEscape = rowData[0].escape;
            let currentPlanet = rowData[0].name;
            let url = `${window.location.origin}/api/escape?escape=${currentEscape}&planet=${currentPlanet}`;
            fetch(url)
                .then(res => res.json())
                .then(planetName => {
                    getFilteredData(planetName);
                    // setButtonLoading(false);
                })
                .then(() => setButtonLoading(false))
                .catch(e => console.log(e))
        } catch (err) {
            console.log(err);
            setButtonLoading(false);
        }
    }

    const filterRadius = () => {
        try {
            setButtonLoading(true);
            let currentRadius = rowData[0].radius;
            let currentPlanet = rowData[0].name;
            let url = `${window.location.origin}/api/radius?radius=${currentRadius}&planet=${currentPlanet}`;
            fetch(url)
                .then(res => res.json())
                .then(planetName => {
                    getFilteredData(planetName);
                    // setButtonLoading(false);
                })
                .then(() => setButtonLoading(false))
                .catch(e => console.log(e))
        } catch (err) {
            console.log(err);
            setButtonLoading(false);
        }
    }

    const filterDensity = () => {
        try {
            setButtonLoading(true);
            let currentDensity = rowData[0].density;
            let currentPlanet = rowData[0].name;
            let url = `${window.location.origin}/api/density?density=${currentDensity}&planet=${currentPlanet}`;
            fetch(url)
                .then(res => res.json())
                .then(planetName => getFilteredData(planetName))
                .then(() => setButtonLoading(false))
                .catch(e => console.log(e))
        } catch (err) {
            console.log(err);
            setButtonLoading(false);
        }
    }


    return (
        <div className="App">
            <header className="App-header">
                <div className="planet-search">
                    <form onSubmit={event => {
                        event.preventDefault();
                        console.log(text);
                        callAPI();
                    }}>
                        <input
                            type="search"
                            name="planet"
                            placeholder="Search Planet"
                            value={text}
                            onChange={event => {
                                setText(event.target.value)
                            }}
                            style={{
                                width: 200,
                                height: 25
                            }}
                        />
                        <button
                            style={{
                                height: 25
                            }}>Submit</button>
                    </form>{' '}
                </div>
                <h6 className="searchLoading">{searchLoading ? "LOADING..." : " "}</h6>


                <h5 style={{ position: "absolute", top: "-10px", right: "510px" }}>Most Similar By:</h5>
                <div className="filterSimilar">
                    <button onClick={filterGravity}>Gravity</button>{' '}
                    <button onClick={filterEscape}>Escape</button>{' '}
                    <button onClick={filterRadius}>Radius</button>{' '}
                    <button onClick={filterDensity}>Density</button>{' '}
                </div>
                <h5 className="buttonLoading">{buttonLoading ? "LOADING..." : " "}</h5>


                <div className="img1">
                    <figure>
                        <img src={link} alt="Space IMG" />
                        <figcaption>{caption}</figcaption>
                    </figure>
                </div>

                <div className="img2">
                    <figure>
                        <img src={link2} alt="Space IMG" />
                        <figcaption>{caption2}</figcaption>
                    </figure>
                </div>


                <div id="row1" className="ag-theme-balham-dark" style={{
                    width: `${totalWidth}px`,
                    position: "absolute",
                    top: "100px",
                    left: "20px"
                }}>
                    <AgGridReact
                        columnDefs={columns}
                        rowData={rowData}
                        domLayout={"autoHeight"}
                    />
                </div>

                <div id="row2" className="ag-theme-balham-dark" style={{
                    width: `${totalWidth}px`,
                    position: "absolute",
                    top: "100px",
                    right: "20px"
                }}>
                    <AgGridReact
                        columnDefs={columns}
                        rowData={rowData2}
                        domLayout={"autoHeight"}
                    />
                </div>

                <div className="tweet">
                    <small style={{ color: "black", textAlign: "left", paddingLeft: '15px' }}>@{tweetData.username}</small>
                    <small style={{ color: "black", textAlign: "left", paddingLeft: '15px' }}>{tweetData.created_at}</small>
                    <br />
                    <small style={{ color: "black", textAlign: "left", paddingLeft: '15px' }}>{tweetData.text}</small>
                </div>

                <div className="tweet2">
                    <small style={{ color: "black", textAlign: "left", paddingLeft: '15px' }}>@{tweetData2.username}</small>
                    <small style={{ color: "black", textAlign: "left", paddingLeft: '15px' }}>{tweetData2.created_at}</small>
                    <br />
                    <small style={{ color: "black", textAlign: "left", paddingLeft: '15px' }}>{tweetData2.text}</small>
                </div>

            </header>
        </div >
    );
}

export default App;
