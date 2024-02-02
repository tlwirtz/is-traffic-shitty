import '../css/OfflineToast.css';

export default function OfflineToast() {
    return (
        <div className="offlineToast-container">
            <div className="offlineToast">
                {' '}
                You are currently offline. We are using the lastest available data.{' '}
            </div>
        </div>
    );
}
