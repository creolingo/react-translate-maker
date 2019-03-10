import React, { Component } from 'react';
import TranslateMaker from 'translate-maker';
import { mount } from 'enzyme';
import {
  Translate,
  ProvideTranslate,
  LocaleProvider,
  Namespace,
  LocaleSwitch,
} from './index';

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

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="test" />
      </LocaleProvider>
    ));

    expect(wrapper.text()).toBe('Test response');
  });

  it('should be able to create simple instance with default value', () => {
    const wrapper = mount((
      <LocaleProvider locale="sk_SK">
        <Translate path="test" defaultValue="Default value" />
      </LocaleProvider>
    ));

    expect(wrapper.text()).toBe('Default value');
  });

  it('should be able to create simple instance with default value as children', () => {
    const wrapper = mount((
      <LocaleProvider locale="sk_SK">
        <Translate path="test">
          Default value
        </Translate>
      </LocaleProvider>
    ));

    expect(wrapper.text()).toBe('Default value');
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

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" translate={translate}>
        <h1><Translate path="test" defaultValue="Default value" /></h1>
      </LocaleProvider>
    ));

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

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="hello" name="Zlatko" />
      </LocaleProvider>
    ));

    expect(wrapper.text()).toBe('Hello Zlatko');
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

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="followers" name="Zlatko" followers={0} />
      </LocaleProvider>
    ));

    expect(wrapper.text()).toBe('Zlatko has no followers');
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

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="hello" params={user} />
      </LocaleProvider>
    ));

    expect(wrapper.text()).toBe('Hello Zlatko');
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

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="hello" name="Zlatko" html />
      </LocaleProvider>
    ));

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
        star: value => `*** ${value} ***`,
      },
    });

    await translate.setLocale('sk_SK');

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Translate path="hello" name="Zlatko" />
      </LocaleProvider>
    ));

    expect(wrapper.text()).toBe('Hello *** Zlatko ***');
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

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Namespace path="namespace">
          <Translate path="test" />
        </Namespace>
      </LocaleProvider>
    ));

    expect(wrapper.text()).toBe('Test response');
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
    expect(wrapper.text()).toBe('Test response');

    wrapper.setProps({ namespace: 'namespace2'});
    expect(wrapper.text()).toBe('Test response2');
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

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Namespace path="namespace1">
          <Namespace path="namespace2" compose>
            <Translate path="test" />
          </Namespace>
        </Namespace>
      </LocaleProvider>
    ));

    expect(wrapper.text()).toBe('Test response');
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

    const wrapper = mount((
      <LocaleProvider locale="sk_SK" translate={translate}>
        <Namespace path="namespace1">
          <Namespace path="namespace">
            <Translate path="test" />
          </Namespace>
        </Namespace>
      </LocaleProvider>
    ));

    expect(wrapper.text()).toBe('Test response');
  });

  it('should be able to use LocaleSwitch as uncontrolled component', async () => {
    const data = {
      sk_SK: {
        test: 'Testovacia odpoved',
      },
      en_US: {
        test: 'Test response',
      },
    };

    const translate = new TranslateMaker({
      data,
    });

    await translate.setLocale('sk_SK');

    let changeLocale;

    const wrapper = mount((
      <LocaleProvider data={data} locale="sk_SK" translate={translate} controlled={false}>
        <div>
          <span><Translate path="test" /></span>
          <LocaleSwitch
            onError={(err) => {
              throw err;
            }}
          >
            {(props) => {
              changeLocale = props.changeLocale;
              return null;
            }}
          </LocaleSwitch>
        </div>
      </LocaleProvider>
    ));

    expect(wrapper.text()).toBe('Testovacia odpoved');

    await changeLocale('en_US');

    expect(wrapper.text()).toBe('Test response');
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

    return new Promise((resolve, reject) => {
      let wrapper;

      function handleLocaleChange(newLocale) {
        expect(newLocale).toBe('en_US');
        expect(wrapper.find('span').html()).toBe('<span>Test response</span>');
        resolve();
      }

      let onChange;

      const Main = () => (
        <LocaleProvider translate={translate} controlled={false}>
          <div>
            <span><Translate path="test" /></span>
            <LocaleSwitch
              onChange={handleLocaleChange}
              onError={reject}
            >
              {({ changeLocale }) => {
                onChange = changeLocale;
                return null;
              }}
            </LocaleSwitch>
          </div>
        </LocaleProvider>
      );

      wrapper = mount(<Main />);

      expect(wrapper.find('span').html()).toBe('<span>Testovacia odpoved</span>');

      onChange('en_US');
      // wrapper.find('select').simulate('change', {target: { value : 'en_US'}});
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

    class Test extends Component {
      render () {
        return (
          <div>{this.props.translate('test')}</div>
        );
      }
    }

    const wrapper = mount(
      <LocaleProvider locale="sk_SK" translate={translate}>
        <ProvideTranslate>
          {t => <Test translate={t} />}
        </ProvideTranslate>
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
        <Translate path="test" link={<a>Asdf</a>} html />
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
        <Translate path="test" link={<a>Asdf <Translate path="inner" /></a>} html />
      </LocaleProvider>
    ));

    expect(wrapper.html()).toBe('<span>Testovacia odpoved <a>Asdf 123</a></span>');
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
          <Translate path="test" html />
        </Namespace>
      </LocaleProvider>
    ));

    expect(wrapper.html()).toBe('<span>Testovacia odpoved</span>');
  });
});
