import React, { useEffect, useState } from 'react';
import { Card, CardImg } from 'react-bootstrap';
import { createApi } from 'unsplash-js';
import "../styles/Unsplash.css";

const API_KEY = "mXH09nFhO9oakQKEwhAbyqhdQgjgdCT9b8qq8ZJpFQM";

const unsplash = new createApi({
    accessKey: API_KEY,
});

function SearchPhotos() {

    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);
    const [nbPics, setNbPics] = useState(0);

    const searchPhotos = async (e) => {
        e.preventDefault();
        unsplash.search.getPhotos({
            query: query,
            page: Math.random() * 100,
            perPage: 50,
            contentFilter: "high",
            orientation: "portrait",
        }).then(res => {
            if (res.errors) {
                console.log(res.errors);
            }
            else {
                const photo = res.response
                setPics(photo.results);
                setNbPics(photo.total);
            }
        });
    }

    useEffect(() => {
        unsplash.search.getPhotos({
            query: query,
            page: Math.random() * 100,
            perPage: 100,
            contentFilter: "high",
            orientation: "portrait",
        }).then(res => {
            if (res.errors) {
                console.log(res.errors);
            }
            else {
                const photo = res.response
                setPics(photo.results);
                setNbPics(photo.total);
            }
        });
    }, [query]);

    return (
        <div className="Unsplash-search-photos">
            <Card className="Unsplash-card-search">
                <form className="Unsplash-form" onSubmit={searchPhotos}>
                    <label className="Unsplash-label-search" htmlFor="query">
                        📷
                    </label>
                    <input className="Unsplash-input-search" type="text" id="query" placeholder="Search for photos" value={query} onChange={(e) => setQuery(e.target.value)} />
                </form>
                <small className="Unsplash-small">
                    {nbPics} photos found
                </small>
            </Card>
            {
                pics.length ? (
                    <Card className="Unsplash-card-pictures">
                        {pics.map((pic) => {
                            return (
                                <a href={pic.urls.full} target="_blank" rel="noopener noreferrer" key={pic.id}>
                                    <CardImg className="Unsplash-card-img" key={pic.id} src={pic.urls.regular} />
                                </a>
                            )
                        }
                        )}
                    </Card>
                ) : null
            }
        </div>
    )
}

function UnsplashComponent() {
    return (
        <div className="Unsplash">
            <SearchPhotos />
        </div>
    )
}

export default UnsplashComponent;