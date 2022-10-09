import React from "react";
import { CirclesWithBar} from  'react-loader-spinner'


export default function Spinner() {
    return (
        <CirclesWithBar
        height="100"
        width="100"
        color="#fdd96c"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel='circles-with-bar-loading'
        />
    );
}