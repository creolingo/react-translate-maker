import { Component, PropTypes, Children } from 'react';
import Translate from 'translate-maker';

export default class LocaleProvider extends Component {
  static propTypes = {
    locale: PropTypes.string,
    locales: PropTypes.array,
    namespace: PropTypes.string,
    fallbacks: PropTypes.object,
    cache: PropTypes.object,
    adapter: PropTypes.object,
    defaultAdapter: PropTypes.object,
    dotNotation: PropTypes.bool,
    mode: PropTypes.string,
    references: PropTypes.bool,
    variables: PropTypes.bool,
    combinations: PropTypes.bool,
    filters: PropTypes.object,
  };

  static childContextTypes = {
    translate: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      translate: new Translate(props),
    };
  }

  componentWillReceiveProps(newProps) {
    this.state.translate.setLocale(newProps.locale);
  }

  t = (path, attrs, defaultValue) => {
    return this.get(path, attrs, defaultValue);
  }

  get(path, attrs, defaultValue) {
    const { translate } = this.state;
    return translate.get(path, attrs, defaultValue);
  }

  set(path, value) {
    const { translate } = this.state;
    return translate.set(path, value);
  }

  getLocale() {
    return this.state.translate.getOptions().locale;
  }

  setLocale(locale, callback) {
    return this.state.translate.setLocale(locale, callback);
  }

  getChildContext() {
    return {
      translate: this,
      t: this.t,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
