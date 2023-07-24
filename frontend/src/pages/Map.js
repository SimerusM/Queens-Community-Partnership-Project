import "../styles/Home.css";
import "../styles/Introduction.css";

// import home specific components
import MapTitle from "../components/MapComponents/MapTitle";
import MapBody from "../components/MapComponents/MapBody";


const Map = () => {
    return (
        <div className="">
            <MapTitle/>
            <MapBody/>
        </div>
    )
}

export default Map