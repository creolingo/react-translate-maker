import { Component, PropTypes, Children } from 'react';
import Translate from 'translate-maker';

export default class LocaleProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
    controlled: PropTypes.bool,
    locale: PropTypes.string,
    namespace: PropTypes.string,

    locales: PropTypes.array,
    cache: PropTypes.object,
    data: PropTypes.object,
    adapter: PropTypes.object,
    dotNotation: PropTypes.bool,
    mode: PropTypes.string,
    references: PropTypes.bool,
    variables: PropTypes.bool,
    combinations: PropTypes.bool,
    filters: PropTypes.object,
    translate: PropTypes.object,
  };

  static defaultProps = {
    controlled: true,
  };

  static childContextTypes = {
    translate: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const { translate, locale, namespace, children, controlled, ...rest } = props;
    const instance = translate || new Translate(rest);

    this.state = {
      translate: instance,
    };

    if (locale) {
      instance.setLocale(locale, namespace);
    }
  }

  getChildContext() {
    return {
      translate: this,
      t: this.t,
    };
  }

  componentDidMount() {
    const { translate } = this.state;

    translate.on('locale', this.localeChanged);
    translate.on('changed', this.dataChanged);
  }

  componentWillUnmount() {
    const { translate } = this.state;

    translate.removeListener('locale', this.localeChanged);
    translate.removeListener('changed', this.dataChanged);
  }

  componentWillReceiveProps(newProps) {
    const { locale, namespace } = this.props;
    const { translate } = this.state;

    if (newProps.controlled) {
      if (newProps.locale !== locale) {
        translate.setLocale(newProps.locale, newProps.namespace);
      } else if (newProps.locale && newProps.namespace !== namespace) {
        translate.setLocale(newProps.locale, newProps.namespace);
      }
    }
  }

  get(path, attrs, defaultValue) {
    const { translate } = this.state;
    return translate.get(path, attrs, defaultValue);
  }

  set(path, value) {
    const { translate } = this.state;
    return translate.set(path, value);
  }

  async setLocale(locale) {
    if (this.props.controlled) {
      throw new Error('LocaleProvider is set as controlled component. If you want to use setLocale please set controlled = false');
    }

    const { translate } = this.state;
    return await translate.setLocale(locale);
  }

  getLocale() {
    const { translate } = this.state;
    return translate.getLocale();
  }

  t = (path, attrs, defaultValue) => this.get(path, attrs, defaultValue);

  dataChanged = () => {
    this.forceUpdate();
  }

  localeChanged = (locale) => {
    this.setState({ locale });
  }

  render() {
    return Children.only(this.props.children);
  }
}
