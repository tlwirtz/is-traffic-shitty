import React, { Component } from 'react'
import '../css/TravelTimeFilter.css'

class TrafficFilter extends Component {
  render() {
    return (
      <div className="travel-filter-container">
        <span className="search-icon"><i className="fa fa-search"></i></span>
        <input className="travel-filter" type='text' placeholder="Search" onChange={(e) => this.props.filterTraffic(e)} />
      </div>
    )
  }
}

export default TrafficFilter
