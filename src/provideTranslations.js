import { PropTypes, Component, createElement } from 'react';
import inherits from 'inherits';
import hoistNonReactStatics from 'hoist-non-react-statics';

function createComponent(CurrentComponent) {
  function Connector(...args) {
    Component.apply(this, args);
  }

  inherits(Connector, Component);

  const componentName = CurrentComponent.displayName || CurrentComponent.name;
  Connector.displayName = componentName + 'T';
  Connector.contextTypes = {
    t: PropTypes.func.isRequired,
  };

  Connector.prototype.render = function render() {
    return createElement(CurrentComponent, {
      ...this.props,
      t: this.context.t,
    });
  };

  hoistNonReactStatics(Connector, CurrentComponent);

  return Connector;
}

export default function provideTranslate(...args) {
  // support decorator pattern
  if (args.length === 0) {
    return (ComponentToDecorate) => createComponent(ComponentToDecorate);
  }

  return createComponent.apply(null, args);
}
