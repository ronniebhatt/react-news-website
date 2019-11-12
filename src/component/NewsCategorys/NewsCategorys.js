/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import NewsSources from '../NewsSources/NewsSources';
import './NewsCategorys.css';

const NewsSourseRoute = ({ match }) => {
  let pathRoute = match.params.id;
  if (match.path === '/') {
    pathRoute = 'general';
  }

  return <NewsSources selectedCatagory={pathRoute} />;
};

export default class NewsCategorys extends Component {
  state = {
    activeLink: false,
    category: '',
  };

  linkActiveHandle = category => {
    this.setState({
      activeLink: true,
      category,
    });
  };
  render() {
    const displayCategory = this.props.category.map(categ => {
      const isActive =
        this.state.activeLink && this.state.category === categ
          ? 'activeCategory'
          : '';
      return (
        <li
          className={isActive}
          key={categ}
          onClick={() => this.props.selectCategory(categ)}
        >
          <NavLink
            className="link_category"
            onClick={() => this.linkActiveHandle(categ)}
            to={`/${categ}/`}
            exact
          >
            {categ}
          </NavLink>
        </li>
      );
    });
    return (
      <div>
        <div className="main-category">
          <ul className="Categorys">{displayCategory}</ul>
        </div>
        <Switch>
          <Route exact path="/" component={NewsSourseRoute} />
          <Route path="/:id" component={NewsSourseRoute} />
        </Switch>
      </div>
    );
  }
}
