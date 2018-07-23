import React from 'react'

const Otsikko = (props) => {
    return (
        <div><h1>{props.otsikko}</h1></div>
    )
}

const Osa = (props) => {
    return (
        <div><p>{props.osa} {props.tehtavia}</p></div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Otsikko otsikko={props.kurssi.nimi} /> 
            {props.kurssi.osat.map(osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia}/>)}
            <Yhteensa tehtavat={Laske(props.kurssi.osat)} /> 
        </div>
    )
}

const Laske = (tehtavat) => {
    const tehtavatArray = tehtavat.map(tehtava => tehtava.tehtavia)
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const tulos = tehtavatArray.reduce(reducer)
    return tulos
}

const Yhteensa = (props) => {
    return (
        <div><p>yhteensä {props.tehtavat} tehtävää</p></div>
    )
}

const Kurssi = ({kurssit}) => {
    return (
        <div>
        {kurssit.map(kurssi => <Sisalto key={kurssi.id} kurssi={kurssi}/>)}
        </div>
      )
}

export default Kurssi