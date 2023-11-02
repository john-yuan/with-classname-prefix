import { classNames, withClassNamePrefix } from '../src/index'

describe('classNames', () => {
  test('should generating empty string if the value is falsy', () => {
    expect(classNames(false, 0, NaN, null, undefined, '')).toBe('')
  })

  test('should generating empty string if the value is `true`', () => {
    expect(classNames(true)).toBe('')
  })

  test('arguments is optional', () => {
    expect(classNames()).toBe('')
  })

  test('should generating classname with mixed value', () => {
    expect(classNames(1, 2, 3)).toBe('1 2 3')

    expect(classNames('foo', { bar: true })).toBe('foo bar')

    expect(classNames('foo', '', true, false, 0, NaN, null, undefined, 'bar'))
      .toBe('foo bar')

    expect(classNames(null, ['foo', 0, ['bar', [{ baz: 1 }], false], '']))
      .toBe('foo bar baz')

    expect(classNames({
      a: 0,
      b: 1,
      c: 2,
      d: null,
      e: undefined,
      f: NaN
    })).toBe('b c')
  })
})

describe('withClassNamePrefix', () => {
  test('should use the specified separator', () => {
    expect(withClassNamePrefix('ui')('btn')).toBe('ui-btn')
    expect(withClassNamePrefix('ui', '')('--btn')).toBe('ui--btn')
    expect(withClassNamePrefix('ui', '__')('btn')).toBe('ui__btn')
  })

  test('should add prefix', () => {
    expect(withClassNamePrefix('ui')('btn')).toBe('ui-btn')
  })

  test('should add prefix to each classname', () => {
    expect(withClassNamePrefix('ui')('btn btn-primary'))
      .toBe('ui-btn ui-btn-primary')
  })

  test('should add prefix to mixed classname', () => {
    expect(
      withClassNamePrefix('ui')(false, null, undefined, ['btn'], {
        'btn-primary': true,
        'btn-secondary': 0
      })
    ).toBe('ui-btn ui-btn-primary')
  })

  test('should add raw classname', () => {
    const cls = withClassNamePrefix('ui')

    expect(cls.raw('my-btn').prefixed('btn')).toBe('my-btn ui-btn')
  })

  test('should resolve mixed argument for the raw method', () => {
    const cls = withClassNamePrefix('ui')

    expect(
      cls.raw([[['my-btn']]], null, false, [undefined, {}]).prefixed('btn')
    ).toBe('my-btn ui-btn')
  })

  test('should add prefix as raw classname', () => {
    const cls = withClassNamePrefix('ui')

    expect(cls.root().prefixed('theme-dark')).toBe('ui ui-theme-dark')
    expect(cls.root().raw('my-ui').prefixed('theme-light')).toBe('ui my-ui ui-theme-light')
  })

  test('toString should return string', () => {
    const cls = withClassNamePrefix('ui')

    expect(cls.root().raw('my-ui').toString()).toBe('ui my-ui')
  })
})

describe('README.md', () => {
  test('usage', () => {
    const cls = withClassNamePrefix('ui')

    expect(cls('btn')).toBe('ui-btn')
    expect(cls('btn', false, null, undefined, 0, NaN, '')).toBe('ui-btn')
    expect(cls(['btn', 0, false], null, undefined, [NaN, [''], []])).toBe('ui-btn')

    expect(
      cls('btn btn-default')
    ).toBe('ui-btn ui-btn-default')

    expect(
      cls('btn', 'btn-default')
    ).toBe('ui-btn ui-btn-default')

    expect(
      cls('btn', {
        'btn-default': true,
        'btn-primary': false,
        'btn-secondary': 0
      })
    ).toBe('ui-btn ui-btn-default')

    expect(cls.raw('custom-btn').toString()).toBe('custom-btn')

    expect(cls.raw('custom-btn').prefixed('btn')).toBe('custom-btn ui-btn')

    expect(
      cls.raw({
        'custom-btn': true,
        'custom-btn-default': 1,
        'custom-btn-primary': 0
      }).prefixed('btn')
    ).toBe('custom-btn custom-btn-default ui-btn')

    expect(
      cls.root().prefixed('theme-dark')
    ).toBe('ui ui-theme-dark')

    expect(
      cls.raw('custom-theme').root().prefixed('theme-dark')
    ).toBe('custom-theme ui ui-theme-dark')

    expect(
      classNames('foo', { bar: true })
    ).toBe('foo bar')

    expect(
      classNames('foo', '', true, false, 0, NaN, null, undefined, 'bar')
    ).toBe('foo bar')

    expect(
      classNames(null, ['foo', 0, ['bar', [{ baz: 1 }], false], ''])
    ).toBe('foo bar baz')

    const cls1 = withClassNamePrefix('ui', '__')
    expect(cls1('btn')).toBe('ui__btn')

    const cls2 = withClassNamePrefix('ui', '')
    expect(cls2('--btn')).toBe('ui--btn')
  })
})
