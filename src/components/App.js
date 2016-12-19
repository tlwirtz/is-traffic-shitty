import React, { Component } from 'react';
import TravelTime from './TravelTime'
import TrafficHeader from './TrafficHeader'
import '../css/App.css';

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
    this.renderTravelTimes = this.renderTravelTimes.bind(this)
    this.isTrafficShitty = this.isTrafficShitty.bind(this)
    this.state = { times: null }
  }

  componentWillMount() {
    this.getTravelTimes()
    this.isTrafficShitty()
  }

  renderTravelTimes() {
    const { times } = this.state
    return (
      times ? times.map((item) => <TravelTime item={item} key={item.TravelTimeID}/>) : null
    )
  }

  isTrafficShitty() {
    if (!this.state.times) return false
    const goodTimes = this.state.times.filter(time => time.AverageTime >= time.CurrentTime)
    const badTimes = this.state.times.filter(time => time.CurrentTime > time.AverageTime)
    return goodTimes.length <= badTimes.length
  }

  getTravelTimes() {
    /**
     * Use traffic.js if we create a proxy server
     */
    const travelIds = [1, 4, 9, 10, 17, 20, 21, 22, 26, 27, 32, 33, 35, 38, 43, 44, 51, 52, 53, 54, 59, 60, 73, 74, 79, 80, 83, 84, 89, 92, 93, 96, 286, 287, 294, 295]
    const filterTimes = (time) => travelIds.indexOf(time.TravelTimeID) > -1

    request.get(`${WSDOT_URL}/GetTravelTimesAsJson?AccessCode=${ACCESS_CODE}`)
    .use(jsonp) // must use jsonp unless we make the call from a proxy server
    .end((err, res) => {
      if (err) return null
      return this.setState({ times: res.body.filter(filterTimes) })
    })
  }

  render() {
    return (
      <div className="App">
        <TrafficHeader isShitty={this.isTrafficShitty()}/>
        <ul className="Traffic-list">
          { this.renderTravelTimes() }
        </ul>
      </div>
    );
  }
}

export default App;
