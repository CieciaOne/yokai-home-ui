import useFetch from "react-fetch-hook";
import Markdown from "react-markdown";
import { articlesUrl } from "./common";
import { useState } from "preact/hooks";

export function Articles() {
    let { data, isLoading, error } = useFetch(articlesUrl)

    console.log(data);
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
            <div class="articleHeading">
                <DeleteArticleButton
                    title={props.title} id={props.id} />
            </div>
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

        if (postData.title != "") {
            fetch(articlesUrl, requestOptions)
                .then(_response => {
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
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
            <button class="addButton" onClick={handleClick}>Add article</button>
        </div >
    );
}

function DeleteArticleButton(props) {

    const handleClick = () => {
        const requestOptions = {
            method: 'DELETE',
        };

        const url = articlesUrl + "/" + props.id
        fetch(url, requestOptions)
            .then(_response => {
                window.location.reload();
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };

    return (
        <button class="deleteArticleButton" onClick={handleClick}>{props.title}</button>
    );
}