import classNames from 'classnames';
import '../css/TravelTime.css';

export default function TravelTime(props) {
    // constructor(props) {
    //     super(props);

    //     this.formatMsg = this.formatMsg.bind(this);
    //     this.status = this.status.bind(this);
    //     this.diff = this.diff.bind(this);
    // }

    function diff(a, b) {
        return a - b;
    }

    function status(avg, current) {
        const d = diff(current, avg);
        if (d > 10) return 'bad';
        if (d > 0) return 'warning';
        if (d <= 0) return 'good';
    }

    function formatMsg(item) {
        const d = diff(item.CurrentTime, item.AverageTime);
        if (d >= 0) return `+ ${Math.abs(d)} mins`;
        if (d < 0) return `- ${Math.abs(d)} mins`;
    }

    const { item } = props;
    const currStatus = status(item.AverageTime, item.CurrentTime);
    const isRed = currStatus === 'bad';
    const isGreen = currStatus === 'good';
    const isYellow = currStatus === 'warning';
    const travelStatus = classNames({
        red: isRed,
        green: isGreen,
        yellow: isYellow,
        small: true
    });

    const diffStatus = classNames({
        red: isRed,
        green: isGreen,
        yellow: isYellow,
        'white-text': true,
        'difference-item': true
    });
    return (
        <li className="travel-time">
            <div className="travel-flex-container">
                <div className={travelStatus}>{/*  this holds our color indicator */}</div>
                <div className="flex-item-border">
                    <h3 className="travel-header">{item.Description}</h3>
                </div>
                <div className="flex-item-border">
                    <p className="travel-text">Average: {item.AverageTime} mins</p>
                    <p className="travel-text">Current: {item.CurrentTime} mins</p>
                </div>
                <div className={diffStatus}>
                    <p>{formatMsg(item)}</p>
                </div>
            </div>
        </li>
    );
}
