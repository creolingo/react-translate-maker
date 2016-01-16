import React from 'react';
import should from 'should';
import Translate, { LocaleProvider, TranslateHTML, Memory, Namespace, LocaleSwitch } from '../dist';
import { renderJSX } from '../utils/tester';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe('Translate', () => {
  it('should be able to create simple instance', () => {
    const adapter = {
      sk_SK: {
        test: 'Test response',
      },
    };

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="test" />
      </LocaleProvider>
    );

    findDOMNode(node).nodeName.should.equal('SPAN');
    findDOMNode(node).innerHTML.should.equal('Test response');
  });

  it('should be able to create simple instance with default value', () => {
    const adapter = {};

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="test" defaultValue="Default value" />
      </LocaleProvider>
    );

    findDOMNode(node).nodeName.should.equal('SPAN');
    findDOMNode(node).innerHTML.should.equal('Default value');
  });

  it('should be able to create element h1', () => {
    const adapter = {
      sk_SK: {
        test: 'Test response',
      },
    };

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="test" defaultValue="Default value" tagName="h1" />
      </LocaleProvider>
    );

    findDOMNode(node).nodeName.should.equal('H1');
    findDOMNode(node).innerHTML.should.equal('Test response');
  });

  it('should be able to use variable inside translation', () => {
    const adapter = {
      sk_SK: {
        hello: 'Hello {$name}',
      },
    };

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="hello" name="Zlatko" />
      </LocaleProvider>
    );

    findDOMNode(node).innerHTML.should.equal('Hello Zlatko');
  });

  it('should be able to use plurals inside translation', () => {
    const adapter = {
      sk_SK: {
        followers: `{$name} has {$followers, plural,
          =0 {no followers}
          =1 {# follower}
             {# followers}
        }`
      },
    };

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="followers" name="Zlatko" followers={0} />
      </LocaleProvider>
    );

    findDOMNode(node).innerHTML.should.equal('Zlatko has no followers');
  });

  it('should be able to use params instead of props', () => {
    const adapter = {
      sk_SK: {
        hello: 'Hello {$name}',
      },
    };

    const user = {
      name: 'Zlatko',
    };

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="hello" params={user} />
      </LocaleProvider>
    );

    findDOMNode(node).innerHTML.should.equal('Hello Zlatko');
  });

  it('should be able to use props for custom element', () => {
    const adapter = {
      sk_SK: {
        hello: 'Hello {$className}',
      },
    };

    const props = {
      className: 'testik'
    };

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="hello" className="Zlatko" props={props} />
      </LocaleProvider>
    );

    findDOMNode(node).innerHTML.should.equal('Hello Zlatko');
    findDOMNode(node).getAttribute('class').should.equal('testik');
  });

  it('should be able to use html content', () => {
    const adapter = {
      sk_SK: {
        hello: 'Welcome back <b>{$name}</b>. How is it going?',
      },
    };

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <TranslateHTML path="hello" name="Zlatko" />
      </LocaleProvider>
    );

    findDOMNode(node).innerHTML.should.equal('Welcome back <b>Zlatko</b>. How is it going?');
  });

  it('should be able to use filters', () => {
    const adapter = {
      sk_SK: {
        hello: 'Hello {$name | star}',
      },
    };

    const filters = {
      star: (value) => '*** ' + value + ' ***',
    };

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter} filters={filters}>
        <Translate path="hello" name="Zlatko" />
      </LocaleProvider>
    );

    findDOMNode(node).innerHTML.should.equal('Hello *** Zlatko ***');
  });

  it('should be able to use namespace', () => {
    const adapter = {
      sk_SK: {
        namespace: {
          test: 'Test response',
        },
      },
    };

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Namespace path="namespace">
          <Translate path="test" />
        </Namespace>
      </LocaleProvider>
    );

    findDOMNode(node).innerHTML.should.equal('Test response');
  });

  it('should be able to use namespace inside namespace', () => {
    const adapter = {
      sk_SK: {
        namespace1: {
          namespace2: {
            test: 'Test response',
          },
        },
      },
    };

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Namespace path="namespace1">
          <Namespace path="namespace2" compose>
            <Translate path="test" />
          </Namespace>
        </Namespace>
      </LocaleProvider>
    );

    findDOMNode(node).innerHTML.should.equal('Test response');
  });

  it('should be able to use namespace inside namespace with replace', () => {
    const adapter = {
      sk_SK: {
        namespace: {
          test: 'Test response',
        },
      },
    };

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Namespace path="namespace1">
          <Namespace path="namespace">
            <Translate path="test" />
          </Namespace>
        </Namespace>
      </LocaleProvider>
    );

    findDOMNode(node).innerHTML.should.equal('Test response');
  });

  it('should be able to use LocaleSwitch as uncontrolled component', () => {
    const adapter = {
      sk_SK: {
        test: 'Testovacia odpoved',
      },
      en_US: {
        test: 'Test response',
      },
    };

    const locales = [{
      locale: 'sk_SK',
      label: 'Slovencina',
    }, {
      locale: 'en_US',
      label: 'English',
    }];

    const node = renderJSX(
      <LocaleProvider locale="sk_SK" adapter={adapter} controlled={false}>
        <div>
          <Translate path="test" />
          <LocaleSwitch locales={locales} onError={(err) => {
            throw err;
          }}/>
        </div>
      </LocaleProvider>
    );

    findDOMNode(node).querySelector('span').innerHTML.should.equal('Testovacia odpoved');

    const select = findDOMNode(node).querySelector('select');
    TestUtils.Simulate.change(select, { target: { value: 'en_US' } });

    findDOMNode(node).querySelector('span').innerHTML.should.equal('Test response');
  });

  it('should be able to use LocaleSwitch as controlled component', (done) => {
    const adapter = {
      sk_SK: {
        test: 'Testovacia odpoved',
      },
      en_US: {
        test: 'Test response',
      },
    };

    const locales = [{
      locale: 'sk_SK',
      label: 'Slovencina',
    }, {
      locale: 'en_US',
      label: 'English',
    }];

    function handleChange(newLocale) {
      const node = createNode(newLocale);
      findDOMNode(node).querySelector('span').innerHTML.should.equal('Test response');

      done();
    }

    function createNode(locale) {
      return renderJSX(
        <LocaleProvider locale={locale} adapter={adapter}>
          <div>
            <Translate path="test" />
            <LocaleSwitch locales={locales} onChange={handleChange} onError={(err) => {
              throw err;
            }}/>
          </div>
        </LocaleProvider>
      );
    }

    const node = createNode('sk_SK');
    findDOMNode(node).querySelector('span').innerHTML.should.equal('Testovacia odpoved');

    const select = findDOMNode(node).querySelector('select');
    TestUtils.Simulate.change(select, { target: { value: 'en_US' } });
  });
});
