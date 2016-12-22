import React, { Component } from 'react';
import TrafficHeader from './TrafficHeader'
import TrafficList from './TrafficList'
import '../css/App.css';
import '../css/TravelTimeFilter.css'

/**
 * TODO -- create proxy server for this request
 * WSDOT does not have CORS support, only JSONP support.
 * Cannot use services/traffic.js unless we have a proxy server.
 */
import request from 'superagent'
import jsonp from 'superagent-jsonp'

const WSDOT_URL = 'https://wsdot.com/Traffic/api/TravelTimes/TravelTimesREST.svc'
const ACCESS_CODE = process.env.WSDOT_ACCESS_CODE || '10a60c16-25f1-49c3-bcbe-b83f01e77f7e'

class App extends Component {
  constructor() {
    super()

    this.getTravelTimes = this.getTravelTimes.bind(this)
    this.isTrafficShitty = this.isTrafficShitty.bind(this)
    this.filterTravelTimes = this.filterTravelTimes.bind(this)
    this.state = { times: null }
  }

  componentWillMount() {
    this.getTravelTimes()
    this.isTrafficShitty()
  }

  isTrafficShitty() {
    if (!this.state.times) return false
    const goodTimes = this.state.times.filter(time => time.AverageTime >= time.CurrentTime)
    const badTimes = this.state.times.filter(time => time.CurrentTime > time.AverageTime)
    return goodTimes.length <= badTimes.length
  }

  getTravelTimes() {
    const travelIds = [1, 4, 9, 10, 17, 20, 21, 22, 26, 27, 32, 33, 35, 38, 43, 44, 51, 52, 53, 54, 59, 60, 73, 74, 79, 80, 83, 84, 89, 92, 93, 96, 286, 287, 294, 295]
    const filterTimes = (time) => travelIds.indexOf(time.TravelTimeID) > -1

    request.get(`${WSDOT_URL}/GetTravelTimesAsJson?AccessCode=${ACCESS_CODE}`)
    .use(jsonp) // must use jsonp unless we make the call from a proxy server
    .end((err, res) => {
      if (err) return null
      return this.setState({ times: res.body.filter(filterTimes) })
    })
  }

  filterTravelTimes(e) {
    let times = this.state.times
    const searchStr = e.target.value.toLowerCase()
    times = times.filter(item => item.Description.toLowerCase().includes(searchStr))
    this.setState({ filteredTimes: times })
  }

  render() {
    return (
      <div className="App">
        {/* TODO -- fontawesome icon should go here somewhere */}
        <input className="travel-filter" type="text" onChange={this.filterTravelTimes} />

        <TrafficHeader isShitty={this.isTrafficShitty()}/>
        <TrafficList times={this.state.filteredTimes || this.state.times} />
      </div>
    );
  }
}

export default App;
