import withClassNamePrefix from '../src/index'

it('should add ui prefix', () => {
  const ns = withClassNamePrefix('ui')
  expect(ns('btn')).toBe('ui-btn')
})

it('should add prefix to each name separated by whitespace', () => {
  const ns = withClassNamePrefix('ui')
  expect(ns('btn btn-primary')).toBe('ui-btn ui-btn-primary')
})

it('should add prefix to each name in the arguments', () => {
  const ns = withClassNamePrefix('ui')
  expect(ns('btn', 'btn-primary')).toBe('ui-btn ui-btn-primary')
})

it('should add prefix to each name in the array', () => {
  const ns = withClassNamePrefix('ui')
  expect(ns(['btn', 'btn-primary'])).toBe('ui-btn ui-btn-primary')
})

it('should filter out falsy values', () => {
  const ns = withClassNamePrefix('ui')
  expect(ns('btn', 0, false, null, undefined, '')).toBe('ui-btn')
})

it('should filter out booleans', () => {
  const ns = withClassNamePrefix('ui')
  expect(ns('btn', true, false)).toBe('ui-btn')
})

it('should add prefix to numbers except zero', () => {
  const ns = withClassNamePrefix('ui')
  expect(ns('btn', 0, 1, 2)).toBe('ui-btn ui-1 ui-2')
})

it('should filter out invalid values', () => {
  const ns = withClassNamePrefix('ui')
  expect(ns('btn', () => {}, /regexp/, new Date())).toBe('ui-btn')
})

it('should add prefix to each key of the object which point to a truthy value', () => {
  const ns = withClassNamePrefix('ui')
  expect(ns({
    a: true,
    b: true,
    c: false
  })).toBe('ui-a ui-b')
})

it('should work with nested arrays', () => {
  const ns = withClassNamePrefix('ui')
  expect(ns([
    'a',
    ['b'],
    [['c']],
    false,
    null,
    undefined,
    0,
    1,
    {
      2: true,
      3: false,
      4: null
    }
  ])).toBe('ui-a ui-b ui-c ui-1 ui-2')
})

it('should work with any number of arguments', () => {
  const ns = withClassNamePrefix('ui')
  expect(ns('a', 'b c', ['d', 'e f'], 0, 1, 2, false, null, undefined, {
    'g h': true,
    i: false,
    j: true
  })).toBe('ui-a ui-b ui-c ui-d ui-e ui-f ui-1 ui-2 ui-g ui-h ui-j')
})

it('should work with object array', () => {
  const ns = withClassNamePrefix('ui')
  expect(ns([
    { btn: true },
    {
      'btn-primary': true,
      'btn-danger': false
    }
  ])).toBe('ui-btn ui-btn-primary')
})

it('should work with specified separator', () => {
  const ns = withClassNamePrefix('ui', '__')
  expect(ns('btn')).toBe('ui__btn')
})

it('should work with empty separator', () => {
  const ns = withClassNamePrefix('ui', '')
  expect(ns('--btn')).toBe('ui--btn')
})
