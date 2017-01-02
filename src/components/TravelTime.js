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
    const travelTime = classNames({
      'red-text': this.status(AverageTime, CurrentTime) === 'bad',
      'green-text': this.status(AverageTime, CurrentTime) === 'good',
      'yellow-text': this.status(AverageTime, CurrentTime) === 'warning'
    })
    let msg

    if (d === 0) {
      msg = `This is average.`
    }

    //TODO -- should there be a function to construct these messages?
    if (d > 0) {
      msg = (
        <div>
          This is {Math.abs(d)} {d === 1 ? 'minute' : 'minutes'}
          <span className={travelTime}> below average</span>.
        </div>
      )
    }
    if (d < 0) {
      msg = (
        <div>
          This is {Math.abs(d)} {d === 1 ? 'minute' : 'minutes'}
          <span className={travelTime}> above average</span>.
        </div>
      )
    }
    return msg
  }

  render() {
    const { item } = this.props
    const travelTime = classNames({ TravelTime: true })
    const msg = this.formatMsg(item)
    const travelStatus = classNames({
        'red-text': this.status(item.AverageTime, item.CurrentTime) === 'bad',
        'green-text': this.status(item.AverageTime, item.CurrentTime) === 'good',
        'yellow-text': this.status(item.AverageTime, item.CurrentTime) === 'warning'
      })
    return (
      <li className={travelTime}>
        <h3>Traffic from {item.Description} is
          <span className={travelStatus  }>{item.CurrentTime}</span> minutes.
        </h3>
        <h3>{msg}</h3>
      </li>
    )
  }
}

export default TravelTime
