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

    this.state = this._prepareLocale(props);
  }

  componentWillReceiveProps(newProps) {
    this.setState(this._prepareLocale(newProps));
  }

  _prepareLocale(props) {
    const { locale, locales, onLoadLocale } = props;

    const messages = locales[locale];
    if (messages) {
      const translate = new Translate();
      translate.set(messages);

      return { translate };
    }

    if (!onLoadLocale) {
      throw new Error('Locale is not defined. For async load use onLoadLocale');
    }

    onLoadLocale(locale);

    return {};
  }

  get(path, attrs) {
    const { translate } = this.state;
    if (!translate) {
      return void 0;
    }

    return translate.get(path, attrs);
  }

  getChildContext() {
    return {
      translate: this,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
