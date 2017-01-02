import React, { Component } from 'react'
import classNames from 'classnames'
import '../css/TravelTime.css'

class TravelTime extends Component {
  constructor() {
    super()

    this.formatMsg = this.formatMsg.bind(this)
    this.status = this.status.bind(this)
    this.diff = this.diff.bind(this)
  }

  diff(a,b) {
    return a - b
  }

  status(avg, current) {
    const d = this.diff(current, avg)
    if (d > 10)  return 'bad'
    if (d > 0 )   return 'warning'
    if (d <= 0 )  return 'good'
  }

  formatMsg(item) {
    const {AverageTime, CurrentTime} = item
    const d = this.diff(CurrentTime, AverageTime)
    let msg
    const travelTime = classNames({
        'red-text': this.status(AverageTime, CurrentTime) === 'bad',
        'green-text': this.status(AverageTime, CurrentTime) === 'good',
        'yellow-text': this.status(AverageTime, CurrentTime) === 'warning'
      })

    if (d === 0) msg = `average.`
    if (d > 0) msg = `${Math.abs(d)} ${ d === 1 ? 'minute' : 'minutes'} above average.`
    if (d < 0) msg = `${Math.abs(d)} ${ d === -1 ? 'minute' : 'minutes'} below average.`
    return <span className={travelTime}>{msg}</span>
  }

  render() {
    const { item } = this.props
    const travelTime = classNames({
      TravelTime: true
    })
    const msg = this.formatMsg(item, item.AverageTime, item.CurrentTime)
    return (
      <li className={travelTime}>
        <h2>{item.Description} is {msg}</h2>
      </li>
    )
  }
}

export default TravelTime
