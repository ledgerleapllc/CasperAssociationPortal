import React, { Children } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { pathname } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  let className = childClassName;

  if (props.href === '/dashboard') {
    if (pathname === props.href)
      className = `${childClassName} ${activeClassName}`.trim();
  } else if (props.href === '/dashboard/settings') {
    if (['/dashboard/profile', '/dashboard/settings'].includes(pathname))
      className = `${childClassName} ${activeClassName}`.trim();
  } else if (pathname.includes(props.href) || pathname.includes(props.as)) {
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
