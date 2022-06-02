//autobind decorat or
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  let originalMethod = descriptor.value;
  let adjustedMethod: PropertyDescriptor = {
    configurable: true,
    get() {
      let boundfn = originalMethod.bind(this);
      return boundfn;
    },
  };
  return adjustedMethod;
}
