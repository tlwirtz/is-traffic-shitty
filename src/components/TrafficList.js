import React from 'react'
import TravelTime from './TravelTime'
import '../css/TravelTime.css'
class TrafficList extends React.Component {
  constructor() {
    super(props)
    this.renderList = this.renderList.bind(this)
  }

  renderList(times) {
    return (
      <ul className="Traffic-list">
        { times ? times.map((item) => <TravelTime item={item} key={item.TravelTimeID}/>) : null }
      </ul>
    )
  }

  render() {
    const { times } = this.props
    return (
      <div >
        { times.length === 0 ?
          <div className="full-height">
            <h1 className="no-data-text grey-text center-text">There is no traffic data</h1>
          </div>
          : this.renderList(times)
        }
      </div>
    )
  }
}

export default TrafficList
