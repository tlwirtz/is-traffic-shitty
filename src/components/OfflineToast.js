import React, { Component } from 'react';
import '../css/OfflineToast.css';

export default class OfflineToast extends Component {
  render() {
    return (
      <div className="offlineToast-container">
        <div className="offlineToast"> You are currently offline. We are using the lastest available data. </div>
      </div>
    );
  }
}
