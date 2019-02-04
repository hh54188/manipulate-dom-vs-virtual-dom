import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, combineReducers } from "redux";

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

function position(initalState = { 
  offsetX: 0,
  offsetY: 0,
  positions:  [...Array(1000).keys()].map(index => randomPosition()) 
}, action) {
  const payload = action.payload
  switch (action.type) {
    case 'update':
      return Object.assign({}, initalState, {
        ...payload
      });
      break;
    default:
      return initalState;
  }
}

const store = createStore(
  combineReducers({
    position
  })
);

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {update} = this.props
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
      update({
        offsetX: positionX - this.startPosition.positionX,
        offsetY: positionY - this.startPosition.positionY
      })
    }
  }
  render() {
    const {offsetX, offsetY, positions} = this.props
    return (
      <div>
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
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.position
  };
}

function mapDispatchToProps(dispatch) {
  return {
    update: (payload) => {
      dispatch({
        type: 'update',
        payload,
      })
    }
  };
}

const WrappedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <WrappedApp />
  </Provider>,
  document.querySelector("body")
);
