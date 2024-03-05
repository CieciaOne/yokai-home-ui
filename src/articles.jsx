import useFetch from "react-fetch-hook";
import Markdown from "react-markdown";
import { articlesUrl } from "./common";
import { useState } from "preact/hooks";

export function Articles() {
    let { data, isLoading, error } = useFetch(articlesUrl)

    if (error) { return <div>Error!</div> }
    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <div class="articles">
            {data && data.map((d) => <Article id={d.id} title={d.title} body={d.article} />)}
            <AddArticleForm />
        </div>
    );

}

function Article(props) {
    return (
        <div class="article">
            <hr></hr>
            <h2>{props.title}</h2>
            <Markdown>{props.body}</Markdown>
        </div>
    );
}

function AddArticleForm(props) {
    const [postData, setPostData] = useState({
        title: '',
        article: ''
    });

    const handleClick = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };

        fetch(articlesUrl, requestOptions)
            .then(_response => {
                window.location.reload();
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
        <div>
            <hr></hr>
            <input
                class="articleTitle"
                width="100%"
                name="title"
                type="text"
                value={postData.title}
                onChange={handleInputChange}
                placeholder="Enter title"></input>
            <br />
            <textarea
                class="articleContent"
                width="100%"
                rows={4}
                cols={60}
                name="article"
                type="text"
                value={postData.article}
                onChange={handleInputChange}
                placeholder="Input article content..."></textarea>
            <button class="addArticleButton" onClick={handleClick}>Add article</button>
        </div >
    );
}