import React from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text}) => ( <button onClick={handleClick}>{text}</button>)

const Title = ({text}) => (<div><h2>{text}</h2></div>)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      mostVotes: 0
    }
  }

    getRandomAnecdote = () => {
        return () => {
            const randomNum = Math.floor(Math.random() * anecdotes.length) + 0  
            console.log("Generated: ", randomNum)
            this.setState({selected: randomNum})
        }
    }

    voteAnecdote = (anec, most) => {
        return () => {
            anecPoints[anec] += 1
            console.log("Voted: ", anec)
            if(anecPoints[most] < anecPoints[anec] && anec !== most){
                this.setState({mostVotes: anec})
            } else {
                this.setState({selected: anec})
            }
        }
    }

  render() {
    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p>has {anecPoints[this.state.selected]} votes</p>
        <Button handleClick={this.voteAnecdote(this.state.selected, this.state.mostVotes)} text={"Vote"} />
        <Button handleClick={this.getRandomAnecdote()} text={"Next Anecdote"} />
        <Title text={otsikko} />
        <p>{this.props.anecdotes[this.state.mostVotes]}</p>
        <p>has {anecPoints[this.state.mostVotes]} votes</p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const anecPoints = [0, 0, 0, 0, 0, 0]

const otsikko = "Anecdote with most votes:"

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)