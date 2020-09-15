import React, { useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import TweetEmbed from 'react-tweet-embed';
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

    const [searchError, setSearchError] = useState(false);
    const [filterError, setFilterError] = useState(false);

    const [link, setLink] = useState("");          // NASA img LHS
    const [caption, setCaption] = useState("");    // NASA caption LHS
    const [link2, setLink2] = useState("");        // NASA img RHS
    const [caption2, setCaption2] = useState("");  // NASA caption RHS

    const [rowData, setRowData] = useState([]);    // planet data table LHS
    const [rowData2, setRowData2] = useState([]);   // planet data table RHS

    // 1225902606607945738 is a tweet made by twitter saying "Test"
    const [tweetOneID, setTweetOneID] = useState("1225902606607945738");    // LHS tweet data
    const [tweetTwoID, setTweetTwoID] = useState("1225902606607945738");     // RHS tweet data

    // get data from backend, display on LHS
    const callAPI = async () => {
        try {
            if (text === "" || !isNaN(text)) throw Error
            setSearchLoading(true);   // data is loading
            let url = `/api?planet=${text}`;
            fetch(url)
                .then(res => res.json())
                .then(imgData => {
                    setLink(imgData.data[0].link);
                    setCaption(imgData.data[0].title);
                    setRowData(imgData.data[1]);
                    setTweetOneID(imgData.data[2].id);
                    setSearchLoading(false);  // data is loaded
                })
                .catch(err => console.log(err));
        } catch (e) {
            setSearchLoading(false);

            // display error msg for 1.5 seconds
            setSearchError(true);
            await new Promise(r => setTimeout(r, 1500));
            setSearchError(false);
        }
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
                setTweetTwoID(queriedData.data[2].id);
                setButtonLoading(false);  // data loaded
            })
            .catch(err => console.log(err))
    }

    /**
     * Function to be called when user hits one of the buttons for filtering the data. 
     * This function fetch's from different routes, depending on which planet attribute
     * is requested and which filter mode.
     * @param {String} attribute The planet data being filtered (e.g. gravity, radius, etc.)
     * @param {String} mode How the data is being filtered ("similar" or "different")
     */
    const filter = async (attribute, mode) => {
        try {
            setButtonLoading(true);
            let currentValue = rowData[0][attribute];
            let currentPlanet = rowData[0].name;
            let url = `/api/${attribute}?${attribute}=${currentValue}&planet=${currentPlanet}&filter=${mode}`;
            fetch(url)
                .then(res => res.json())
                .then(planetName => displayFilteredData(planetName))
                .catch(e => console.log(e))
        } catch (err) {
            setButtonLoading(false);

            // display error msg for 1.5 seconds
            setFilterError(true);
            await new Promise(r => setTimeout(r, 1500));
            setFilterError(false);
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
                <h6 className="searchErrorMsg">{searchError ? "ERROR: ENTER A PLANET" : " "}</h6>


                <h5 style={{ position: "absolute", top: "-20px", right: "510px" }}>Most Similar By:</h5>
                <div className="filterSimilar">
                    <button style={{ background: "white" }} onClick={() => filter("gravity", "similar")}>Gravity</button>{' '}
                    <button style={{ background: "white" }} onClick={() => filter("escape", "similar")}>Escape</button>{' '}
                    <button style={{ background: "white" }} onClick={() => filter("radius", "similar")}>Radius</button>{' '}
                    <button style={{ background: "white" }} onClick={() => filter("density", "similar")}>Density</button>{' '}
                </div>
                <h6 className="buttonLoading">{buttonLoading ? "LOADING..." : " "}</h6>

                <h5 style={{ position: "absolute", top: "20px", right: "489px" }}>Most Different By:</h5>
                <div className="filterDifferent">
                    <button style={{ background: "white" }} onClick={() => filter("gravity", "different")}>Gravity</button>{' '}
                    <button style={{ background: "white" }} onClick={() => filter("escape", "different")}>Escape</button>{' '}
                    <button style={{ background: "white" }} onClick={() => filter("radius", "different")}>Radius</button>{' '}
                    <button style={{ background: "white" }} onClick={() => filter("density", "different")}>Density</button>{' '}
                </div>
                <h6 className="buttonLoading">{buttonLoading ? "LOADING..." : " "}</h6>
                <h6 className="btnErrorMsg">{filterError ? "ERROR: NO PRIOR DATA" : " "}</h6>


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


                <div className="tweet1">
                    <TweetEmbed id={tweetOneID} />
                </div>

                <div className="tweet2">
                    <TweetEmbed id={tweetTwoID} />
                </div>

            </header>
        </div >
    );
}

export default App;
