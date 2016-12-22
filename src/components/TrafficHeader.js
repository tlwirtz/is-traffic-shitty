import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classNames from 'classnames'
import '../css/TrafficHeader.css'

class TrafficHeader extends Component {
  render() {
    const header= classNames({
      'App-header': true,
      green: !this.props.isShitty,
      red: this.props.isShitty,
    })
    return (
      <div className={header}>
        <div >
          <ReactCSSTransitionGroup
            transitionName="headerText"
            transitionAppear={true}
            transitionAppearTimeout={750}
            transitionEnterTimeout={750}
            transitionLeaveTimeout={300}
            >
            {
              this.props.isShitty ?
              <h2 key={'shitty'} className="App-header-text">Yes, traffic is shitty.</h2> :
              <h2 key={'not-shitty'} className="App-header-text">No, traffic is not shitty.</h2>
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default TrafficHeader
