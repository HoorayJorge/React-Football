import React from 'react'


const Scoreboard = ({ heat, logo, shortName, abbreviation, clock, homeScore, awayScore, network, detail, channel, start }) => {
    return (
        <tr>
            <td>{heat}</td>
            <td className="badge-td">
                <img src={logo} alt={abbreviation} />
            </td>
            <td>{shortName}</td>
            <td>{clock}</td>
            <td>{homeScore}</td>
            <td>{awayScore}</td>
            <td>{network}</td>
            <td>{detail}</td>
            <td>{channel}</td>
            <td>{start}</td>
        </tr>
    )
}

export default Scoreboard