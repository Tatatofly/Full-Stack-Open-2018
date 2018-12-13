import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col} from 'react-bootstrap'

const Menu = (data) => (
  <div style={data.menuStyle}>
    <Link to='/' style={data.linkStyle}>anecdotes</Link> &nbsp;
    <Link to='/create' style={data.linkStyle}>create new</Link> &nbsp;
    <Link to='/about' style={data.linkStyle}>about</Link>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => 
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      )}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return(
  <div>
    <p><strong>{anecdote.content}</strong> by: {anecdote.author}</p>
    <p>Has {anecdote.votes} votes</p>
    <p>More info at: <a href={anecdote.info} target='blank'>{anecdote.info}</a></p><br />
  </div>
  )
}

const About = () => (
  <div>
    <Grid>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>
      <Row>
        <Col xs={12} md={8}>
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col xs={12} md={4}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/800px-Edsger_Wybe_Dijkstra.jpg" width={248} height={320} />
        </Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: `a new anecdote ${anecdote.content} created!`})
    setTimeout(() => {
      this.setState({ notification: ''})
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    const notificationStyle = {
      color: 'green',
      fontSize: 26,
      margin: 5,
      fontWeight: 'bold'
    }

    const menuStyle = {
      marin: 10,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 15,
      paddingBottom: 15,
      position: 'relative',
      backgroundColor: 'lightblue',
      fontSize: 28,
      width: 500
    }

    const linkStyle = {
      color: 'red',
      textDecoration: 'none',
      fontWeight: 'bold',
      backgroundColor: 'white',
      padding: 10
    }
    
    return (
      <div>
        <Router>
          <div class='container'>
            <h1>Software anecdotes</h1>
            <div>
              <Menu menuStyle={menuStyle} linkStyle={linkStyle}/>
            </div>
            <div style={notificationStyle}>
              {this.state.notification}
            </div>
            <div>
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew}/> } />
              <Route path="/about" render={() => <About /> } /><br />
              <Route exact path="/anecdotes/:id" render={({match}) =>
                <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
               />
            </div>
            <Route path="/" render={() => <Footer /> } />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
