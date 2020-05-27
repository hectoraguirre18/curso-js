import React, {useState} from 'react'

const Focos = () => {

    // Prendido: https://i.postimg.cc/tChsCykf/on.png
    // Apagado: https://i.postimg.cc/wTKtp3XL/off.png

    const [foco1, updateFoco1] = useState(false)
    const [foco2, updateFoco2] = useState(false)
    const [foco3, updateFoco3] = useState(false)
    const [foco4, updateFoco4] = useState(false)
    const [foco5, updateFoco5] = useState(false)
    const [foco6, updateFoco6] = useState(false)

    const focos = [null, foco1, foco2, foco3, foco4, foco5, foco6]

    const focoStyle = {
        'cursor': 'pointer',
        margin: '8px',
    }

    const textStyle = {
        'text-align': 'center',
    }

    const getImage = (i) => {
        return focos[i] ? "https://i.postimg.cc/tChsCykf/on.png" : "https://i.postimg.cc/wTKtp3XL/off.png"
    }

    return (
        <div>
            <table>
                <tr>
                    <td><img src={getImage(1)} alt="foco" width="128px" onClick={() => updateFoco1(foco => !foco)} style={focoStyle}/></td>
                    <td><img src={getImage(2)} alt="foco" width="128px" onClick={() => updateFoco2(foco => !foco)} style={focoStyle}/></td>
                    <td><img src={getImage(3)} alt="foco" width="128px" onClick={() => updateFoco3(foco => !foco)} style={focoStyle}/></td>
                    <td><img src={getImage(4)} alt="foco" width="128px" onClick={() => updateFoco4(foco => !foco)} style={focoStyle}/></td>
                    <td><img src={getImage(5)} alt="foco" width="128px" onClick={() => updateFoco5(foco => !foco)} style={focoStyle}/></td>
                    <td><img src={getImage(6)} alt="foco" width="128px" onClick={() => updateFoco6(foco => !foco)} style={focoStyle}/></td>
                </tr>
                <tr>
                    <td style={textStyle}>Foco 1:<br/>Sala</td>
                    <td style={textStyle}>Foco 2:<br/>Comedor</td>
                    <td style={textStyle}>Foco 3:<br/>Cocina</td>
                    <td style={textStyle}>Foco 4:<br/>Estancia</td>
                    <td style={textStyle}>Foco 5:<br/>Recamara<br/>principal</td>
                    <td style={textStyle}>Foco 6:<br/>Recamara<br/>de los niños</td>
                </tr>
            </table>
        </div>
    )
}

export default Focos
