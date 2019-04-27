// @flow
import { isValidElement, cloneElement, Children } from 'react';

function replaceReactChildren(children, value) {
  if (!isValidElement(children)) {
    return children;
  }

  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    const { props } = child;
    if (props && props.children === '#') {
      return cloneElement(child, {
        children: value,
      });
    }

    return replaceReactChildren(child, value);
  });
}

export default function children(value, part, attrs, metadata, newChildrenValue) {
  return replaceReactChildren(value, newChildrenValue);
}
