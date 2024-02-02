import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import '../css/TrafficHeader.css';

export default function TrafficHeader(props) {
    const trafficFilterRef = useRef(null);
    const nodeRef = useRef(null);
    const header = classNames({
        'App-header': true,
        green: !props.isShitty,
        red: props.isShitty
    });

    return (
        <div>
            <div className={header}>
                <div className="full-width">
                    <CSSTransition
                        nodeRef={nodeRef}
                        name="headerText"
                        classNames="headerText"
                        appear={true}
                        in={true}
                        timeout={750}
                    >
                        {props.isShitty ? (
                            <h2 ref={nodeRef} key={'shitty'} className="App-header-text">
                                Yes, traffic is shitty.
                            </h2>
                        ) : (
                            <h2 ref={nodeRef} key={'not-shitty'} className="App-header-text">
                                No, traffic is not shitty.
                            </h2>
                        )}
                    </CSSTransition>
                </div>
                <div>
                    <span>
                        <h2>
                            <i
                                onClick={() => {
                                    trafficFilterRef.current.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="pulse fa fa-angle-down App-header-text down-angle"
                            />
                        </h2>
                    </span>
                </div>
            </div>
            <div ref={trafficFilterRef}>{/* this is so we can scroll */}</div>
        </div>
    );
}
