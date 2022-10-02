import React, { Component } from 'react';
import './App.css';
import Scoreboard from './components/Standings';

class App extends Component {

    URL = 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates=20220930-20221001&limit=200';

    state = {
        leagues: [
            { id: 2021, name: 'FBS' }
        ],
        standings: [],
        selectedLeague: 'FBS'
    }

    channels = {
        "ESPN"  : 206,
        "ESPN2" : 209,
        "ESPN3" : "Streaming",
        "ESPNU" : 208,
        "FS1"   : 219,
        "FS2"   : 618,
        "ESPN+" : "Streaming",
        "ACCN"  : 612,
        "CBSSN" : 221,
        "CBS"   : "Local",
        "FOX"   : "Local",
        "ABC"   : "Local",
        "NBC"   : "Local",
        "SECN"  : 611,
        "NFL NET": 212,
        "PAC12" : "Not Available",
        "BTN"   : "Not Available"
    }

    handleSelection = (id, name) => {
        this.fetchData(id, name);
    };

    fetchData(id, name) {

        fetch(this.URL)
            .then((response) => response.json())
            .then((response) => {
                const rows = [];
                response.events.map(
                    (item, index) => {
                        const { logo, abbreviation, hometeam, shortName, clock, homeScore, awayScore, network, detail, heat} = item;

                        if(response.events[index].competitions[0].broadcasts[0] === undefined){
                            response.events[index].competitions[0].broadcasts = ([{"names": ["NONE"]}]);
                        };
                        
                        response.events[index].status.heat = (100 - Math.abs(
                            parseInt(response.events[index].competitions[0].competitors[0].score) - parseInt(response.events[index].competitions[0].competitors[1].score)
                        ));

                        return (
                            rows.push(
                                { logo: response.events[index].competitions[0].competitors[0].team.logo,
                                    abbreviation: response.events[index].competitions[0].competitors[0].team.abbreviation, 
                                    shortName: shortName, 
                                    clock: response.events[index].status.displayClock, 
                                    homeScore: response.events[index].competitions[0].competitors[0].score, 
                                    awayScore: response.events[index].competitions[0].competitors[1].score,
                                    network: response.events[index].competitions[0].broadcasts[0].names[0], 
                                    detail: response.events[index].status.type.description,
                                    heat:  response.events[index].status.heat
                                }
                            )
                        )
                    }
                )
                this.setState({ standings: [...rows] })
        })
            
    }
    
    render() {
        
        const content = this.state.standings;
        let table;

        if (content.length > 0) {
            table = <thead><tr><td colSpan="9"><h3>{this.state.selectedLeague}</h3></td></tr><tr><th className="position">Heat</th><th className="team">Home Logo</th><th className="shortname">Shortname</th><th className="played">Clock</th><th className="won">Home Score</th><th className="draw">Away Score</th><th className="lost">Network</th><th className="lost">Status</th><th className="lost">DirecTV Channel</th></tr></thead>;
        }

        content.sort(function(a,b){
            return b.heat - a.heat
        });

        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center mt-2">
                        {this.state.leagues.map(league => (
                            <button className="btn btn-primary mr-2 mt-2" key={league.id} onClick={() => {this.handleSelection(league.id, league.name)}}>{league.name}</button>
                        ))}
                        </div>
                    </div>
                
                    <div className="table-responsive mt-5">
                        <table className="table">
                            {table}
                            <tbody>
                            {this.state.standings.map(standing => (
                                <Scoreboard
                                    key={standing.heat}
                                    heat={standing.heat}
                                    logo={standing.logo}
                                    shortName={standing.shortName}
                                    clock={standing.clock}
                                    homeScore={standing.homeScore}
                                    awayScore={standing.awayScore}
                                    network={standing.network}
                                    detail={standing.detail}
                                    channel={this.channels[standing.network]}
                                >   
                                </Scoreboard>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
