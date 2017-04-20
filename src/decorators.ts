export function singleton(target: any): any {
  let instance: any;
  // a utility function to generate instances of a class
  function construct(constructor: any, args: any) {
    function c() {
      constructor.apply(this, args);
    }
    c.prototype = constructor.prototype;
    return new c();
  }
  // save a reference to the original constructor
  const ctor = (...args: any[]) => {
    instance = instance || construct(target, args);
    return instance;
  };

  ctor.prototype = Object.create(target.prototype);
  return ctor;
}
