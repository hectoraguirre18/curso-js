import React, { Fragment, useState } from 'react'

const Event = () => {
    const [text,setText] = useState('Este es el texto que va a cambiar')

    const changeText = () => {
        setText('Ya cambió el texto!')
    }

    return (
        <Fragment>
            <h2>{ text }</h2>
            <button onClick={ changeText }>Cambiar texto</button>
        </Fragment>
    )
}

export default Event