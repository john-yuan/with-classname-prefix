import { withClassNamePrefix } from '../src/index'

it('should add prefix correctly', () => {
  const cls = withClassNamePrefix('ui')
  expect(cls('btn')).toBe('ui-btn')
})

it('should add prefix to all classnames', () => {
  const cls = withClassNamePrefix('ui')
  expect(cls('btn btn-default')).toBe('ui-btn ui-btn-default')
})

it('should work with multiple arguments', () => {
  const cls = withClassNamePrefix('ui')
  expect(cls('btn', 'btn-default')).toBe('ui-btn ui-btn-default')
})

it('should use the given separator', () => {
  const cls = withClassNamePrefix('ui', '__')
  expect(cls('btn')).toBe('ui__btn')
  expect(cls('btn btn-default')).toBe('ui__btn ui__btn-default')
})

it('should ignore empty string, false, null and undefine', () => {
  const cls = withClassNamePrefix('ui')
  expect(cls('btn', '', false, null, undefined)).toBe('ui-btn')
})

it('should work with object', () => {
  const cls = withClassNamePrefix('ui')
  expect(cls({
    btn: true,
    'btn-default': true,
    'btn-primary': false
  })).toBe('ui-btn ui-btn-default')
})

it('should work with mixed argument types', () => {
  const cls = withClassNamePrefix('ui')
  expect(cls('btn-shape-rounded', null, false, undefined, {
    btn: true,
    'btn-primary': false
  }, {
    'btn-default': true
  })).toBe('ui-btn-shape-rounded ui-btn ui-btn-default')
})

it('should not add prefix to raw classnames', () => {
  const cls = withClassNamePrefix('ui')

  expect(cls.raw('custom-btn').toString()).toBe('custom-btn')
  expect(cls.raw('custom-btn', 'custom-btn-default')
    .toString())
    .toBe('custom-btn custom-btn-default')

  expect(cls.raw({
    'custom-btn': true,
    'custom-btn-default': 1,
    'custom-btn-primary': 0
  }).addPrefixed('btn')).toBe('custom-btn custom-btn-default ui-btn')
})

it('should combine prefixed classnames with raw classnames', () => {
  const cls = withClassNamePrefix('ui')
  expect(cls.raw('custom-btn').addPrefixed('btn')).toBe('custom-btn ui-btn')
})
