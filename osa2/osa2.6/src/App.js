import React from 'react';
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value})
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
      const persoName = { name: this.state.newName }
      const names = this.state.persons.concat(persoName)
  
      this.setState({
        persons: names,
        newName: ''
      })
    } else {
      this.setState({
        newName: ''
      })
      alert('duplicate content!')
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => <Person key={person.name} person={person}/>)}
        </ul>
      </div>
    )
  }
}

export default App