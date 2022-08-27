# README

A helper function to create a function that add prefix to its arguments.

Install:

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
import withClassNamePrefix from 'with-classname-prefix'

const ns = withClassNamePrefix('ui')

ns('btn') // ui-btn
ns('btn btn-primary') // ui-btn ui-btn-primary
ns('btn', 'btn-primary') // ui-btn ui-btn-primary
ns(['btn', 'btn-primary']) // ui-btn ui-btn-primary
ns('btn', '', 0, false, null, undefined) // ui-btn ui-btn-primary
ns({
  'btn': true,
  'btn-primary': true,
  'btn-danger': false
}) // ui-btn ui-btn-primary
ns([
  { btn: true },
  {
    'btn-primary': true,
    'btn-danger': false
  }
]) // ui-btn ui-btn-primary
```

You can set the separator (default to `-`) by passing the second parameter:

```ts
import withClassNamePrefix from 'with-classname-prefix'

const ns1 = withClassNamePrefix('ui', '__')
const ns2 = withClassNamePrefix('ui', '') // unset the default separator (-)

ns1('btn') // ui__btn
ns2('--btn') // ui--btn

```
