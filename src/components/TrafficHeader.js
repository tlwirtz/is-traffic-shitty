import React, { Component } from 'react'
import classNames from 'classnames'

class TrafficHeader extends Component {
  render() {
    const header= classNames({
      'App-header': true,
      green: !this.props.isShitty,
      red: this.props.isShitty,
    })
    return (
      <div className={header}>
        <div >
          <h2 className="App-header-text">Is Traffic Shitty?</h2>
          <br />
          {
            this.props.isShitty ?
            <h2 className="App-header-text">Yes</h2> :
            <h2 className="App-header-text">No</h2>
          }
        </div>
      </div>
    )
  }
}

export default TrafficHeader
