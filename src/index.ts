type Arg = string | number | boolean | undefined | null | Record<string, any>;
type Args = Arg | Arg[];

const toString = Object.prototype.toString
const hasOwn = Object.prototype.hasOwnProperty
const isObject = (v: any) => toString.call(v) === '[object Object]'

const withClassNamePrefix = (prefix: string, separator = '-') => {
  return (...args: Args[]) => {
    let className = ''

    const addNext = (arg: Args) => {
      if (arg) {
        if (typeof arg === 'string') {
          arg.split(/\s+/).forEach((name) => {
            if (name) {
              className = className
                ? className + ' ' + prefix + separator + name
                : prefix + separator + name
            }
          })
        } else if (typeof arg === 'number') {
          addNext('' + arg)
        } else if (Array.isArray(arg)) {
          arg.forEach(addNext)
        } else if (isObject(arg)) {
          const object = arg as any
          for (const prop in object) {
            if (object[prop] && hasOwn.call(object, prop)) {
              addNext(prop)
            }
          }
        }
      }
    }

    addNext(args)

    return className
  }
}

export default withClassNamePrefix
