import './Overlay.css';
import preloader from './../../assets/preloader.png';
const Overlay = () => {
    return (
        <div className="overlay">
            <img className="overlay-logo" src={preloader} alt="" />
            <div className="overlay-spinner"></div>
        </div>
    );
};

export default Overlay;
