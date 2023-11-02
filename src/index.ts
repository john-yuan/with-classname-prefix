export type ClassNameArg =
  | Record<string, any>
  | number
  | string
  | boolean
  | null
  | undefined
  | ClassNameArg[]

function resolveClassName (arg: ClassNameArg) {
  let className = ''

  if (arg) {
    if (typeof arg === 'string' || typeof arg === 'number') {
      className += arg
    } else if (Array.isArray(arg)) {
      for (let i = 0; i < arg.length; i += 1) {
        const val = resolveClassName(arg[i])
        val && className && (className += ' ')
        className += val
      }
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg[key]) {
          className && (className += ' ')
          className += key
        }
      }
    }
  }

  return className
}

/**
 * Generate `className` string conditionally.
 *
 * @example
 *
 * // foo bar
 * classNames('foo', { 'bar': true })
 *
 * // foo bar
 * classNames('foo', '', true, false, 0, NaN, null, undefined, 'bar')
 *
 * // foo bar baz
 * classNames(null, ['foo', 0, ['bar', [{ 'baz': 1 }], false], ''])
 */
export function classNames (...args: ClassNameArg[]) {
  return resolveClassName(args)
}

export class ClassNameBuilder {
  private _p: string // prefix
  private _s: string // separator
  private _c: string[] // classname array

  constructor (prefix: string, separator: string) {
    this._p = prefix
    this._s = separator
    this._c = []
  }

  /**
   * Add the prefix as a raw classname.
   */
  root () {
    this._c.push(this._p)
    return this
  }

  /**
   * Add raw classnames. These classnames will not be prefixed.
   */
  raw (...args: ClassNameArg[]) {
    resolveClassName(args).split(/\s+/).forEach((name) => {
      if (name) {
        this._c.push(name)
      }
    })
    return this
  }

  /**
   * Add classnames. These classnames will be prefixed.
   * This function will return the final classname.
   */
  prefixed (...args: ClassNameArg[]) {
    const prefix = this._p
    const separator = this._s
    resolveClassName(args).split(/\s+/).forEach((name) => {
      if (name) {
        this._c.push(prefix + separator + name)
      }
    })
    return this._c.join(' ')
  }

  /**
   * Get the final classname.
   */
  toString () {
    return this._c.join(' ')
  }
}

export interface ClassNamePrefixFunction {
  /**
   * Add classnames. These classnames will be prefixed.
   * This function will return the final classname.
   */
  (...args: ClassNameArg[]): string

  /**
   * Add raw classnames. These classnames will not be prefixed.
   */
  raw: (...args: ClassNameArg[]) => ClassNameBuilder

  /**
   * Add the prefix as a raw classname.
   */
  root: () => ClassNameBuilder
}

/**
 * Create a function that generating prefixed `className` string conditionally.
 *
 * @example
 * const cls = withClassNamePrefix('ui')
 *
 * // ui-btn ui-btn-primary
 * cls('btn', { 'btn-primary': true })
 *
 * // my-btn ui-btn
 * cls.raw('my-btn').prefixed('btn')
 *
 * // ui ui-theme-dark
 * cls.root().prefixed('theme-dark')
 *
 * @param prefix Specify the prefix.
 * @param separator Specify the separator, the default value is `'-'`.
 * @returns returns a `ClassNamePrefixFunction`.
 */
export function withClassNamePrefix (prefix: string, separator?: string) {
  const sep = typeof separator === 'string' ? separator : '-'
  const fn: ClassNamePrefixFunction = function classNamePrefix (...args: ClassNameArg[]) {
    let className = ''
    resolveClassName(args).split(/\s+/).forEach((name) => {
      if (name) {
        className && (className += ' ')
        className += (prefix + sep + name)
      }
    })
    return className
  }

  fn.raw = (...args: ClassNameArg[]) => new ClassNameBuilder(prefix, sep).raw(args)
  fn.root = () => new ClassNameBuilder(prefix, sep).root()

  return fn
}
