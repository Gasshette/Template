import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Route from 'route-parser';
import PropTypes from 'prop-types';
import './breadcrumbs.scss';

const isFunction = value => typeof value === 'function';

const getPathTokens = (pathname) => {
  const paths = ['/'];

  if (pathname === '/') return paths;

  pathname.split('/').reduce((prev, curr) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });

  return paths;
};

function getRouteMatch(routes, path) {
  return Object.keys(routes)
    .map((key) => {
      const params = new Route(key).match(path);
      return {
        didMatch: params !== false,
        params,
        key,
      };
    })
    .filter(item => item.didMatch)[0];
}

function getBreadcrumbs({ routes, location }) {
  const pathTokens = getPathTokens(location.pathname);

  return pathTokens.map((path) => {
    const routeMatch = getRouteMatch(routes, path);
    let name = "";

    if (typeof routeMatch !== 'undefined') {
      const routeValue = routes[routeMatch.key];
      name = isFunction(routeValue)
        ? routeValue(routeMatch.params)
        : routeValue;
    }
    name = name === "" ? "Not Found" : name;
    return { name, path };
  });
}

function Breadcrumbs({ routes, location }) {
  const breadcrumbs = getBreadcrumbs({ routes, location });

  return (
    <div id="breadcrumbs-component">
      {breadcrumbs.map((breadcrumb, i) =>
        (<span key={breadcrumb.path}>
          <Link to={breadcrumb.path}>
            {breadcrumb.name}
          </Link>
          {i < breadcrumbs.length - 1 ? ' / ' : ''}
        </span>),
      )}
    </div>
  );
}

Breadcrumbs.propTypes = {
  routes: PropTypes.object.isRequired, // eslint-disable-line
  location: PropTypes.object.isRequired, // eslint-disable-line
};

export default withRouter(Breadcrumbs);
