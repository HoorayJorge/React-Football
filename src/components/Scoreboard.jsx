import React from 'react'


const Scoreboard = ({ heat, homeLogo, awayLogo, shortName, homeAbbreviation, awayAbbreviation, shortDetail, homeScore, awayScore, network, detail, channel}) => {
    return (
        <tr>
            <td>{heat}</td>
            <td>{shortName}</td>
            <td>{shortDetail}</td>
            <td className="badge-td">
                <img src={awayLogo} alt={homeAbbreviation} />
            </td>
            <td>{awayScore}</td>
            <td className="badge-td">
                <img src={homeLogo} alt={awayAbbreviation} />
            </td>
            <td>{homeScore}</td>
            <td>{network}</td>
            <td>{detail}</td>
            <td>{channel}</td>
        </tr>
    )
}

export default Scoreboard