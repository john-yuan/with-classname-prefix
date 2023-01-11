# README

A simple function to add prefix to classnames.

## Install

```bash
# via npm
npm i with-classname-prefix

# via yarn
yarn i with-classname-prefix

# via pnpm
pnpm i with-classname-prefix
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
