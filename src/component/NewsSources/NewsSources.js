/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Route, Switch } from 'react-router-dom';
import News from '../News/News';
import './NewsSources.css';

const NewsRoute = ({ match }) => {
  let pathRoute = match.params.source;
  if (
    match.path === '/' ||
    (match.params.category !== '' && match.params.source === undefined)
  ) {
    pathRoute = 'abc-news';
  }

  return <News selectedNews={pathRoute} />;
};

export default class NewsSources extends Component {
  state = {
    list: [],
    selectedCatagory: '',
    activeNews: false,
    activeClassName: '',
  };

  static getDerivedStateFromProps({ selectedCatagory }) {
    // console.log('getDerivedStateFromProps', selectedCatagory);
    return {
      selectedCatagory,
    };
  }

  componentDidMount() {
    this.updateNewsSourse(this.props.selectedCatagory);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCatagory !== this.state.selectedCatagory) {
      this.updateNewsSourse(this.state.selectedCatagory);
    }
  }

  updateNewsSourse = category => {
    axios
      .get(
        `https://newsapi.org/v2/sources?language=en&apiKey=c1ca4f0c2e1641ea99e8853b82e36ed0`
      )
      .then(response => {
        // console.log(response);
        const newResponse = [...response.data.sources];
        const newsSourseValue = newResponse.filter(currentValue => {
          // console.log('accumulator', accumulator);
          // console.log('currentValue', currentValue);
          if (currentValue.category === category) {
            return true;
          } else {
            return false;
          }
        });
        this.setState({
          list: newsSourseValue,
        });
      });
  };

  activeNewsHandler = activeClassName => {
    this.setState({
      activeNews: true,
      activeClassName,
    });
  };
  render() {
    const displayNewsSource = this.state.list.map(data => {
      const isActiveNews =
        this.state.activeNews && this.state.activeClassName === data.name
          ? 'activeNewsName'
          : '';
      return (
        <li className={isActiveNews} key={data.id}>
          <NavLink
            className="link_source"
            onClick={() => this.activeNewsHandler(data.name)}
            to={`/${data.category}/${data.id}`}
            exact
          >
            {data.name}
          </NavLink>
        </li>
      );
    });
    return (
      <div>
        <div className="main-source">
          <ul className="NewsSource">{displayNewsSource}</ul>
        </div>
        <Switch>
          <Route exact path={`/`} component={NewsRoute} />
          <Route exact path={`/:category`} component={NewsRoute} />
          <Route path={`/:category/:source`} component={NewsRoute} />
        </Switch>
      </div>
    );
  }
}
