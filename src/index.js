import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NewsCategorys from './component/NewsCategorys/NewsCategorys';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';

const categorys = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];
class App extends Component {
  state = {
    currentCategory: categorys[2],
  };

  newsSourceHandler = category => {
    this.setState({
      currentCategory: category,
    });
  };
  render() {
    return (
      <Router>
        <div>
          <div className="logo">
            <img
              src="https://newsheadlineshunt.firebaseapp.com/logo.png"
              alt="LOGO"
            />
            <h1>News Headlines Hunt</h1>
          </div>
          <NewsCategorys
            category={categorys}
            selectCategory={this.newsSourceHandler}
          />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
