import React, { Children } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { pathname } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';
  const className =
    pathname.includes(props.href) || pathname.includes(props.as)
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
