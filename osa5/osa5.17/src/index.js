import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const storeNow = store.getState()
  const palautteita = storeNow.good + storeNow.ok + storeNow.bad

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{storeNow.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{storeNow.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{storeNow.bad}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{((storeNow.good * 100)/palautteita).toFixed(1)}%</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  const storeNow = store.getState()
  console.log(storeNow)
}

render()
store.subscribe(render)