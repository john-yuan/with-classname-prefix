# with-classname-prefix

[![npm version](https://img.shields.io/npm/v/with-classname-prefix)](https://www.npmjs.com/package/with-classname-prefix)
[![install size](https://packagephobia.now.sh/badge?p=with-classname-prefix)](https://packagephobia.now.sh/result?p=with-classname-prefix)
[![npm downloads](https://img.shields.io/npm/dm/with-classname-prefix.svg)](https://npm-stat.com/charts.html?package=with-classname-prefix)

A simple function to add prefix to classnames.

## Install

```sh
npm i with-classname-prefix
```

## Usage

```ts
import { classNames, withClassNamePrefix } from 'with-classname-prefix'

const cls = withClassNamePrefix('ui')

// ui-btn
cls('btn')
cls('btn', false, null, undefined, 0, NaN, '')
cls(['btn', 0, false], null, undefined, [NaN, [''], []])

// ui-btn ui-btn-default
cls('btn btn-default')
cls('btn', 'btn-default')
cls('btn', {
  'btn-default': true,
  'btn-primary': false,
  'btn-secondary': 0
})

// custom-btn
cls.raw('custom-btn').toString()

// custom-btn ui-btn
cls.raw('custom-btn').prefixed('btn')

// custom-btn custom-btn-default ui-btn
cls.raw({
  'custom-btn': true,
  'custom-btn-default': 1,
  'custom-btn-primary': 0
}).prefixed('btn')

// ui ui-theme-dark
cls.root().prefixed('theme-dark')

// foo bar
classNames('foo', { 'bar': true })

// foo bar
classNames('foo', '', true, false, 0, NaN, null, undefined, 'bar')

// foo bar baz
classNames(null, ['foo', 0, ['bar', [{ 'baz': 1 }], false], ''])
```

You can set the separator (the default separator is `-`) by passing the second parameter of `withClassNamePrefix`:

```ts
import { withClassNamePrefix } from 'with-classname-prefix'

const cls1 = withClassNamePrefix('ui', '__')
cls1('btn') // ui__btn

// unset the default separator (-)
const cls2 = withClassNamePrefix('ui', '')
cls2('--btn') // ui--btn
```

## License

[MIT](./LICENSE)
