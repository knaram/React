import React from 'react';


function Today(props) {
    const date = new Date().toDateString();
    return ( 
        <div className='today'>
            <p>Today</p>
            <p className='date'>{date}</p>
        </div>
     );
}

export default Today;