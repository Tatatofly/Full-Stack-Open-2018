import React from 'react';
import Person from './components/Person'
import Formula from './components/Formula'
import personsService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
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
      //const names = this.state.persons.concat(persoName)
      personsService
      .create(persoName)
      .then(response => {
        console.log(response)
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNumber: ''
        })
      })
    } else {
      this.setState({
        newName: '',
        newNumber: ''
      })
      alert('duplicate content!')
    }
  }

  deleteName = (id) => {
    console.log('Try Deleting...')
    const delPerson = this.state.persons.find(pers => pers.id === id)
    if (window.confirm(`Poistetaanko henkilö ${delPerson.name}`)) { // window.confirm(`Poistetaanko henkilö ${delPerson.name}`)
      console.log('Deleting...')
      personsService
      .destroy(id)
      .then(response => {
        console.log(response)
        this.setState({
          persons: this.state.persons.filter(pers => pers.id !== id),
          newName: '',
          newNumber: ''
        })
      })
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
        <Formula newName={this.state.newName} newNumber={this.state.newNumber} addName={this.addName} handleNameChange={this.handleNameChange} handleNumberChange={this.handleNumberChange}/>
        <h2>Numerot</h2>
        <ul>
          <Person persons={this.state.persons} filter={this.state.filter} deleteName={this.deleteName}/>
        </ul>
      </div>
    )
  }
}

export default App