import useFetch from "react-fetch-hook";
import Markdown from "react-markdown";
import { feedUrl } from "./common";

export function Articles() {
    let { data, isLoading, error } = useFetch(feedUrl)

    if (error) { return <div>Error!</div> }
    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <div>
            {data && data.map((d) => <Article title={d.title} body={d.article} />)}
        </div>
    );
}

function Article(props) {
    return (
        <div>
            <hr></hr>
            <h2>{props.title}</h2>
            <Markdown>{props.body}</Markdown>
        </div>
    );
}
