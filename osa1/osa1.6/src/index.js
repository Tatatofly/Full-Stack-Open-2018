import React from 'react'
import ReactDOM from 'react-dom'

const otsikko = "Anna palautetta"
const alaotsikko = "Statistiikka"

const painikkeet = [
    {
        text: "Hyvä"
    },
    {
        text: "Neutraali"
    },
    {
        text: "Huono"
    }
]

const Title = ({text}) => (<div><h1>{text}</h1></div>)

const Button = ({ handleClick, text}) => ( <button onClick={handleClick}>{text}</button>)

const Statistic = ({ text, counter}) => ( <div><p>{text} {counter}</p></div>)

const Statistics = ({hyva, neutraali, huono}) => {
    return (
        <div>
            <Statistic text={painikkeet[0].text} counter={hyva} />
            <Statistic text={painikkeet[1].text} counter={neutraali} />
            <Statistic text={painikkeet[2].text} counter={huono} />
        </div>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyv: 0,
            neutrl: 0,
            eihyv: 0
        }
    }

    lisaaPalaute = (arvo, vote) => {
        return () => {
            if(vote === 1){
                this.setState({hyv: arvo})
            } else if (vote === 2){
                this.setState({neutrl: arvo})
            } else if (vote === 3){
                this.setState({eihyv: arvo})
            } else {
                console.log("Error: ", arvo)
            }
        }
    }

    render() {
        return (
            <div>
                <Title text={otsikko} />
                <div>
                    <Button handleClick={this.lisaaPalaute(this.state.hyv + 1, 1)} text={painikkeet[0].text} />
                    <Button handleClick={this.lisaaPalaute(this.state.neutrl + 1, 2)} text={painikkeet[1].text} />
                    <Button handleClick={this.lisaaPalaute(this.state.eihyv + 1, 3)} text={painikkeet[2].text} />
                </div>
                <Title text={alaotsikko} />
                <Statistics hyva={this.state.hyv} neutraali={this.state.neutrl} huono={this.state.eihyv} />
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)