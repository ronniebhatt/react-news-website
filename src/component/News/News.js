/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import axios from 'axios';
import uniqueRandom from 'unique-random';
import './News.css';

const rand = uniqueRandom(1, 500);

export default class News extends Component {
  state = {
    news: [],
  };

  componentDidMount() {
    this.getTheNews();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedNews !== this.props.selectedNews) {
      this.getTheNews();
    }
  }

  getTheNews = () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?sources=${
          this.props.selectedNews
        }&apiKey=4176cb4a86cf4fbda8e67dbc6327ed5f`
      )
      .then(response => {
        this.setState({
          news: response.data.articles,
        });
      });
  };
  render() {
    let newsData = null;
    if (this.state.news !== []) {
      newsData = this.state.news.map(data => {
        return (
          <li key={`${data.source.id}${rand()}${rand()}`}>
            <a href={data.url}>
              {data.urlToImage ? (
                <img src={data.urlToImage} alt="News_Image" />
              ) : (
                <img
                  src="http://leeford.in/wp-content/uploads/2017/09/image-not-found.jpg"
                  alt="News_Image"
                />
              )}
              <p>{data.source.name}</p>
              <h3>{data.title}</h3>
              <p>{data.description}</p>
            </a>
          </li>
        );
      });
    }
    return (
      <div className="main_news">
        <ul className="News">{newsData}</ul>
      </div>
    );
  }
}
