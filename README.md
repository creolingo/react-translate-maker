# react-translate-maker

Universal translation library for React. This library is part of [translate-maker](https://github.com/CherrySoftware/translate-maker).

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

[npm-image]: https://img.shields.io/npm/v/react-translate-maker.svg?style=flat-square
[npm-url]: https://www.npmjs.com/CherrySoftware/react-translate-maker
[travis-image]: https://img.shields.io/travis/CherrySoftware/react-translate-maker/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/CherrySoftware/react-translate-maker
[coveralls-image]: https://img.shields.io/coveralls/CherrySoftware/react-translate-maker/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/CherrySoftware/react-translate-maker?branch=master


# Installation

Install via npm.

```sh
npm install translate-maker
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

# Usage

### Basic example

```js
import React from 'react';
import Translate { LocaleProvider } from 'react-translate-maker';

const currentLocale = 'en';
const locales = {
  en: {
    hello: 'Hello {$user.name}',
    followers: `{$user.name} has {$user.followers, plural
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
  <LocaleProvider locales={locales} locale={currentLocale}>
    <Translate path="hello" user={user} tagName="h1"/>
    <Translate path="followers" user={user} />
  </LocaleProvider>
);
```

The result will be


```js
<h1>Hello Zlatko</h1>
<span>Zlatko has 15 followers</span>
```

### Complex example

```js
import React from 'react';
import Translate { LocaleProvider, Gender } from 'react-translate-maker';

const currentLocale = 'en';
const locales = {
  en: {
    gender: `{$gender, select, male {boy} female {girl}}`,
    working: `{gender, $user1.gender as gender | capitalize} {$user1.name} is working with
      {gender, $user2.gender as gender} {$user2.name}`
  }
};

const user1 = {
  gender: Gender.MALE,
  name: 'Zlatko'
};

const user1 = {
  gender: Gender.FEMALE,
  name: 'Livia'
};

React.render(
  <LocaleProvider locales={locales} locale={currentLocale}>
    <Translate path="working" user1={user1} user2={user2} />
  </LocaleProvider>
);
```

The result will be


```js
<span>Boy Zlatko is working with girl Livia</span>
```

### Custom props for component

You can provide own props. For example className.

```js
import React from 'react';
import Translate { LocaleProvider } from 'react-translate-maker';

const currentLocale = 'en';
const locales = {
  en: {
    welcome: 'Welcome back',
  }
};

const props = {
  className: 'my-class-name'
};

React.render(
  <LocaleProvider locales={locales} locale={currentLocale}>
    <Translate path="welcome" props={props} />
  </LocaleProvider>
);
```


The result will be


```js
<span class="my-class-name">Welcome back</span>
```

### More examples

Please take a look on [translate-maker](https://github.com/CherrySoftware/translate-maker)


# Running Tests

To run the test suite, first invoke the following command within the repo, installing the development dependencies:

```sh
npm install
```

Then run the tests:

```sh
npm test
```
