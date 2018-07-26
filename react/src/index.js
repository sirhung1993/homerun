import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './w3.css'

class Computer extends React.Component {
  render() {
    const divStyleRow = {
      width: '10%',
    }
    const isOn = this.props.isAvailable
    const status = isOn || isOn === 1 || isOn === "true"
    const name = this.props.computerName
    const isAvailable = status ? 'Available' : 'Unavailable'
    const altComment = `Computer ${name}: ${isAvailable} `
    const computerColor = 'w3-col w3-margin w3-row ' + (status ? ' w3-yellow ' : ' w3-green ')
    const textColor = " w3-center w3-xlarge " + (status ? ' w3-red ' : ' w3-text-black ')
    return (
      <div className={computerColor}  style={divStyleRow}>
        <div>
          <img  src="images/computer.png" alt={altComment} height="75" width="75"/>
        </div>
        <div className={textColor}>
          {name}
        </div>
      </div>
    )
  }
}

class ComputersRow extends React.Component {

  render() {
    const ComputerName= this.props.ComputerName.slice()
    const NotAvailable = this.props.NotAvailable
    const ArrComputer = ComputerName.map((val, index) => {
      return (
        <Computer 
          computerName={val ? val : NotAvailable}
          isAvailable={(val && val !== NotAvailable) ? true : false}
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
      ComputerStatus: {},
      MaxComputers: 39,
      NumberComputerOnARow: 5
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
          ComputerStatus: data.OK.ComputerStatus,
          MaxComputers: (data.OK.MaxComputers > 0) ? data.OK.MaxComputers : 39,
          NumberComputerOnARow: (data.OK.NumberComputerOnARow > 0) ? data.OK.NumberComputerOnARow : 5
        })
      ))
  }
  render() {
    const ComputerStatus = this.state.ComputerStatus
    const ComputerName = Object.keys(ComputerStatus)
    const NumAvai = ComputerName.length
    const MaxComputers = this.state.MaxComputers
    const NumberComputerOnARow = this.state.NumberComputerOnARow
    const NumberRow = Math.ceil(MaxComputers / NumberComputerOnARow)
    const NotOn = 'Unknown'

    for (var i = NumAvai; i < MaxComputers; i++) {
      ComputerName.push(NotOn)
    }
    const DisplayRows = () => {
      const Rows = []
      for(var i = 0; i < NumberRow; i++) {
        const Row = []
        for (var k =0; k < NumberComputerOnARow; k++) {
          Row.push(ComputerName.shift())
        }
        Rows.push(Row)
      }
      return Rows.map((row, index) => {
        return (
          <ComputersRow 
            ComputerName={row}
            NotAvailable={NotOn}
            key = {index}
          />
        )
      })
    }

    return (
      <div>
        {DisplayRows()}
      </div>
    )
  }
}
// ========================================

ReactDOM.render(
  <HomePage />,
  document.getElementById('root')
)