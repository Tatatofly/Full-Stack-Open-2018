import React from 'react'

const Country = ({ countries, filter, clickHandler }) => {
    const req = new RegExp(filter, 'i');
    const filthCountries = countries.filter(countries => countries.name.match(req))
    let returNode = ''
    if(filthCountries.length > 10) {
        returNode = 'too many matches, specify another filter'
    } else if (filthCountries.length > 1) {
        returNode = filthCountries.map(country => <div key={country.name} id={country.name} onClick={clickHandler}>{country.name}</div>)
    } else if (filthCountries.length === 1) {
        returNode = <div><h2>{filthCountries[0].name}</h2> capital: {filthCountries[0].capital}<br />population: {filthCountries[0].population}<br /><img src={filthCountries[0].flag} width={250} alt={filthCountries[0].name}/></div>
    } else {
        returNode = 'no matches'
    }

  return (
    returNode
  )
}

export default Country