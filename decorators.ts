function i18nD(name: string, literals: any) {
  return function <T extends {new(...args:any[]):{}}>(constructor: T) {
    class Decorated extends constructor {
      @State() private currentLanguage: string;
      constructor(...args: any[]) {
        I18n.addNamespace(name, literals);
        I18n.onChangeLanguage(() => {
          this.currentLanguage = I18n.currentLanguage;
          console.log(this.currentLanguage);
        });
        super(args);
      }
    }
    return Decorated;
  }
}
@i18nD('RegisterForm', i18n)

function i18nProp(name: string, literals: any) {
  // Property value.
  // Property getter.
  // console.log(this);
return function (target: any, propertyKey: string | symbol) {
    const getter = function () {
      return this[propertyKey];
    };
    // Property setter.
    const setter = function (newVal) {
      this[propertyKey] = newVal;
      this['Area'] = this[propertyKey] * this[propertyKey] * Math.PI;
      this['Circumference'] = 2 * this[propertyKey] * Math.PI;
    };
    // Delete property.
    if (delete this[propertyKey]) {
      // Create new property with getter and setter
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }
    // console.log(target);
    // I18n.addNamespace(name, literals);
    // I18n.onChangeLanguage(() => {
    //   this[propertyKey] = I18n.currentLanguage;
    // });
  }
}
@i18nProp('RegisterForm', i18n)
