import React from 'react'
import ReactDOM from 'react-dom'

import './index.less'

function random(min, max) {
  return min +  Math.floor(Math.random() * (max - min))
}

function randomPosition() {
  return {
    x: random(0, window.innerWidth),
    y: random(0, window.innerHeight)
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offsetX: 0,
      offsetY: 0,
      positions:  [...Array(500).keys()].map(index => randomPosition())
    }
    this.startPosition = null
  }
  componentDidMount() {
    document.querySelector('body').onmousemove = (event) => {
      const positionX = event.clientX
      const positionY = event.clientY
      if (!this.startPosition) {
        this.startPosition = {
          positionX,
          positionY
        }
        return 
      }
      this.setState({
        offsetX: positionX - this.startPosition.positionX,
        offsetY: positionY - this.startPosition.positionY
      })
    }
  }
  render() {
    const {offsetX, offsetY, positions} = this.state
    return <div>
      {
        positions.map((position, index) => {
          return (
            <div 
              style={{
                left: position.x + offsetX, 
                top: position.y + offsetY
              }} 
              className="box" 
              key={index}>
            </div>
          )
        })
      }
    </div>
  }
}

ReactDOM.render(<App ></App>, document.querySelector('body'))