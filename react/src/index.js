import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './w3.css'

class Computer extends React.Component {
  render() {
    const divStyleRow = {
      width: '20%',
    }
    const status = this.props.isAvailable === 1 || this.props.isAvailable === "true"
    const name = this.props.computerName
    const isAvailable = status ? 'Available' : 'Unavailable'
    const altComment = `Computer ${name}: ${isAvailable} `
    const computerColor = 'w3-col w3-margin w3-row ' + (status ? ' w3-green ' : ' w3-grey ')
    return (
      <div className={computerColor}  style={divStyleRow}>
        <div>
          <img  src="images/computer.png" alt={altComment} height="75" width="75"/>
        </div>
        <div className="w3-center w3-xlarge">
          {name}
        </div>
      </div>
    )
  }
}

class ComputersRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ComputerStatus: {}
    }
  }

  componentDidMount() {
    setInterval(() => this.getComputerStatus(), 5000)
  }

  getComputerStatus() {
    // Get the passwords and store them in state
    fetch('/info/getstatus')
      .then(res => res.json())
      .then(data => (
        this.setState({
          ComputerStatus: data.OK.ComputerStatus
        })
      ))
  }

  render() {
    const ComputerStatus= this.state.ComputerStatus
    const ComputerName = Object.keys(ComputerStatus).sort()

    const ArrComputer = ComputerName.map((val, index) => {
      return (
        <Computer 
          computerName={val}
          isAvailable={ComputerStatus[val]}
          key={index}
        />
      )
    })
    return(
      <div className="w3-row">
        {ArrComputer}
      </div>
    )
  }
}
class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ComputerStatus: {}
    }
  }

  componentDidMount() {
    setInterval(() => this.getComputerStatus(), 60000)
  }

  getComputerStatus() {
    // Get the passwords and store them in state
    fetch('/info/getstatus')
      .then(res => res.json())
      .then(data => (
        this.setState({
          ComputerStatus: data.OK.ComputerStatus
        })
      ))
  }
  render() {
    const 
    return (
      <div>

      </div>
    )
  }
}
// ========================================

ReactDOM.render(
  <ComputersRow />,
  document.getElementById('root')
)
