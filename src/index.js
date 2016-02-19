import LocaleProvider from './LocaleProvider';
import Translate from './Translate';
import Namespace from './Namespace';
import TranslateHTML from './TranslateHTML';
import LocaleSwitch from './LocaleSwitch';
import provideTranslations from './provideTranslations';
import TranslateMaker, { Plural, Gender, Mode, Adapters, Caches } from 'translate-maker';

export { LocaleProvider, TranslateHTML, Namespace, LocaleSwitch, provideTranslations };
export { Plural, Gender, Mode, Adapters, Caches, Translate, TranslateMaker };

export default Translate;
