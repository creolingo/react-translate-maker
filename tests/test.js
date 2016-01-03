import should from 'should';
import Translate, { LocaleProvider, TranslateHTML, Memory, Namespace } from '../dist';
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';

const ProviderFactory = React.createFactory(LocaleProvider);
const TranslateFactory = React.createFactory(Translate);
const TranslateHTMLFactory = React.createFactory(TranslateHTML);
const NamespaceFactory = React.createFactory(Namespace);

describe('Translate', () => {
  it('should be able to create simple instance', () => {
    const result = render(ProviderFactory({
      locale: 'sk',
      adapter: {
        sk: {
          test: 'Test response',
        },
      },
    }, TranslateFactory({
      path: 'test',
    })));

    result.should.equal('<span>Test response</span>');
  });

  it('should be able to create element h1', () => {
    const result = render(ProviderFactory({
      locale: 'sk',
      adapter: {
        sk: {
          test: 'Test response',
        },
      },
    }, TranslateFactory({
      path: 'test',
      tagName: 'h1',
    })));

    result.should.equal('<h1>Test response</h1>');
  });

  it('should be able to use variable inside translation', () => {
    const result = render(ProviderFactory({
      locale: 'sk',
      adapter: {
        sk: {
          hello: 'Hello {$name}',
        },
      },
    }, TranslateFactory({
      path: 'hello',
      name: 'Zlatko',
    })));

    result.should.equal('<span>Hello Zlatko</span>');
  });

  it('should be able to use params instead of props', () => {
    const result = render(ProviderFactory({
      locale: 'sk',
      adapter: {
        sk: {
          hello: 'Hello {$name}',
        },
      },
    }, TranslateFactory({
      path: 'hello',
      params: {
        name: 'Zlatko',
      }
    })));

    result.should.equal('<span>Hello Zlatko</span>');
  });

  it('should be able to use props for custom element', () => {
    const result = render(ProviderFactory({
      locale: 'sk',
      adapter: {
        sk: {
          hello: 'Hello {$className}',
        },
      },
    }, TranslateFactory({
      path: 'hello',
      className: 'Zlatko',
      props: {
        className: 'testik'
      }
    })));

    result.should.equal('<span class="testik">Hello Zlatko</span>');
  });

  it('should be able to use html content', () => {
    const result = render(ProviderFactory({
      locale: 'sk',
      adapter: {
        sk: {
          hello: 'Welcome back <b>{$name}</b>. How is it going?',
        },
      },
    }, TranslateHTMLFactory({
      path: 'hello',
      name: 'Zlatko',
    })));

    result.should.equal('<span>Welcome back <b>Zlatko</b>. How is it going?</span>');
  });

  it('should be able to use filters', () => {
    const result = render(ProviderFactory({
      locale: 'sk',
      adapter: {
        sk: {
          hello: 'Hello {$name | star}',
        },
      },
      filters: {
        star: (value) => '*** ' + value + ' ***',
      },
    }, TranslateFactory({
      path: 'hello',
      name: 'Zlatko',
    })));

    result.should.equal('<span>Hello *** Zlatko ***</span>');
  });

  it('should be able to use namespace', () => {
    const result = render(ProviderFactory({
      locale: 'sk',
      adapter: {
        sk: {
          namespace: {
            test: 'Test response',
          },
        },
      },
    }, NamespaceFactory({
      path: 'namespace',
    }, TranslateFactory({
      path: 'test',
    }))));

    result.should.equal('<span>Test response</span>');
  });

  it('should be able to use namespace inside namespace', () => {
    const result = render(ProviderFactory({
      locale: 'sk',
      adapter: {
        sk: {
          namespace1: {
            namespace2: {
              test: 'Test response',
            },
          },
        },
      },
    }, NamespaceFactory({
      path: 'namespace1',
    }, NamespaceFactory({
      path: 'namespace2',
    }, TranslateFactory({
      path: 'test',
    })))));

    result.should.equal('<span>Test response</span>');
  });

  it('should be able to use namespace inside namespace with replace', () => {
    const result = render(ProviderFactory({
      locale: 'sk',
      adapter: {
        sk: {
          namespace: {
            test: 'Test response',
          },
        },
      },
    }, NamespaceFactory({
      path: 'namespace1',
    }, NamespaceFactory({
      path: 'namespace',
      replace: true,
    }, TranslateFactory({
      path: 'test',
    })))));

    result.should.equal('<span>Test response</span>');
  });
});
