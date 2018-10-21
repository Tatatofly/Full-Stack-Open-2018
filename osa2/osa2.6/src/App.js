import React from 'react';
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value})
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value})
  }

  addName = (event) => {
    event.preventDefault()
    const nameCheck = this.state.newName
    const findRes = this.state.persons.find(function(pers){
      if(pers.name === nameCheck){
        return true
      } else {
        return false
      }
    })
    if(!findRes) {
      const persoName = { name: this.state.newName, number: this.state.newNumber}
      const names = this.state.persons.concat(persoName)
  
      this.setState({
        persons: names,
        newName: '',
        newNumber: ''
      })
    } else {
      this.setState({
        newName: '',
        newNumber: ''
      })
      alert('duplicate content!')
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
            rajaa näytettäviä <input value={this.state.filter} onChange={this.handleFilterChange}/>
          </div>
        <h3>Lisää uusi:</h3>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          <Person persons={this.state.persons} filter={this.state.filter}/>
        </ul>
      </div>
    )
  }
}

export default App