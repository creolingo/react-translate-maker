import React, { Component } from 'react';
import TranslateMaker from 'translate-maker';
import Translate, {
  provideTranslations,
  LocaleProvider,
  TranslateHTML,
  Namespace,
  LocaleSwitch,
} from '../src';
import { shallow, mount, render } from 'enzyme';

describe('Translate', () => {
  it('should be able to create simple instance', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          test: 'Test response',
        },
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="test" />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Test response</span>');
  });

  it('should be able to create simple instance with default value', () => {
    const wrapper = mount(
      <LocaleProvider locale="sk_SK">
        <Translate path="test" defaultValue="Default value" />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Default value</span>');
  });

  it('should be able to create simple instance with default value as children', () => {
    const wrapper = mount(
      <LocaleProvider locale="sk_SK">
        <Translate path="test">
          Default value
        </Translate>
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Default value</span>');
  });

  it('should be able to create element h1', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          test: 'Test response',
        },
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="test" defaultValue="Default value" tagName="h1" />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<h1>Test response</h1>');
  });

  it('should be able to use variable inside translation', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          hello: 'Hello {$name}',
        },
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="hello" name="Zlatko" />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Hello Zlatko</span>');
  });

  it('should be able to use plurals inside translation', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          followers: `{$name} has {$followers, plural,
            =0 {no followers}
            =1 {# follower}
               {# followers}
          }`,
        },
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="followers" name="Zlatko" followers={0} />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Zlatko has no followers</span>');
  });

  it('should be able to use params instead of props', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          hello: 'Hello {$name}',
        },
      },
    });

    await translate.setLocale('sk_SK');

    const user = {
      name: 'Zlatko',
    };

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="hello" params={user} />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Hello Zlatko</span>');
  });

  it('should be able to use props for custom element', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          hello: 'Hello {$className}',
        },
      },
    });

    await translate.setLocale('sk_SK');

    const props = {
      className: 'testik'
    };

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="hello" className="Zlatko" props={props} />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span class="testik">Hello Zlatko</span>');
  });

  it('should be able to use html content', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          hello: 'Welcome back <b>{$name}</b>. How is it going?',
        },
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <TranslateHTML path="hello" name="Zlatko" />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Welcome back <b>Zlatko</b>. How is it going?</span>');
  });

  it('should be able to use filters', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          hello: 'Hello {$name | star}',
        },
      },
      filters: {
        star: (value) => '*** ' + value + ' ***',
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="hello" name="Zlatko" />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Hello *** Zlatko ***</span>');
  });

  it('should be able to use namespace', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          namespace: {
            test: 'Test response',
          },
        },
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Namespace path="namespace">
          <Translate path="test" />
        </Namespace>
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Test response</span>');
  });

  it('should be able to change namespace', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          namespace1: {
            test: 'Test response',
          },
          namespace2: {
            test: 'Test response2',
          },
        },
      },
    });

    await translate.setLocale('sk_SK');

    const Main = ({ namespace }) => (
      <LocaleProvider locale="sk_SK" translate={translate}>
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

  it('should be able to use namespace inside namespace', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          namespace1: {
            namespace2: {
              test: 'Test response',
            },
          },
        },
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Namespace path="namespace1">
          <Namespace path="namespace2" compose>
            <Translate path="test" />
          </Namespace>
        </Namespace>
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Test response</span>');
  });

  it('should be able to use namespace inside namespace with replace', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          namespace: {
            test: 'Test response',
          },
        },
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Namespace path="namespace1">
          <Namespace path="namespace">
            <Translate path="test" />
          </Namespace>
        </Namespace>
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<span>Test response</span>');
  });

  it('should be able to use LocaleSwitch as uncontrolled component', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          test: 'Testovacia odpoved',
        },
        en_US: {
          test: 'Test response',
        },
      },
    });

    await translate.setLocale('sk_SK');

    const locales = [{
      locale: 'sk_SK',
      label: 'Slovencina',
    }, {
      locale: 'en_US',
      label: 'English',
    }];

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate} controlled={false}>
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

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(wrapper.find('span').html()).toBe('<span>Test response</span>');
  });

  it('should be able to use LocaleSwitch as controlled component', (done) => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          test: 'Testovacia odpoved',
        },
        en_US: {
          test: 'Test response',
        },
      },
    });

    translate.setLocale('sk_SK').then(() => {
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
        <LocaleProvider locale={locale} translate={translate} controlled={false}>
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
  });

  it('should be able to use t decorator', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          test: 'Testovacia odpoved',
        },
      },
    });

    await translate.setLocale('sk_SK');

    @provideTranslations
    class Test extends Component {
      render () {
        return (
          <div>{this.props.t('test')}</div>
        );
      }
    }

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Test />
      </LocaleProvider>
    );

    expect(wrapper.html()).toBe('<div>Testovacia odpoved</div>');
  });

  it('should be able to other components as props', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          test: 'Testovacia odpoved {$link}',
        },
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" translate={translate}>
        <TranslateHTML path="test" link={<a>Asdf</a>} />
      </LocaleProvider>
    ));

    expect(wrapper.html()).toBe('<span>Testovacia odpoved <a>Asdf</a></span>');
  });

  it('should be able to other components as props with Translate', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          test: 'Testovacia odpoved {$link}',
          inner: '123',
        },
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" translate={translate}>
        <TranslateHTML path="test" link={<a>Asdf <Translate path="inner" /></a>} />
      </LocaleProvider>
    ));

    expect(wrapper.html()).toBe('<span>Testovacia odpoved <a>Asdf <span>123</span></a></span>');
  });

  it('should be able to use namespace', async () => {
    const translate = new TranslateMaker({
      data: {
        sk_SK: {
          namespace: {
            test: 'Testovacia odpoved',
          },
        },
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" namespace="namespace" translate={translate}>
        <Namespace path="namespace">
          <TranslateHTML path="test" />
        </Namespace>
      </LocaleProvider>
    ));

    expect(wrapper.html()).toBe('<span>Testovacia odpoved</span>');
  });
});
