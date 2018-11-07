// @flow
import React, { Component, type Node, createContext } from 'react';
import Translate from 'translate-maker';

const { Provider, Consumer } = createContext({});

export const LocaleProviderConsumer = Consumer;

type Props = {
  children: Node,
  controlled?: boolean,
  locale?: string,
  namespace?: string,
  locales?: string[],
  cache?: Object,
  data?: Object,
  adapter?: Object,
  dotNotation?: boolean,
  mode?: string,
  references?: boolean,
  variables?: boolean,
  combinations?: boolean,
  filters?: Object,
  translate?: Object,
};

type State = {
  translate: Translate,
};

export default class LocaleProvider extends Component<Props, State> {
  static defaultProps = {
    controlled: true,
    /*
    locale: undefined,
    namespace: undefined,
    locales: undefined,
    cache: undefined,
    data: undefined,
    adapter: undefined,
    dotNotation: undefined,
    mode: undefined,
    references: undefined,
    variables: undefined,
    combinations: undefined,
    filters: undefined,
    translate: undefined,
    */
  };

  constructor(props) {
    super(props);

    const {
      translate, locale, namespace, children, controlled, ...rest
    } = props;

    const instance = translate || new Translate(rest);

    this.state = {
      translate: instance,
    };

    if (locale) {
      instance.setLocale(locale, namespace);
    }
  }

  componentDidMount() {
    const { translate } = this.state;

    translate.on('locale', this.localeChanged);
    translate.on('changed', this.dataChanged);
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

  componentWillUnmount() {
    const { translate } = this.state;

    translate.removeListener('locale', this.localeChanged);
    translate.removeListener('changed', this.dataChanged);
  }

  getLocale() {
    const { translate } = this.state;
    return translate.getLocale();
  }

  async setLocale(locale) {
    const { controlled } = this.props;
    if (controlled) {
      throw new Error('LocaleProvider is set as controlled component. If you want to use setLocale please set controlled = false');
    }

    const { translate } = this.state;
    await translate.setLocale(locale);
  }

  t = (path, attrs, defaultValue) => this.get(path, attrs, defaultValue);

  dataChanged = (): void => {
    this.forceUpdate();
  }

  localeChanged = (): void => {
    this.forceUpdate();
  }

  get(path, attrs, defaultValue) {
    const { translate } = this.state;
    return translate.get(path, attrs, defaultValue);
  }

  set(path, value) {
    const { translate } = this.state;
    return translate.set(path, value);
  }

  render() {
    const { children } = this.props;

    return (
      <Provider value={{ localeProvider: this }}>
        {children}
      </Provider>
    );
  }
}
