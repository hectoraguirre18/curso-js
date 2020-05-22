import React, {useState} from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Haz marcado que tienes {count} años</p>
            <p>Eres {count < 18 ? 'Menor de edad' : 'Mayor de edad'}</p>
            <button onClick={() => setCount(count+1)}>Añadir un año</button>
        </div>
    )
}

export default Counter