import React, { Component } from 'react'
import '../css/TravelTimeFilter.css'


class TrafficFilter extends Component {
  render() {
    return <input className="travel-filter" type='text' onChange={(e) => this.props.filterTraffic(e)} />
  }
}

export default TrafficFilter
