import React, { Component } from 'react';
import TrafficHeader from './TrafficHeader';
import TrafficList from './TrafficList';
import TrafficFilter from './TrafficFilter';
import OfflineToast from './OfflineToast';
import getTimesFromServer from '../services/traffic';
import travelIds from '../services/travel-ids';
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.getTravelTimes = this.getTravelTimes.bind(this);
    this.isTrafficShitty = this.isTrafficShitty.bind(this);
    this.filterTravelTimes = this.filterTravelTimes.bind(this);
    this.setOnlineStatus = this.setOnlineStatus.bind(this);
    this.state = {
      times: [],
      filterTimes: [],
      isShitty: null,
      isOnline: navigator.onLine,
    };
  }

  componentDidMount() {
    this.getTravelTimes();

    window.addEventListener('online', this.setOnlineStatus);
    window.addEventListener('offline', this.setOnlineStatus);
  }

  setOnlineStatus(event) {
    const { isOnline } = this.state;
    this.setState({ isOnline: navigator.onLine });

    if (!isOnline && navigator.onLine) {
      console.log('we are back online!');
      // we are back; refresh;
      this.getTravelTimes();
    }
  }

  diff(key) {
    return key.CurrentTime - key.AverageTime;
  }

  sum(a, b) {
    return a + b;
  }

  isTrafficShitty(times) {
    if (!times.length) return this.setState({ isShitty: null });
    const avgDiff = times.map(this.diff).reduce(this.sum) / times.length;
    return this.setState({ isShitty: avgDiff >= 10 });
  }

  async getTravelTimes() {
    const filterTimes = time => travelIds.indexOf(time.TravelTimeID) > -1;

    try {
      const serverTimes = await getTimesFromServer();
      this.setState({ times: serverTimes.filter(filterTimes) });
      this.isTrafficShitty(serverTimes.filter(filterTimes));
    } catch (err) {
      console.log('err', err);
      // render error?
      // try again?
    }
  }

  filterTravelTimes(e) {
    e.preventDefault();
    let { times } = this.state;
    const searchStr = e.target.value.toLowerCase();
    times = times.filter(item => item.Description.toLowerCase().includes(searchStr));
    this.setState({ filteredTimes: times });
    this.isTrafficShitty(times);
  }

  render() {
    return (
      <div className="App">
        {this.state.isOnline ? null : <OfflineToast />}
        <TrafficHeader isShitty={this.state.isShitty} />
        <TrafficFilter filterTraffic={this.filterTravelTimes} />
        <TrafficList times={this.state.filteredTimes || this.state.times} />
      </div>
    );
  }
}

export default App;
