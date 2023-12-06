import {CSSProperties, forwardRef} from "react";


const MapComponent = forwardRef<any, { style: CSSProperties }>((props, ref) => {
    return <div>
        <div ref={ref} style={props.style}/>
    </div>;

});
export default MapComponent;