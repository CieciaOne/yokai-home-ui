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
            <AddDeviceForm />
            {data && data.map((d) => <Device id={d.id} name={d.name} ip={d.ip} mac={d.mac} status={d.status} />)}
        </div>
    );
}

function Device(props) {
    return (
        <div>
            <hr></hr>
            <h4> <WakeButton id={props.id} />{props.name} </h4>
            <p>{props.ip} | {props.mac} | {props.status ? "UP" : "DOWN"}</p>
        </div>
    );
}

function WakeButton(props) {
    const [clicked, setClicked] = useState(false);
    useFetch(`${wolUrl}${props.id}`, { depends: [clicked] })

    return <button class="addButton" onClick={() => {
        setClicked(true)
        console.log("waking", props.id);
    }}>@</button>
}

function AddDeviceForm(props) {
    const [postData, setPostData] = useState({
        name: '',
        ip: '',
        mac: ''
    });

    const handleClick = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };

        fetch(networkUrl, requestOptions)
            .then(_response => {
                // window.location.reload();
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div class="addFeed">
            <hr />
            <input
                class="deviceInput"
                width="100%"
                name="name"
                type="text"
                value={postData.name}
                onChange={handleInputChange}
                placeholder="Name"></input>
            <input
                class="deviceInput"
                name="ip"
                type="text"
                value={postData.ip}
                onChange={handleInputChange}
                placeholder="IP"></input>
            <input
                class="deviceInput"
                name="mac"
                type="text"
                value={postData.mac}
                onChange={handleInputChange}
                placeholder="MAC"></input>
            <button class="addButton" onClick={handleClick}>+</button>
        </div >
    );
}
