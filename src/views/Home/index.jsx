import React, { useEffect, useState } from 'react';
import Scoreboard from '../../components/Scoreboard';
import axios from 'axios'
import Helmet from 'react-helmet'
import { Table } from 'react-bootstrap'
import { URL, channels } from '../../constants'
import Spinner from '../../components/Spinner';
import CryptoCard from '../../components/CryptoCard';


export function App() {

    const [schedule, setSchedule] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        const { data } = await axios.get(URL())
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

                switch(item.status.period) {
                    case 1:
                        item.status.heat = item.status.heat * 0.9;
                        break;
                    case 2:
                        item.status.heat = item.status.heat * 0.95
                        break;
                    case 3:
                        item.status.heat = item.status.heat * 0.98
                        break;
                    default:
                
                }
            }


            return rows.push(
                {
                    awayLogo: item.competitions[0].competitors[1].team.logo,
                    homeLogo: item.competitions[0].competitors[0].team.logo,
                    homeAbbreviation: item.competitions[0].competitors[0].team.abbreviation,
                    awayAbbreviation: item.competitions[0].competitors[1].team.abbreviation,
                    shortName: item.shortName,
                    homeScore: item.competitions[0].competitors[0].score,
                    awayScore: item.competitions[0].competitors[1].score,
                    network: item.competitions[0].broadcasts[0].names[0],
                    detail: item.status.type.description,
                    heat: item.status.heat.toFixed(2),
                    shortDetail: item.status.type.shortDetail,
                }
            )
        })

        setSchedule(rows)
    }


    useEffect(() => {
        fetchData().then(setIsLoading(false))

        const fetchInterval = setInterval(() => {
            fetchData()

            //replace 0.5 with how many minutes
        }, 0.5 * 1000 * 60);


        return () => clearInterval(fetchInterval);
    }, [])

    const renderScoreboard = (

        <Table className='border shadow-sm' responsive hover>
            <thead className='bg-light'>
                <tr>
                    <th className="position">Heat</th>
                    <th className="shortname">Shortname</th>
                    <th className="played">Clock</th>
                    <th className="team">Away Logo</th>
                    <th className="won">Away Score</th>
                    <th className="team">Home Logo</th>
                    <th className="draw">Home Score</th>
                    <th className="lost">Network</th>
                    <th className="lost">Status</th>
                    <th className="lost">DirecTV Channel</th>
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
    )


    return (
        <div className="App">

            <Helmet>
                <meta name="description" content="Garlicoin Sports CFB Matchup Heat Index" />
                <title>Garlicoin Sports</title>
            </Helmet>

            <div className="container py-5">
                <h2 className='text-center mb-5'>CFB Matchup Heat Index</h2>
                    {isLoading ? <Spinner /> : renderScoreboard}
            </div>

            <CryptoCard />
        </div>
    )

}

export default App;
