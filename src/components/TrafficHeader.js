import React, { Component } from 'react'
import classNames from 'classnames'


class TrafficHeader extends Component {
  constructor() {
    super()

    this.isTrafficShitty = this.isTrafficShitty.bind(this)
  }

  isTrafficShitty() {
    const goodTimes = this.props.times.filter(time => time.AverageTime >= time.CurrentTime)
    const badTimes = this.props.times.filter(time => time.CurrentTime > time.AverageTime)
    return goodTimes.length <= badTimes.length
  }

  render() {
    const header= classNames({
      'App-header': true,
      green: !this.isTrafficShitty(),
      red: this.isTrafficShitty(),
    })
    return (
      <div className={header}>
        <h2 className="App-header-text">Is Traffic Shitty?</h2>
      </div>
    )
  }
}

export default TrafficHeader
