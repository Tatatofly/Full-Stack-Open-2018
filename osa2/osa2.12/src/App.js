import React from 'react';
import axios from 'axios';
import Country from './components/Country'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [{
        name: ''
      }],
      filter: ''
    }
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value})
  }


  render() {
    return (
      <div>
        <div>
          find countries: <input value={this.state.filter} onChange={this.handleFilterChange}/>
        </div>
        <div>
          <p><Country countries={this.state.countries} filter={this.state.filter}/></p>
        </div>
      </div>
    )
  }
}

export default App