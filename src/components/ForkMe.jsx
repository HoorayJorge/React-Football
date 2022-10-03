import React from 'react'
import {gitRepoUrl} from '../constants'

const ForkMe = () => {
    return (
        <div id="forkongithub">
            <a className='shadow-sm' href={gitRepoUrl} target='_blank'>Fork me on GitHub</a>
        </div>
    )
}


export default ForkMe