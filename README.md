# react-translate-maker

Universal internationalization (i18n) open source library for React. This library is part of [translate-maker](https://github.com/CherrySoftware/translate-maker).
Star this project on [GitHub][github-url].

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

[npm-image]: https://img.shields.io/npm/v/react-translate-maker.svg?style=flat-square
[npm-url]: https://www.npmjs.com/react-translate-maker
[travis-image]: https://img.shields.io/travis/CherrySoftware/react-translate-maker/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/CherrySoftware/react-translate-maker
[coveralls-image]: https://img.shields.io/coveralls/CherrySoftware/react-translate-maker/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/CherrySoftware/react-translate-maker?branch=master
[github-url]: https://github.com/CherrySoftware/react-translate-maker


# Installation

Install via npm.

```sh
npm install react-translate-maker
```

# Features

- Build on standards ([ICU Message syntax](http://userguide.icu-project.org/formatparse/messages), [Unicode CLDR](http://cldr.unicode.org/))
- Support for 190+ languages
- Runs in the browser and Node.js
- JSON Structure
- Nested and reference translations
- Variables
- Conditioned translations (Plural, Gender etc...)
- Filters capitalize, upperCase, lowerCase etc... and custom filters
- Default translations
- Integrates with [React](https://github.com/CherrySoftware/react-translate-maker) and [Angular](https://github.com/CherrySoftware/angular-translate-maker)
- For more details and examples click on [translate-maker](https://github.com/CherrySoftware/translate-maker)

# Support us

Star this project on [GitHub][github-url].

# Usage

### Basic example

```js
import React from 'react';
import Translate { LocaleProvider } from 'react-translate-maker';

const currentLocale = 'en_US';
const data = {
  en_US: {
    hello: 'Hello {$user.name}',
    followers: `{$user.name} has {$user.followers, plural,
      zero {no followers}
      one  {# follower}
           {# followers}
    }`
  }
};

const user = {
  name: 'Zlatko',
  followers: 15
};

React.render(
  <LocaleProvider adapter={data} locale={currentLocale}>
    <Translate path="hello" user={user} tagName="h1"/>
    <Translate path="followers" user={user} />
  </LocaleProvider>
);
```

The result will be


```html
<h1>Hello Zlatko</h1>
<span>Zlatko has 15 followers</span>
```

### File adapter

If you want to load localisation files automatically with the require function you can use File adapter.

#### File structure

```
project
│  component.jsx
└──locales
   │  en_US.js
```

#### en_US.js

```js
export default {
  gender: `{$gender, select, male {boy} female {girl}}`,
  working: `{gender, $user1.gender as gender | capitalize} {$user1.name} is working with
    {gender, $user2.gender as gender} {$user2.name}`
};
```

#### component.jsx

```js
import React from 'react';
import Translate { LocaleProvider, Gender, Adapters } from 'react-translate-maker';
import path from 'path';

const currentLocale = 'en_US';
const adapter = new Adapters.File({
  path: path.join(__dirname, '/locales')
});

const user1 = {
  gender: Gender.MALE,
  name: 'Zlatko'
};

const user1 = {
  gender: Gender.FEMALE,
  name: 'Livia'
};

React.render(
  <LocaleProvider adapter={adapter} locale={currentLocale}>
    <Translate path="working" user1={user1} user2={user2} />
  </LocaleProvider>
);
```

The result will be


```html
<span>Boy Zlatko is working with girl Livia</span>
```

### File adapter and webpack

If you want to use webpack with file adapter you need to use own function getFile. You need to use getFile instead of path because you need to change the webpack context.

#### component.jsx

```js
import React from 'react';
import Translate { LocaleProvider, Gender, Adapters } from 'react-translate-maker';

const currentLocale = 'en_US';
const adapter = new Adapters.File({
  getFile: (locale, namespace) => require('./locale/' + locale),
});

const user1 = {
  gender: Gender.MALE,
  name: 'Zlatko'
};

const user1 = {
  gender: Gender.FEMALE,
  name: 'Livia'
};

React.render(
  <LocaleProvider adapter={adapter} locale={currentLocale}>
    <Translate path="working" user1={user1} user2={user2} />
  </LocaleProvider>
);
```

### Custom props for component

You can provide own props. For example style.

```js
import React from 'react';
import Translate { LocaleProvider } from 'react-translate-maker';

const currentLocale = 'en_US';
const data = {
  en_US: {
    welcome: 'Welcome back'
  }
};

const props = {
  style: {
    color: 'red'
  }
};

React.render(
  <LocaleProvider adapter={data} locale={currentLocale}>
    <Translate path="welcome" props={props} />
  </LocaleProvider>
);
```

The result will be

```html
<span style="color: red;">Welcome back</span>
```

### Property className

If you want to change only className you can do that directly. This option is available only for className property because all properties are used as arguments for the translation.

```js
import React from 'react';
import Translate { LocaleProvider } from 'react-translate-maker';

const currentLocale = 'en_US';
const data = {
  en_US: {
    welcome: 'Welcome back'
  }
};

React.render(
  <LocaleProvider adapter={data} locale={currentLocale}>
    <Translate path="welcome" className="small" />
  </LocaleProvider>
);
```

The result will be

```html
<span class="small">Welcome back</span>
```

### Tag name

You can change span to other tag. For this purpose there is a property named tagName.

```js
import React from 'react';
import Translate { LocaleProvider } from 'react-translate-maker';

const currentLocale = 'en_US';
const data = {
  en_US: {
    welcome: 'Welcome back'
  }
};

React.render(
  <LocaleProvider adapter={data} locale={currentLocale}>
    <Translate path="welcome" tagName="h1" />
  </LocaleProvider>
);
```

The result will be

```html
<h1>Welcome back</h1>
```

### Placeholder and direct translations

If you want to use translation function directly in your component. You can do that with the "t" function. This function has same arguments like the original "get" function from the translate-maker.

```js
t(path, args, defaultValue) || t(path, defaultValue)
```

```js
import React, { Component } from 'react';
import { LocaleProvider } from 'react-translate-maker';

class MyComponent extends Component {
  render() {
    const t = this.context.t;

    return (
      <input type="text" placeholder={t('inputSearch', 'Search...')} />
    );
  }
}

MyComponent.contextTypes = {
  t: PropTypes.func.isRequired,
};

const currentLocale = 'en_US';
const data = {
  en_US: {
    inputSearch: 'Search'
  }
};

React.render(
  <LocaleProvider adapter={data} locale={currentLocale}>
    <MyComponent />
  </LocaleProvider>
);
```

The result will be

```html
<input type="text" placeholder="Search" />
```

### Namespaces

Sometimes when you are using dot notation you can stack with long paths. For example: header.navigation.button.login. You can use component named Namespace which will help you to simplify your jsx file.

```js
import React from 'react';
import Translate { LocaleProvider, Namespace } from 'react-translate-maker';

const currentLocale = 'en_US';
const data = {
  en_US: {
    header: {
      navigation: {
        title: 'MyProject',
        button: {
         login: 'Log In',
         signup: 'Sign Up'
        }
      }
    }
  }
};

React.render(
  <LocaleProvider adapter={data} locale={currentLocale}>
    <Namespace path="header.navigation">
      <nav>
        <ul>
          <li><Translate path="button.login" /></li>
          <li><Translate path="button.signup" /></li>
        </ul>
      </nav>
    </Namespace>
  </LocaleProvider>
);
```

### Namespace with compose component

```js
import React from 'react';
import Translate { LocaleProvider, Namespace } from 'react-translate-maker';

const currentLocale = 'en_US';
const data = {
  en_US: {
    header: {
      navigation: {
        title: 'MyProject',
        button: {
         login: 'Log In',
         signup: 'Sign Up'
        }
      }
    }
  }
};

React.render(
  <LocaleProvider adapter={data} locale={currentLocale}>
    <Namespace path="header.navigation">
      <h1><Translate path="title" /></h1>
      <nav>
        <Namespace path="button" compose={true}>
        <ul>
          <li><Translate path="login" /></li>
          <li><Translate path="signup" /></li>
        </ul>
        </Namespace>
      </nav>
    </Namespace>
  </LocaleProvider>
);
```

### HTML content

Sometimes you need to provide HTML content.

```js
import React from 'react';
import { LocaleProvider, TranslateHTML } from 'react-translate-maker';

const currentLocale = 'en_US';
const data = {
  en_US: {
    welcome: 'Welcome back <b>{$user.name}</b>. How is it going?'
  }
};

const user = {
  name: 'Zlatko'
};

React.render(
  <LocaleProvider adapter={data} locale={currentLocale}>
    <TranslateHTML path="welcome" user={user} />
  </LocaleProvider>
);
```

The result will be

```html
<span>Welcome back <b>Zlatko</b>. How is it going?</span>
```

### Locale switch

We are providing a component for the locale switch. It a select with everything what do you need.

```js
import React from 'react';
import Translate { LocaleProvider, LocaleSwitch } from 'react-translate-maker';

const currentLocale = 'en_US';

const data = {
  en_US: {
    button: {
     login: 'Log In',
     signup: 'Sign Up'
    }
  }
};

const locales = [{
  label: 'English',
  value: 'en_US'
}, {
  label: 'Slovenčina',
  value: 'sk_SK'
}];

React.render(
  <LocaleProvider adapter={data} locale={currentLocale}>
    <nav>
      <ul>
        <li><Translate path="button.login" /></li>
        <li><Translate path="button.signup" /></li>
        <li>Lanaguage <LocaleSwitch locales={locales} /></li>
      </ul>
    </nav>
  </LocaleProvider>
);
```

#### Properties of the LocaleSwitch

 - **onChange** (function): Callback witch a new locale
 - **setLocale** (Boolean): It will set locale automatically in the translate-maker after change (default: true)
 - **locales** (array): Array of the available locales. [{ label: 'English', value: 'en_US' }]
 - all properties of the standard select component


### Filters

Sometimes you need to provide HTML content.

```js
import React from 'react';
import Translate, { LocaleProvider } from 'react-translate-maker';

const currentLocale = 'en_US';
const data = {
  en_US: {
    welcome: 'Welcome {$user.name | star}'
  }
};

const filters = {
  star: function star(value) {
    return '*** ' + value + ' ***';
  }
};

const user = {
  name: 'Zlatko'
};

React.render(
  <LocaleProvider adapter={data} locale={currentLocale} filters={filters}>
    <Translate path="welcome" user={user} />
  </LocaleProvider>
);
```

The result will be

```html
<span>Welcome *** Zlatko ***</span>
```

### Options of Locale Provider

 - **locale** (String): Current locale ID (default null)
 - **locales** (Array): List of available locales IDs (default null)
 - **cache** (Instance of Cache): Cache of the translations (default MemoryCache)
 - **adapter** (Instance of Adapter | data): Adapter provides translations (default see option defaultAdapter)
 - **defaultAdapter** (Class of Adapter): Default adapter (default MemoryAdapter)
 - **dotNotation** (Boolean): You can turn of dot notation. This is useful if you are using PO translation files (default true)
 - **mode** (Enum): You can use full compatible ICU version with Mode.ICU. After that you can use external variables witout dolar character (Default Mode.MAIN)
 - **references** (Boolean): You can turn on/off references. (Default true)
 - **variables** (Boolean): You can turn on/off variables. (Default true)
 - **combinations** (Boolean): You can turn on/off combinations. (Default true)
 - **defaultValue** (Function): What you will see for missing translations (Default (path, attrs) => `Missing default translation for: ${path}`)
 - **filters** (Object): Object with custom filters

### More examples

Please take a look on [translate-maker](https://github.com/CherrySoftware/translate-maker)

## Roadmap

 - [ ] Locales property of the LocaleSwitch can be an object
 - [ ] Locales property of the LocaleSwitch can be autopopulated from the adapter
 - [ ] Locales property of the LocaleSwitch can be translated automatically by translate-maker

# Support us

Star this project on [GitHub][github-url].

# Running Tests

To run the test suite, first invoke the following command within the repo, installing the development dependencies:

```sh
npm install
```

Then run the tests:

```sh
npm test
```
