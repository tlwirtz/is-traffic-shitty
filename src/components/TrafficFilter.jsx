import '../css/TravelTimeFilter.css';

export default function TrafficFilter(props) {
    return (
        <div className="travel-filter-container">
            <span className="search-icon">
                <i className="fa fa-search"></i>
            </span>
            <input
                className="travel-filter"
                type="text"
                placeholder="Search"
                onChange={e => props.filterTraffic(e)}
            />
        </div>
    );
}
