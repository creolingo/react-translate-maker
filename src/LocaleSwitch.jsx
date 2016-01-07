import React, { Component, PropTypes } from 'react';
import LocaleProvider from './LocaleProvider';

export default class LocaleSwitch extends Component {
  static contextTypes = {
    ...LocaleProvider.childContextTypes,
  };

  static propTypes = {
    locales: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    setLocale: PropTypes.bool,
  };

  handleChange(evn) {
    evn.stopPropagation();

    const nodes = evn.target.options || [];

    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      if (!node.selected) {
        continue;
      }

      const value = node.value;
      if (!value) {
        continue;
      }

      if (this.props.onChange) {
        this.props.onChange(value);
      }

      if (this.props.setLocale) {
        const translate = this.context.translate;
        translate.setLocale(value);
      }

      return;
    }
  }

  render() {
    const translate = this.context.translate;
    const locale = translate.getLocale();
    const { locales } = this.props;

    return (
      <select
        className={this.props.className}
        name={this.props.name}
        value={locale}
        disabled={this.props.disabled}
        onChange={this.handleChange.bind(this)}>
          {locales.map((option, pos) => {
            return <option value={option.locale} key={pos}>{option.label}</option>;
          })}
      </select>
    );
  }
}
