import React, { Component } from 'react';
import Translate, { provideTranslations, LocaleProvider, TranslateHTML, Memory, Namespace, LocaleSwitch } from '../dist';
import { shallow, mount, render } from 'enzyme';

describe('Translate', () => {
  it('should be able to create simple instance', () => {
    const adapter = {
      sk_SK: {
        test: 'Test response',
      },
    };

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="test" />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Test response</span>');
  });

  it('should be able to create simple instance with default value', () => {
    const adapter = {};

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="test" defaultValue="Default value" />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Default value</span>');
  });

  it('should be able to create element h1', () => {
    const adapter = {
      sk_SK: {
        test: 'Test response',
      },
    };

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="test" defaultValue="Default value" tagName="h1" />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<h1>Test response</h1>');
  });

  it('should be able to use variable inside translation', () => {
    const adapter = {
      sk_SK: {
        hello: 'Hello {$name}',
      },
    };

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="hello" name="Zlatko" />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Hello Zlatko</span>');
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

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="followers" name="Zlatko" followers={0} />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Zlatko has no followers</span>');
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

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="hello" params={user} />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Hello Zlatko</span>');
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

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Translate path="hello" className="Zlatko" props={props} />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span class="testik">Hello Zlatko</span>');
  });

  it('should be able to use html content', () => {
    const adapter = {
      sk_SK: {
        hello: 'Welcome back <b>{$name}</b>. How is it going?',
      },
    };

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <TranslateHTML path="hello" name="Zlatko" />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Welcome back <b>Zlatko</b>. How is it going?</span>');
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

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter} filters={filters}>
        <Translate path="hello" name="Zlatko" />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Hello *** Zlatko ***</span>');
  });

  it('should be able to use namespace', () => {
    const adapter = {
      sk_SK: {
        namespace: {
          test: 'Test response',
        },
      },
    };

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Namespace path="namespace">
          <Translate path="test" />
        </Namespace>
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Test response</span>');
  });

  it('should be able to change namespace', () => {
    const adapter = {
      sk_SK: {
        namespace1: {
          test: 'Test response',
        },
        namespace2: {
          test: 'Test response2',
        },
      },
    };

    const Main = ({namespace}) => (
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Namespace path={namespace}>
          <Translate path="test" />
        </Namespace>
      </LocaleProvider>
    );

    const wrapper = mount(<Main namespace="namespace1" />);
    expect(wrapper.html()).toBe('<span>Test response</span>');

    wrapper.setProps({ namespace: 'namespace2'});
    expect(wrapper.html()).toBe('<span>Test response2</span>');
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

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Namespace path="namespace1">
          <Namespace path="namespace2" compose>
            <Translate path="test" />
          </Namespace>
        </Namespace>
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Test response</span>');
  });

  it('should be able to use namespace inside namespace with replace', () => {
    const adapter = {
      sk_SK: {
        namespace: {
          test: 'Test response',
        },
      },
    };

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Namespace path="namespace1">
          <Namespace path="namespace">
            <Translate path="test" />
          </Namespace>
        </Namespace>
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Test response</span>');
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

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter} controlled={false}>
        <div>
          <Translate path="test" />
          <LocaleSwitch locales={locales} onError={(err) => {
            throw err;
          }}/>
        </div>
      </LocaleProvider>
    );

    expect(wrapper.find('span').html()).toBe('<span>Testovacia odpoved</span>');

    wrapper.find('select').simulate('change', {target: { value : 'en_US'}});

    expect(wrapper.find('span').html()).toBe('<span>Test response</span>');
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


    function handleLocaleChange(newLocale) {
      expect(newLocale).toBe('en_US');
      expect(wrapper.find('span').html()).toBe('<span>Test response</span>');
      done();
    }

    const Main = ({ locale }) => (
      <LocaleProvider locale={locale} adapter={adapter} controlled={false}>
        <div>
          <Translate path="test" />
          <LocaleSwitch
            setLocale
            locales={locales}
            onLocaleChange={handleLocaleChange}
            onError={(err) => {
            throw err;
          }}/>
        </div>
      </LocaleProvider>
    );

    const wrapper = mount(<Main locale="sk_SK" />);

    expect(wrapper.find('span').html()).toBe('<span>Testovacia odpoved</span>');

    wrapper.find('select').simulate('change', {target: { value : 'en_US'}});
  });


  it('should be able to use t decorator', () => {
    const adapter = {
      sk_SK: {
        test: 'Testovacia odpoved',
      },
    };

    @provideTranslations
    class Test extends Component {
      render () {
        return (
          <div>{this.props.t('test')}</div>
        );
      }
    }

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <Test />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<div>Testovacia odpoved</div>');
  });

  it('should be able to other components as props', () => {
    const adapter = {
      sk_SK: {
        test: 'Testovacia odpoved {$link}',
      },
    };

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <TranslateHTML path="test" link={<a>Asdf</a>} />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Testovacia odpoved <a>Asdf</a></span>');
  });

  it('should be able to other components as props with Translate', () => {
    const adapter = {
      sk_SK: {
        test: 'Testovacia odpoved {$link}',
        inner: '123',
      },
    };

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" adapter={adapter}>
        <TranslateHTML path="test" link={<a>Asdf <Translate path="inner" /></a>} />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Testovacia odpoved <a>Asdf <span>123</span></a></span>');
  });
});
