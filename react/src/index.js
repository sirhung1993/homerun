import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './w3.css'

const RefreshTimeInSecond = 5

class Computer extends React.Component {
  render() {
    const divStyleRow = {
      width: '15%',
    }
    const isOn = this.props.isAvailable
    const status = isOn || isOn === 1 || isOn === "true"
    const name = this.props.computerName
    const isAvailable = status ? 'Available' : 'Unavailable'
    const altComment = `Computer ${name}: ${isAvailable} `
    const computerColor = 'w3-col computer-margin computer-padding w3-row w3-center ' + (status ? ' w3-yellow ' : ' w3-green ')
    const textColor = ' w3-center computer-name ' + (status ? ' w3-red w3-text-black' : ' w3-text-black ')
    const styleText = {
      fontSize: '2vw',
    }
    return (
        <div className={computerColor}  style={divStyleRow}>
          <div>
            <img  src="images/computer.png" alt={altComment} className=" auto "/>
          </div>
          <div className={textColor}>
            {name}
           </div>
        </div>
    )
  }
}

class Banner extends React.Component {
  render(){
    return(
      <div className="w3-conainer">
        <a href="https://www.facebook.com/homerundienbien" target="_blank" rel="noopener noreferrer">
          <img 
            src="images/homerunlogo.png" 
            alt="homerun logo" 
            className = " auto-banner "
          />
        </a>
      </div>
    )
  }
}
class ComputersRow extends React.Component {
  render() {
    const divSideCol = {
      width: '12.5%'
    }
    const ComputerStatus= this.props.ComputerName.slice()
    const ArrComputer = ComputerStatus.map((val, index) => {
      const computerName = Object.keys(val).shift()
      const status = val[computerName]
      if (computerName ===  'undefined') {
        return null
      }
      return (
        <Computer 
          computerName={computerName}
          isAvailable={status}
          key={index}
        />
      )
    })
    return(
      <div className="w3-row">
        <div className="w3-col" style={divSideCol}>
          <p> </p>
        </div>
        {ArrComputer}
        <div className="w3-col" style={divSideCol}>
          <p> </p>
        </div>
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
    this.getComputerStatus()
    setInterval(() => this.getComputerStatus(), RefreshTimeInSecond*1000)
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
    const ComputerStatus = Object.assign(this.state.ComputerStatus)
    // const NumberFromComputerName = Object.keys(ComputerStatus)
    //   .map((ele) => {
    //     return parseInt(ele.match(/\d+/))
    //   }).sort((a,b) => {return a - b})
    // console.log(NumberFromComputerName)
                        
    const ComputerName = Object.keys(ComputerStatus).sort()
    // .sort((a, b) => {
    //   if (a.length === b.length) {
    //     return a > b
    //   } else if (a.length > b.length) {
    //     return a < b
    //   } else {
    //     return a > b
    //   }
    // })
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
          const tempName = ComputerName.shift()
          const obj = {}
          obj[tempName] = ComputerStatus[tempName]
          Row.push(obj)
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
        <Banner />
        <div>
          {DisplayRows()}
        </div>
      </div>
    )
  }
}
// ========================================

ReactDOM.render(
  <HomePage />,
  document.getElementById('root')
)
