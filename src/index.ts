export type ClassNameArg = Record<string, any> | string | false | null | undefined

export interface ClassNamePrefixFunction {
  (...args: ClassNameArg[]): string
  raw: (...rawArgs: ClassNameArg[]) => {
    toString: () => string
    addPrefixed: (...args: ClassNameArg[]) => string
  }
}

const resolveClassNames = (args: ClassNameArg[]) => {
  const classNames: string[] = []

  const putString = (str: string) => {
    str.split(/\s+/).forEach((name) => {
      if (name && classNames.indexOf(name) === -1) {
        classNames.push(name)
      }
    })
  }

  args.forEach((arg) => {
    if (typeof arg === 'string') {
      putString(arg)
    } else if (arg) {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          putString(key)
        }
      })
    }
  })

  return classNames
}

export const withClassNamePrefix = (prefix: string, separator?: string) => {
  const sep = typeof separator === 'string' ? separator : '-'
  const fn: ClassNamePrefixFunction = (...args: ClassNameArg[]) => {
    return resolveClassNames(args)
      .map((name) => `${prefix}${sep}${name}`)
      .join(' ')
  }

  fn.raw = (...rawArgs: ClassNameArg[]) => {
    const classNames = resolveClassNames(rawArgs)
    return {
      addPrefixed: (...args: ClassNameArg[]) => {
        classNames.push(fn(...args))
        return classNames.join(' ')
      },
      toString: () => classNames.join(' ')
    }
  }

  return fn
}

export default withClassNamePrefix
