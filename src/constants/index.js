import * as moment from 'moment'


const startDateString = moment().format('YYYYMMDD');
const endDateString = moment().add(1, 'weeks').format('YYYYMMDD');



export const URL = (id, name) => {
    return `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates=${startDateString}-${endDateString}&limit=200`
}


export const gitRepoUrl = 'https://github.com/HoorayJorge/garlicoin-sports'




export const channels = {
    "ESPN": 206,
    "ESPN2": 209,
    "ESPN3": "Streaming",
    "ESPNU": 208,
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