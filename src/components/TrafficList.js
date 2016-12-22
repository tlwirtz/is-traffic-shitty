import React from 'react'
import TravelTime from './TravelTime'

class TrafficList extends React.Component {
  constructor() {
    super()
  }
  render() {
    const { times } = this.props
    return(
      <ul className="Traffic-list">
        { times ? times.map((item) => <TravelTime item={item} key={item.TravelTimeID}/>) : null }
      </ul>
    )
  }
}

export default TrafficList
