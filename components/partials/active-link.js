import React, { Children } from 'react';
import { Link, useHistory } from 'react-router-dom';

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const history = useHistory();
  const { pathname } = history.location;
  const child = Children.only(children);
  const childClassName = child.props.className || '';
  let className = childClassName;

  if (props.to === '/dashboard') {
    if (pathname === props.to)
      className = `${childClassName} ${activeClassName}`.trim();
  } else if (props.to === '/dashboard/settings') {
    if (['/dashboard/profile', '/dashboard/settings'].includes(pathname))
      className = `${childClassName} ${activeClassName}`.trim();
  } else if (pathname.includes(props.to) || pathname.includes(props.as)) {
    className = `${childClassName} ${activeClassName}`.trim();
  }

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
