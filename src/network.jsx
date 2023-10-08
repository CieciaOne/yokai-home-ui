import useFetch from "react-fetch-hook";
import { networkUrl, wolUrl } from "./common";
import { useState } from "preact/hooks";

export function Network() {
    let { data, isLoading, error } = useFetch(networkUrl)

    if (error) { return <div>Error!</div> }
    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <div>
            {data && data.map((d) => <Device id={d.id} name={d.name} ip={d.ip} mac={d.mac} status={d.status} />)}
        </div>
    );
}

function Device(props) {
    return (
        <div>
            <hr></hr>
            <h2> {props.name} <WakeButton id={props.id} /></h2>
            <p>{props.ip} | {props.mac} | {props.status ? "UP" : "DOWN"}</p>
        </div>
    );
}

function WakeButton(props) {
    const [clicked, setClicked] = useState(false);
    useFetch(`${wolUrl}${props.id}`, { depends: [clicked] })

    return <button onClick={() => {
        setClicked(true)
        console.log("waking", props.id);
    }}>Wake</button>
}