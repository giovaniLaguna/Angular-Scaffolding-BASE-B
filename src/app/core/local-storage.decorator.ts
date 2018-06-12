/**
 * prefixo ultilizado (pelos decorators) nas chaves do local storage e session storage
 */
export let prefix: string = 'Seb_Remuneracao_';

/**
 * Decorator utlizado para fezer bind de uma propriedade ao LocalSotrage
 * @param customName nome customizado, por padrão o nome ultilizado é o mesmo da propriedade
 * @param isPrefixed Argumento opcional que indica se sera utilizado o prefixo padrão
 */
export function LocalStorage(customName?: string, isPrefixed = true) {
  return function (
    target, // The prototype of the class
    decoratedPropertyName: string // The name of the property
  ) {

    // get and set methods
    Object.defineProperty(target, decoratedPropertyName, {
      get: function () {
        return JSON.parse(localStorage.getItem(getKeyName(customName, decoratedPropertyName, isPrefixed)));
      },
      set: function (newValue) {
        localStorage.setItem(getKeyName(customName, decoratedPropertyName, isPrefixed), JSON.stringify(newValue));
      }
    });
  }
}

/**
 * Decorator utlizado para fezer bind de uma propriedade ao SessionStorage
 * @param customName nome customizado, por padrão o nome ultilizado é o mesmo da propriedade
 * @param isPrefixed Argumento opcional que indica se sera utilizado o prefixo padrão
 */
export function SessionStorage(customName?: string, isPrefixed = true) {
  return function (
    target, // The prototype of the class
    decoratedPropertyName: string // The name of the property
  ) {

    // get and set methods
    Object.defineProperty(target, decoratedPropertyName, {
      get: function () {
        return JSON.parse(sessionStorage.getItem(getKeyName(customName, decoratedPropertyName, isPrefixed)));
      },
      set: function (newValue) {
        sessionStorage.setItem(getKeyName(customName, decoratedPropertyName, isPrefixed), JSON.stringify(newValue));
      }
    });
  }
}

/**
 * "Calcula" o nome da key usado pelos decorators
 * @param customName nome customizado, por padrão o nome ultilizado é o mesmo da propriedade
 * @param decoratedPropertyName nome da propriedade decorada
 * @param isPrefixed determina se deve ultilizar o prefixo
 * @description este é um método auxiliar, a lógica deste método é usada tanto no decorator de local storage quanto no de session storage
 */
function getKeyName(customName: string, decoratedPropertyName: string, isPrefixed = true) {
  let keyName = customName || decoratedPropertyName;
  if (isPrefixed) keyName = prefix + keyName;

  return keyName;
}
