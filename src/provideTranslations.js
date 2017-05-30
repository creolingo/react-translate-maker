import PropTypes from 'prop-types';
import createProvider from 'react-provide-props';

export default createProvider('TrnaslateProvider', (props, context) => ({
  t: context.t,
}), {
}, {
  t: PropTypes.func.isRequired,
});
