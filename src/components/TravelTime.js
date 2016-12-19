import React from 'react'
import classNames from 'classnames'
import '../css/TravelTime.css'

const TravelTime = (props) => {
  const isGood = (avg, current) => { return avg >= current }
  const isBad = (avg, current) => { return ((avg + 10) <= current) }
  const isWarning = (avg, current) => { return (current > avg) && (current < avg + 10) }
  const { item } = props
  const travelTime = classNames({
    TravelTime: true,
    red: isBad(item.AverageTime, item.CurrentTime),
    green: isGood(item.AverageTime, item.CurrentTime),
    yellow: isWarning(item.AverageTime, item.CurrentTime)
  })

  return (
    <li className={travelTime}>
      <h2 className="travel-title">{item.Description} - {item.TravelTimeID}</h2>
      <p>Average Time: {item.AverageTime}</p>
      <p>Current Time: {item.CurrentTime}</p>
    </li>
  )
}

export default TravelTime
