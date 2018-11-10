import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import classNames from 'classnames';
import '../css/TrafficHeader.css';

class TrafficHeader extends Component {
  render() {
    const header = classNames({
      'App-header': true,
      green: !this.props.isShitty,
      red: this.props.isShitty,
    });

    return (
      <div>
        <div className={header}>
          <div className="full-width">
            <CSSTransitionGroup
              transitionName="headerText"
              transitionAppear={true}
              transitionAppearTimeout={750}
              transitionEnterTimeout={750}
              transitionLeaveTimeout={300}
            >
              {this.props.isShitty ? (
                <h2 key={'shitty'} className="App-header-text">
                  Yes, traffic is shitty.
                </h2>
              ) : (
                <h2 key={'not-shitty'} className="App-header-text">
                  No, traffic is not shitty.
                </h2>
              )}
            </CSSTransitionGroup>
          </div>
          <div>
            <span>
              <h2>
                <i
                  onClick={() => {
                    this.trafficFilter.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="pulse fa fa-angle-down App-header-text down-angle"
                />
              </h2>
            </span>
          </div>
        </div>
        <div
          ref={div => {
            this.trafficFilter = div;
          }}
        >
          {/* this is so we can scroll */}
        </div>
      </div>
    );
  }
}

export default TrafficHeader;
