import React, { Component } from 'react';
import TravelTime from './TravelTime'
import '../css/App.css';

/**
 * TODO -- create proxy server for this request
 * WSDOT does not have CORS support, only JSONP support.
 * Cannot use services/traffic.js unless we have a proxy server.
 */
import request from 'superagent'
import jsonp from 'superagent-jsonp'

const WSDOT_URL = 'http://wsdot.com/Traffic/api/TravelTimes/TravelTimesREST.svc'
const ACCESS_CODE = process.env.WSDOT_ACCESS_CODE || '10a60c16-25f1-49c3-bcbe-b83f01e77f7e'

class App extends Component {
  constructor() {
    super()

    this.getTravelTimes = this.getTravelTimes.bind(this)
    this.renderTravelTimes = this.renderTravelTimes.bind(this)
    this.state = { times: null }
  }

  componentWillMount() {
    this.getTravelTimes()
  }

  renderTravelTimes() {
    const { times } = this.state
    return (
      times ? times.map((item) => <TravelTime item={item} key={item.TravelTimeID}/>) : null
    )
  }

  getTravelTimes() {
    /**
     * Use traffic.js if we create a proxy server
     */
    request.get(`${WSDOT_URL}/GetTravelTimesAsJson?AccessCode=${ACCESS_CODE}`)
    .use(jsonp) // must use jsonp unless we make the call from a proxy server
    .end((err, res) => {
      if (err) return null
      return this.setState({ times: res.body })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Is Traffic Shitty?</h2>
        </div>
        <ul className="Traffic-list">
          { this.renderTravelTimes() }
        </ul>
      </div>
    );
  }
}

export default App;
