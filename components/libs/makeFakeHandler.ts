/**
 * Make a fake event handler for use in Storybook tests.
 * Example:
 *
 * <Blah onChange={makeFakeHandler('onChange')} />
 */
export function makeFakeHandler(name: string) {
  // eslint-disable-next-line no-console
  return (...args: any[]) => console.log(name, ...args);
}
