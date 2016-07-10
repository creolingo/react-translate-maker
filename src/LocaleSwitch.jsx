import React, { Component, PropTypes } from 'react';
import LocaleProvider from './LocaleProvider';

export default class LocaleSwitch extends Component {
  static contextTypes = {
    ...LocaleProvider.childContextTypes,
  };

  static defaultProps = {
    setLocale: true,
  };

  static propTypes = {
    locales: PropTypes.array.isRequired,
    setLocale: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onError: PropTypes.func,
  };

  handleChange(evn) {
    evn.stopPropagation();

    const { locales, onChange, onError, setLocale } = this.props;
    const translate = this.context.translate;

    const value = evn.target.value;

    for (let index = 0; index < locales.length; index++) {
      const { locale, label } = locales[index];
      if (locale !== value) {
        continue;
      }

      if (setLocale && !translate.props.controlled) {
        translate.setLocale(locale, (err) => {
          if (err && onError) {
            onError(err);
          }
        });
      }

      if (onChange) {
        onChange(locale);
      }

      return;
    }
  }

  render() {
    const translate = this.context.translate;
    const locale = translate.getLocale();
    const { locales } = this.props;

    const selectProps = {
      ...this.props,
    };

    delete selectProps.setLocale;
    delete selectProps.locales;

    return (
      <select
        {...selectProps }
        value={locale}
        onChange={this.handleChange.bind(this)}>
          {locales.map((option, pos) => {
            return <option value={option.locale} key={pos}>{option.label}</option>;
          })}
      </select>
    );
  }
}
