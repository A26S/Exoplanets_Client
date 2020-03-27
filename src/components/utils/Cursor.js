import React, { useEffect, useState } from 'react'

const Cursor = () => {

    const [loadComplete, setLoadComplete] = useState(false)

    useEffect(() => {
        document.addEventListener('mousemove', followCursor)
    })

    const followCursor = (e) => {
        setLoadComplete(true)
        const cursor = document.querySelector('.cursor')
        cursor.setAttribute('style',
        `top: ${e.pageY}px;
        left: ${e.pageX}px;`)
    }
    
    return (
        <React.Fragment>
            {loadComplete && 
                <div className="cursor" onLoad={followCursor}/>
            }
        </React.Fragment>
    ) 
}

export default Cursor
