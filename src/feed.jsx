import useFetch from "react-fetch-hook";
import { channelUrl, feedUrl } from "./common";
import { useState } from "preact/hooks";

export function Feed() {
    let { data, isLoading, error } = useFetch(feedUrl)

    if (error) { return <div>Error!</div> }
    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <div class="feed">
            <AddFeedForm />
            {data && data.map((d) => <FeedSource name={d.name} items={d.items} />)}
        </div>
    );
}

function FeedSource(props) {
    return (
        <div>
            <hr></hr>
            <h4>{props.name}</h4>
            {props.items.slice(0, 10).map((entry) => <FeedEntry entry={entry} />)}
        </div>
    );
}

function FeedEntry(props) {
    return (
        <a class="feedEntry" id={props.entry.title} href={props.entry.link} target="__blank">{props.entry.title}</a>
    );
}

function AddFeedForm(props) {
    const [postData, setPostData] = useState({
        name: '',
        url: ''
    });

    const handleClick = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };

        fetch(channelUrl, requestOptions)
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
                class="feedInput"
                width="100%"
                name="name"
                type="text"
                value={postData.name}
                onChange={handleInputChange}
                placeholder="Feed"></input>
            <input
                class="feedInput"
                name="url"
                type="text"
                value={postData.url}
                onChange={handleInputChange}
                placeholder="RSS Url"></input>
            <button class="addButton" onClick={handleClick}>+</button>
        </div >
    );
}
