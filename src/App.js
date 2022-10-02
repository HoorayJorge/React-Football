import React, { Component } from 'react';
import './App.css';
import Scoreboard from './components/Scoreboard';
import * as moment from 'moment';


let start_date_string = moment().format('YYYYMMDD');
let end_date_string = moment().add(1, 'weeks').format('YYYYMMDD');

class App extends Component {

    URL = 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates='
    +start_date_string+'-'
    +end_date_string+'&limit=200';    

    state = {
        leagues: [
            { id: 2021, name: 'FBS' }
        ],
        schedule: [],
        selectedLeague: 'FBS'
    };

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
        "BTN"   : "Not Available",
        "NONE"  : "Not Available"
    };

    handleSelection = (id, name) => {
        this.fetchData(id, name);
    };

    componentDidMount(){
        this.updateTimer = setInterval(() => this.context.store.dispatch(this.fetchData(this.state.league.id, this.state.league.name)), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    fetchData(id, name) {

        fetch(this.URL)
            .then((response) => response.json())
            .then((response) => {
                const rows = [];
                response.events.map(
                    (item) => {

                        if(item.competitions[0].broadcasts[0] === undefined){
                            item.competitions[0].broadcasts = ([{"names": ["NONE"]}]);
                        };
                        
                        if(item.status.type.description === "Scheduled"){
                            item.status.heat = 0;
                        }else{
                            item.status.heat = (
                                100 - 
                                Math.abs(parseInt(item.competitions[0].competitors[0].score) - 
                                parseInt(item.competitions[0].competitors[1].score)
                            ));
                        }

                        return (
                            rows.push(
                                { logo: item.competitions[0].competitors[0].team.logo,
                                    abbreviation: item.competitions[0].competitors[0].team.abbreviation, 
                                    shortName: item.shortName, 
                                    clock: item.status.displayClock, 
                                    homeScore: item.competitions[0].competitors[0].score, 
                                    awayScore: item.competitions[0].competitors[1].score,
                                    network: item.competitions[0].broadcasts[0].names[0], 
                                    detail: item.status.type.description,
                                    heat:  item.status.heat,
                                    start: new Date(item.date).toLocaleString()
                                }
                            )
                        )
                    }
                )
                this.setState({ schedule: [...rows] })
        })
            
    }
    
    render() {
        
        const content = this.state.schedule;
        let table;

        if (content.length > 0) {
            table = <thead>
                <tr><td colSpan="11"><h3>{this.state.selectedLeague}</h3></td></tr>
                <tr><th className="position">Heat</th>
                <th className="team">Home Logo</th>
                <th className="shortname">Shortname</th>
                <th className="played">Clock</th>
                <th className="won">Home Score</th>
                <th className="draw">Away Score</th>
                <th className="lost">Network</th>
                <th className="lost">Status</th>
                <th className="lost">DirecTV Channel</th>
                <th className="lost">Start</th></tr>
                </thead>;
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
                            <button className="btn btn-primary mr-2 mt-2" key={league.id} onClick ={() => 
                                {this.handleSelection(league.id, league.name)}}>{league.name}</button>
                        ))}
                        </div>
                    </div>
                
                    <div className="table-responsive mt-5">
                        <table className="table">
                            {table}
                            <tbody>
                            {this.state.schedule.map(schedule => (
                                <Scoreboard
                                    key={schedule.heat}
                                    heat={schedule.heat}
                                    logo={schedule.logo}
                                    shortName={schedule.shortName}
                                    clock={schedule.clock}
                                    homeScore={schedule.homeScore}
                                    awayScore={schedule.awayScore}
                                    network={schedule.network}
                                    detail={schedule.detail}
                                    channel={this.channels[schedule.network]}
                                    start={schedule.start}
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
