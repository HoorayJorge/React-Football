import React from 'react'


const Scoreboard = ({ heat, homeLogo, awayLogo, shortName, homeAbbreviation, awayAbbreviation, clock, homeScore, awayScore, network, detail, channel, start }) => {
    return (
        <tr>
            <td>{heat}</td>
            <td className="badge-td">
                <img src={awayLogo} alt={homeAbbreviation} />
            </td>
            <td className="badge-td">
                <img src={homeLogo} alt={awayAbbreviation} />
            </td>
            <td>{shortName}</td>
            <td>{clock}</td>
            <td>{awayScore}</td>
            <td>{homeScore}</td>
            <td>{network}</td>
            <td>{detail}</td>
            <td>{channel}</td>
            <td>{start}</td>
        </tr>
    )
}

export default Scoreboard