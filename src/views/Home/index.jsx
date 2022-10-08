import React, { useEffect, useState } from 'react';
import Scoreboard from '../../components/Scoreboard';
import * as moment from 'moment';
import axios from 'axios'
import Helmet from 'react-helmet'
import { Table } from 'react-bootstrap'
import { URL, channels } from '../../constants'



export function App() {
    const [schedule, setSchedule] = useState([])
    const [leagues, setLeagues] = useState([{ id: 2021, name: 'FBS' }])
    const [selectedLeague, setSelectedLeague] = useState('FBS')



    const fetchData = async (id, name) => {
        const { data } = await axios.get(URL(id, name))
        const rows = []

        data.events.map(item => {

            if (item.competitions[0].broadcasts[0] === undefined) {
                item.competitions[0].broadcasts = ([{ "names": ["NONE"] }]);
            }

            if (item.status.type.description === "Scheduled") {
                item.status.heat = 0;
            }

            else if (item.status.type.description === "Final") {
            item.status.heat = 1;
            }

            else {
                item.status.heat = (
                    100 -
                    Math.abs(parseInt(item.competitions[0].competitors[0].score) -
                        parseInt(item.competitions[0].competitors[1].score)
                    ));
            }

            item.status.displayClock = item.status.displayClock+" - Q"+item.status.period;

            return rows.push(
                {
                    awayLogo: item.competitions[0].competitors[1].team.logo,
                    homeLogo: item.competitions[0].competitors[0].team.logo,
                    homeAbbreviation: item.competitions[0].competitors[0].team.abbreviation,
                    awayAbbreviation: item.competitions[0].competitors[1].team.abbreviation,
                    shortName: item.shortName,
                    clock: item.status.displayClock,
                    homeScore: item.competitions[0].competitors[0].score,
                    awayScore: item.competitions[0].competitors[1].score,
                    network: item.competitions[0].broadcasts[0].names[0],
                    detail: item.status.type.description,
                    heat: item.status.heat,
                    start: moment(item.date).format('YYYY-MM-DD - hh-mm A')
                }
            )
        })

        setSchedule(rows)
    }


    const handleSelection = (id, name) => {
        fetchData(id, name);
    }

    useEffect(() => {
        fetchData()

        const fetchInterval = setInterval(() => {
            fetchData()

            //replace 0.5 with how many minutes
        }, 0.5 * 1000 * 60);


        return () => clearInterval(fetchInterval);
    }, [])


    return (
        <div className="App">

            <Helmet>
                <meta name="description" content="Garlicoin Sports CFB Matchup Heat Index" />
                <title>Garlicoin Sports</title>
            </Helmet>


            <div className="container py-5">
                <h2 className='text-center mb-5'>CFB Matchup Heat Index</h2>

                <Table className='border shadow-sm' responsive hover>
                    <thead className='bg-light'>
                        <tr>
                            <th className="position">Heat</th>
                            <th className="team">Away Logo</th>
                            <th className="team">Home Logo</th>
                            <th className="shortname">Shortname</th>
                            <th className="played">Clock</th>
                            <th className="won">Away Score</th>
                            <th className="draw">Home Score</th>
                            <th className="lost">Network</th>
                            <th className="lost">Status</th>
                            <th className="lost">DirecTV Channel</th>
                            <th className="lost">Start</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            schedule
                                ?.sort((a, b) => b.heat - a.heat)
                                ?.map((schedule, key) => (
                                    <Scoreboard
                                        key={key}
                                        {...schedule}
                                        channel={channels[schedule.network]}
                                    >
                                    </Scoreboard>
                                ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )

}


export default App;
