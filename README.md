# with-classname-prefix

[![npm version](https://img.shields.io/npm/v/with-classname-prefix)](https://www.npmjs.com/package/with-classname-prefix)
[![install size](https://packagephobia.now.sh/badge?p=with-classname-prefix)](https://packagephobia.now.sh/result?p=with-classname-prefix)
[![npm downloads](https://img.shields.io/npm/dm/with-classname-prefix.svg)](http://npm-stat.com/charts.html?package=with-classname-prefix)

A simple function to add prefix to classnames.

## Install

```sh
npm i with-classname-prefix
```

## Usage

```ts
import { withClassNamePrefix } from 'with-classname-prefix'

const cls = withClassNamePrefix('ui')

cls('btn') // "ui-btn"
cls('btn btn-default') // "ui-btn ui-btn-default"
cls('btn', 'btn-default') // "ui-btn ui-btn-default"
cls('btn', false, null, undefined) // "ui-btn"
cls('btn', {
  'btn-default': true,
  'btn-primary': false
}) // "ui-btn ui-btn-default"

cls.raw('custom-btn').toString() // "custom-btn"
cls.raw('custom-btn').addPrefixed('btn') // "custom-btn ui-btn"
cls.raw({
  'custom-btn': true,
  'custom-btn-default': 1,
  'custom-btn-primary': 0
}).addPrefixed('btn') // "custom-btn custom-btn-default ui-btn"
```

You can set the separator (the default separator is `-`) by passing the second parameter:

```ts
import { withClassNamePrefix } from 'with-classname-prefix'

const cls1 = withClassNamePrefix('ui', '__')
cls1('btn') // ui__btn

// unset the default separator (-)
const cls2 = withClassNamePrefix('ui', '')
cls2('--btn') // ui--btn
```

## License

[MIT](https://github.com/john-yuan/with-classname-prefix/blob/main/LICENSE)
