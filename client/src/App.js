import React, { useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

// widths for the AgGrid columns
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

    const [rowData, setRowData] = useState([]);    // planet data table LHS
    const [rowData2, setRowData2] = useState([])   // planet data table RHS

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

    const IP = window.location.origin;
    const port = 5000;
    const ec2 = `${IP}:${port}`;

    //http://localhost:5000

    // get data from backend, display on LHS
    const callAPI = () => {
        setSearchLoading(true);   // data is loading
        let url = `/api?planet=${text}`;
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
    const displayFilteredData = (planetName) => {
        let url = `/api?planet=${planetName}`;
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
     * Function to be called when user hits one of the buttons for filtering the data. 
     * This function fetch's from different routes, depending on which planet characteristic
     * is requested and which filter mode.
     * @param {String} characteristic The planet data being filtered (e.g. gravity, radius, etc.)
     * @param {String} mode How the data is being filtered ("similar" or "different")
     */
    const filter = (characteristic, mode) => {
        try {
            setButtonLoading(true);
            let currentValue = rowData[0][characteristic];
            let currentPlanet = rowData[0].name;
            //let base = "http://localhost:5000";
            let query = `/api/${characteristic}?${characteristic}=${currentValue}&planet=${currentPlanet}&filter=${mode}`;
            //let url = base + query;
            fetch(query)
                .then(res => res.json())
                .then(planetName => displayFilteredData(planetName))
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
                                width: 250,
                                height: 30
                            }}
                        />{' '}
                        <button
                            style={{
                                height: 30
                            }}>Submit</button>
                    </form>{' '}
                </div>
                <h6 className="searchLoading">{searchLoading ? "LOADING..." : " "}</h6>


                <h5 style={{ position: "absolute", top: "-20px", right: "510px" }}>Most Similar By:</h5>
                <div className="filterSimilar">
                    <button onClick={() => filter("gravity", "similar")}>Gravity</button>{' '}
                    <button onClick={() => filter("escape", "similar")}>Escape</button>{' '}
                    <button onClick={() => filter("radius", "similar")}>Radius</button>{' '}
                    <button onClick={() => filter("density", "similar")}>Density</button>{' '}
                </div>
                <h6 className="buttonLoading">{buttonLoading ? "LOADING..." : " "}</h6>

                <h5 style={{ position: "absolute", top: "20px", right: "489px" }}>Most Different By:</h5>
                <div className="filterDifferent">
                    <button onClick={() => filter("gravity", "different")}>Gravity</button>{' '}
                    <button onClick={() => filter("escape", "different")}>Escape</button>{' '}
                    <button onClick={() => filter("radius", "different")}>Radius</button>{' '}
                    <button onClick={() => filter("density", "different")}>Density</button>{' '}
                </div>
                <h6 className="buttonLoading">{buttonLoading ? "LOADING..." : " "}</h6>


                <div className="img1">
                    <figure>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <img src={link} alt="Space IMG" />
                        </a>
                        <figcaption>{caption}</figcaption>
                    </figure>
                </div>

                <div className="img2">
                    <figure>
                        <a href={link2} target="_blank" rel="noopener noreferrer">
                            <img src={link2} alt="Space IMG" />
                        </a>
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
