import React, { Component, useState, useEffect } from 'react';
import TrafficHeader from './TrafficHeader';
import TrafficList from './TrafficList';
import TrafficFilter from './TrafficFilter';
import OfflineToast from './OfflineToast';
import getTimesFromServer from '../services/traffic';
import travelIds from '../services/travel-ids';
import '../css/App.css';

function mainApp() {
    useEffect(() => {
        window.addEventListener('online', setOnlineStatus);
        window.addEventListener('offline', setOnlineStatus);
    }, []);

    useEffect(() => {
        getTravelTimes();
    }, []);

    const [isOnline, setOnline] = useState(navigator.onLine);
    const [isShitty, setIsShitty] = useState(null);
    const [filteredTimes, setFilteredTimes] = useState([]);
    const [times, setTimes] = useState([]);

    const diff = key => {
        return key.CurrentTime - key.AverageTime;
    };

    const sum = (a, b) => {
        return a + b;
    };

    const setOnlineStatus = event => {
        setOnline(navigator.onLine);

        if (!isOnline && navigator.onLine) {
            console.log('we are back online!');
            // we are back; refresh;
            getTravelTimes();
        }
    };

    const isTrafficShitty = times => {
        if (!times.length) return setIsShitty(null);
        const avgDiff = times.map(diff).reduce(sum) / times.length;
        return setIsShitty(avgDiff >= 10);
    };

    async function getTravelTimes() {
        const filterTimes = time => travelIds.indexOf(time.TravelTimeID) > -1;

        try {
            const serverTimes = await getTimesFromServer();
            setTimes(serverTimes.filter(filterTimes));
            isTrafficShitty(serverTimes.filter(filterTimes));
        } catch (err) {
            console.log('err', err);
            // render error?
            // try again?
        }
    }

    const filterTravelTimes = e => {
        e.preventDefault();
        const searchStr = e.target.value.toLowerCase();
        const filteredTimes = times.filter(item =>
            item.Description.toLowerCase().includes(searchStr)
        );
        setFilteredTimes(filteredTimes);
        isTrafficShitty(filteredTimes);
    };

    return (
        <div className="App">
            {isOnline ? null : <OfflineToast />}
            <TrafficHeader isShitty={isShitty} />
            <TrafficFilter filterTraffic={filterTravelTimes} />
            <TrafficList times={filteredTimes || times} />
        </div>
    );
}

export default mainApp;
