import { Component, PropTypes, Children } from 'react';
import Translate from 'translate-maker';

export default class Provider extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    locales: PropTypes.object.isRequired,
    onLoadLocale: PropTypes.func,
  };

  static childContextTypes = {
    translate: PropTypes.object.isRequired,
  };

  static defaultProps = {
    locale: 'en',
  };

  constructor(props, context) {
    super(props, context);

    this._translate = new Translate();

    this._prepareLocale(props);
  }

  _prepareLocale(props) {
    const { locale, locales, onLoadLocale } = props;

    const messages = locales[locale];
    if (messages) {
      return this._translate.set(messages);
    }

    if (!onLoadLocale) {
      throw new Error('Locale is not defined. For async load use onLoadLocale');
    }

    onLoadLocale(locale);
  }

  getTranslate() {
    return this._translate;
  }

  getChildContext() {
    return {
      translate: this._translate,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
