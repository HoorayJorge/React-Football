import React, { Component } from 'react';

class Scoreboard extends Component {

    render() {

        return(
            <tr>
                <td>{this.props.heat}</td>
                <td className="badge-td">
                    <div className="badge">
                        <img src={this.props.logo} alt={this.props.abbreviation} />
                    </div>
                </td>
                <td>{this.props.shortName}</td>
                <td>{this.props.clock}</td>
                <td>{this.props.homeScore}</td>
                <td>{this.props.awayScore}</td>
                <td>{this.props.network}</td>
                <td>{this.props.detail}</td>
                <td>{this.props.channel}</td>
                <td>{this.props.start}</td>
            </tr>
        )
    }
};

export default Scoreboard;