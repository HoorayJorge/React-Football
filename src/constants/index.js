import * as moment from 'moment'

//Dates
const startDateString = moment().subtract(1, 'days').format('YYYYMMDD');
const endDateString = moment().add(1, 'weeks').format('YYYYMMDD');

//API Address
export const URL = () => {
    return `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates=${startDateString}-${endDateString}&limit=200`
}

//Git Repository
export const gitRepoUrl = 'https://github.com/HoorayJorge/garlicoin-sports'

//DirecTV Channels
export const channels = {
    "ESPN": 206,
    "ESPN2": 209,
    "ESPN3": "Streaming",
    "ESPNU": 208,
    "ESPNN": 207,
    "FS1": 219,
    "FS2": 618,
    "ESPN+": "Streaming",
    "ACCN": 612,
    "CBSSN": 221,
    "CBS": "Local",
    "FOX": "Local",
    "ABC": "Local",
    "NBC": "Local",
    "SECN": 611,
    "NFL NET": 212,
    "PAC12": "Not Available",
    "BTN": "Not Available",
    "NONE": "Not Available"
}
