import React, { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import "../styles/Reddit.css";

function ArticlesReddit(props) {
    return (
        <Card className="Reddit-card-articles" key={props.article.id}>
            <Card.Header className="Reddit-card-header">{props.article.author}</Card.Header>
            <Card.Body className="Reddit-card-body">
                <a href={"https://reddit.com" + props.article.permalink} target="_blanck" className="Reddit-link">
                    <Card.Title>{props.article.title}</Card.Title>
                </a>
            </Card.Body>
            <Card.Footer className="Reddit-card-footer">
                {props.article.subreddit}
                <i>
                    {props.article.score}
                </i>
            </Card.Footer>
        </Card>
    )
}

function Reddit() {
    const [articles, setArticles] = useState([]);
    const [subreddit, setSubreddit] = useState("all");

    useEffect(() => {
        fetch("https://www.reddit.com/r/" + subreddit + ".json").then(res => {
            if (res.status !== 200) {
                console.log("ERROR SUBREDDIT");
                return;
            }
            res.json().then(data => {
                if (data != null) {
                    setArticles(data.data.children);
                }
            });
        });
    }, [subreddit]);

    return (
        <div className="Reddit">
            <Card className="Reddit-card-search">
                <Card.Body className="Reddit-card-body">
                    <Card.Title className="Reddit-title">
                        Search a subreddit
                    </Card.Title>
                    <Card.Text className="Reddit-card-text">
                        <div className="Reddit-search">
                            <input className="Reddit-searchbar" type="text" placeholder="Search something cool" value={subreddit} onChange={e => setSubreddit(e.target.value)} />
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Row xs={1} md={2} className="Reddit-row">
                {articles.map((article) => {
                    return (
                        <ArticlesReddit key={article.data.id} article={article.data} />
                    )}
                )}
            </Row>
        </div>
    )
}

export default Reddit;