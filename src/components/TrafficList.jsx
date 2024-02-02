import TravelTime from './TravelTime';
import '../css/TravelTime.css';

export default function TrafficList(props) {
    function renderList(times) {
        return (
            <ul className="Traffic-list">
                {times
                    ? times.map(item => <TravelTime item={item} key={item.TravelTimeID} />)
                    : null}
            </ul>
        );
    }

    const { times } = props;
    return (
        <div>
            {times.length === 0 ? (
                <div className="full-height">
                    <h1 className="no-data-text grey-text center-text">There is no traffic data</h1>
                </div>
            ) : (
                renderList(times)
            )}
        </div>
    );
}
