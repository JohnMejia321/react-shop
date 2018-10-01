# Testing React

Para testear componentes de **React** vamos a necesitar:
- *test runner*: Es el testing framework, ejecuta los tests y nos muestra el resultado.
- *assertion library*: Es la librería que usamos para comparar el valor que *esperabamos* contra el valor que *obtuvimos* (expected vs actual).
- una manera de poder _renderear_ componentes sin tener que recurrir al browser (para que sea de manera automática).

Existen muchas opciones para cada uno de los componentes que necesitamos, en particular nosotros vamos a utilizar:

* Test Runner: **Jest**
* Assertion Library: **Jest**
* Testing Utility: **Enzyme**

## Enzyme

[**Enzyme**](http://airbnb.io/enzyme/) nos va a dar la funcionalidad necesaria para poder manipular y recorrer el __output__ de nuestros componentes de React. Este proyecto fue creado y es mantenido por el equipo de **airbnb**, y su API esta hecha para que sea intuitiva y flexible, imitando las API de **jQuery** (sobretodo las de recorrido y manipulación del DOM).

**Enzyme** ofrece tres funciones básicas para *montar* componentes: *shallow*, *mount* y *render*.

### Set-Up 

> La instalación puede variar dependiendo la versión de React que estemos usando. Para más opciones ver la [documentación](http://airbnb.io/enzyme/docs/installation/).

Vamos a instalar enzyme usando NPM. Necesitamos dos librarías, una es enzyme en sí, y la segunda una interfaz para conectar enzyme con una librería de UI (en este caso React):

`npm i --save-dev enzyme enzyme-adapter-react-16`

La siguiente tabla muestra los adaptadores oficiales de enzyme y su compatiblidad con las distintas versiones de React:

| Enzyme Adapter Package|React semver compatibility|
| ------------- |:-------------:|
| enzyme-adapter-react-16  |^16.4.0-0 |
| enzyme-adapter-react-16.3 | ~16.3.0-0 |
| enzyme-adapter-react-16.2 | ~16.2 |
| enzyme-adapter-react-16.1 | `~16.0.0-0 |
| enzyme-adapter-react-15 | ^15.5.0 |
| enzyme-adapter-react-15.4  | 15.0.0-0 - 15.4.x |
| enzyme-adapter-react-14 | ^0.14.0 |
| enzyme-adapter-react-13 | ^0.13.0 |

### Corriendos Tests

Como dijimos al principio, Enzyme es una herramienta para manipular y recorrer el DOM de Componentes de React. Por esto es que para *correr* los tests vamos a necesitar un *test runner*. En este caso vamos a utilizar **Jest**.

## Jest

Jest es una plataforma de testing desarrollada por el equipo de Facebook, nos va a permitir ejecutar y ver el resultado de nuestros tests.

### Set-Up

Vamos a instalar **Jest** usando npm:

`npm install --save-dev jest`

Si usamos babel 7, tenemos que instalar estas depedencias extras:

`npm install --save-dev babel-jest babel-core@^7.0.0-bridge.0 @babel/core regenerator-runtime`

Como lo instalamos de manera local, para ejecutar los tests podemos invocar jest de la siguiente manera:

`./node_modules/.bin/jest`

O bien, agregar en el `package.json` un nuevo script `test` con el comando a ejecutar (al estar en el package.json no es necesario especificar que el ejecutable esta en la carpeta `.bin`):

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

### Corriendo nuestro primer Test

Vamos a crear una carpeta de tests en el root de nuestro proyecto. Dentro, vamos a crear un archivo `Product.spec.js` que contenga lo siguiente:

```js
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Product from '../Foo';

Enzyme.configure({ adapter: new Adapter() });

describe('Product Component', () => {
    test("renders", () => {
        const wrapper = shallow(<Product />);
        expect(wrapper.exists()).toBe(true);
    });
});

```

Todavía hay cosas que faltan configurar para poder ejecutar nuestro primer test. Primero **Jest** no sabe leer código JSX, por lo tanto vamos a tener que configurar babel para que Jest lo invoque y traspile código. Para esto, nos tenemos que asegurar que exista un archivo de configuración llamado `.babelrc` que contenga lo siguiente:

```json
{
  "presets": ["env", "react"]
}
```
o

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

dependiendo de la forma en que hayamos instalados las dependencias.

También vamos a tener que hacer algo con los imports de `css`, ya estos están pasando por un preprocessor. Lo que vamos a hacer es `mockear` el resultado de esos objectos, para eso vamos a instalar `identity-obj-proxy` con npm:

`npm install --save-dev identity-obj-proxy`

Ahora tenemos que configurar JEST para que cuando importe los archivos con extesión `css`, `less`, y `styl`, los pase por el mockeador que acabamos de instalar. Vamos a agregar lo siguiente al `package.json`:

```json
{
  ...
  "jest": {
    "moduleNameMapper": {
        "\\.(css|less|styl)$": "identity-obj-proxy"
    }
  }
}
```

Bien, ahora estamos listos para ejecutar nuestro primer test. Lo hacemos con:

`npm test`

Si todo salió bien, deberíamos ver algo como lo siguiente:

![ReactTest](https://i.imgur.com/wLWhs5j.png)

### Jest - Globals

Cuando ejecutamos nuestros archivos de test, Jest pone varios métodos en el objeto global, por lo tanto no es necesario importarlos para usarlos.

> En la [documentación](https://jestjs.io/docs/en/api) pueden ver una lista completa de métodos globales.

#### describe

`describe(name, fn)` está función nos sirve para agrupar tests que _traten_ sobre lo mismo en lo que se llama una **suite** de tests.

Por ejemplo, podríamos agrupar todos los tests del componente `Producto` en una suite llamada `Product Component`:

```js
describe('Product Component', () => {
    test("renders", () => {
        //..
    });
    test("do something...", () => {
        //...    
    });
    test("do something else...", () => {
        //...    
    });
});
```
También podemos **anidar** la función describe para crear una jerarquía de tests. Por ejemplo:

```js
describe('Product Component', () => {
    describe('css', () => {
        test("should have some class...", () => {
            //..
        });
        test("should be hidden when...", () => {
            //..
        });
    });
    describe('functionality', () => {
        test("should send a post to...", () => {
            //..
        });
        test("should sum all products price...", () => {
            //..
        });
    });
});
```

Cuando ejecutemos los tests veremos la jerarquía en el ouput:

![ReactTestOutput](https://i.imgur.com/XFyfqwI.png)

#### test

También está bajo el alias: `it(name, fn, timeout)`

Este es el método que ejecuta los tests en sí. El primer argumento es el nombre del test, el segundo es una función donde se espera que se tire un error o no, o sea la función que contiene lo que *espero* del test. El tercer parámetro es opcional, y especifica el *tiempo en milisegundos* a esperar antes de abortar la ejecución de esa función, el valor por defecto es de **5 segundos**.

> **Importante**: si la función `test` devuelve una *Promise*, Jest esperará que la promesa se resuelva para completar el test. 

Por ejemplo, si quisiera testear una función asincrónica, tengo que **retornar** la promesa involucrada.

```js
test('función asincronica', () => {
  return fetchSomething().then(value => {
    expect(value).toBe('something');
  });
});
```

La ejecución de la función test termina luego de invocar la promesa, pero jest sabe que tiene que esperar a que se complete la promesa.

>Si no retornamos la promesa el test siempre fallará con un timeout.

`test` tiene también otro comportamiento particular. Si la `fn` del segundo argumento tiene un argumento (en general se llama `done`), jest le dará el control de cuando termina de ejecutarse un test al usuario. Es decir, el test *terminará cuando se invoque la funcion `done`*. Si `done` es invocada sin argumentos, entonces el test pasa, si es invocada con un argumento el test falla. Esto nos puede servir para testear funciones asincrónicas complejas, o para testar por errores. Por ejemplo:

```js
test('done funcion asincrónica', (done) => {
  function callback(data) {
    expect(data).toBe('something');
    done();
  }

  fetchData(callback);
});
```

En el caso de abajo, queremos testear una función asincrónica que espramos que falle!. Por lo tanto, no retornamos nada en nuestra función `test`, esta va a terminar su ejecución cuando se invoque la funcieon `done`:

```js
test('done testear errores', (done) => {
  AsyncFunction({ ...badArguments })
    .then(() => done(new Error('this should fail!')))
    .catch(() => done());
});
```
## Enzyme Methods

Como dijimos `enzyme` nos provee métodos para poder manipular el DOM. Veamos los métodos que trae para lograr esto:  

### Shallow

Shallow rendering sólo renderea el componente que le pasemos por parámetro, y no sus hijos. Por lo tanto, si cambiamos algo en sus hijos, el output de la función `shallow` no se verá afectado. Por lo tanto, nos va a servir para asegurarnos que *los hijos de un componente no afecten indirectamente al componente que estamos testeando*.

Por ejemplo, este componente:

```
const ButtonWithIcon = ({icon, children}) => (
    <button>
        <Icon icon={icon} />
        {children}
    </button>
);
```

Debería ser rendereado así:

```
<button>
    <i class="icon icon_coffee"></i>
    Hello Jest!
</button>
```

Pero `shallow` lo hará de la siguiente manera:

```
<button>
    <Icon icon="coffee" />
    Hello Jest!
</button>
```

### Render

`render` renderiza un componente y devuelve HTML estático (sólo invoca la función `render` del componente). Está función utiliza la librería `cheerio`, que maneja el parseado y el recorrido de los nodos HTML. *Está función **si** renderiza todos los childrens** del componente.

### Mount

Está función hace un `full DOM rendering`, por lo tanto vamos a necesitar una API del DOM. Es decir, que necesitamos un ambiente que emule a un browser. Para esto está función utiliza un ![`headless browser`](https://en.wikipedia.org/wiki/Headless_browser). Particularmente utiliza la librería `jsdom`, que es básicamente un headless browser implementado completamente en JS.

Con `mount` vamos a poder testear el ciclo de vida completo de un componente.

### Resumen

Cada uno de estos métodos va a invocar al componente de manera distinta, por lo tanto lo usaremos en distintas situaciones. 

Podríamos seguir estas simples reglas para elegir:
* Siempre empezar con `shallow`
* Si tenes que testear `componentDidMount` o `componentDidUpdate` utilizá `mount`.
* Si queres testear el ciclo de vida de un componente y sus childrens, usá `mount`.
* Si querés testear el rendereado de los children de un componente, pero no el ciclo de vida, utilizá `render`.

#### Métodos de cada renderer

Cuando usamos estos métodos, nos proveen a su vez métodos para realizar acciones sobre el componente renderizado. Por ejemplo:

```js
const wrapper = shallow(<MyComponent />);
expect(wrapper.find('.foo')).to.have.lengthOf(1);
expect(wrapper.find('.bar')).to.have.lengthOf(3);
```

Como vemos, el objeto devuelto por `shallow` tiene el método:

`.find(selector) => ShallowWrapper`

este método recibe un selector, y devuelve todos los nodos con lo qué matchee ese selector.

##### SetProps

`.setProps(nextProps[, callback]) => Self`:
Este método setea las props del componente, y re-renderea el mismo. Nos sirve para testear como se comporta el componente cuando cambiamos sus props.
El segundo argumento es un callback que se ejecutará cuando termine de ejecutarse `setProps`.

```js
const wrapper = shallow(<Foo name="foo" />);
expect(wrapper.find('.foo')).to.have.lengthOf(1);
expect(wrapper.find('.bar')).to.have.lengthOf(0);
wrapper.setProps({ name: 'bar' });
expect(wrapper.find('.foo')).to.have.lengthOf(0);
expect(wrapper.find('.bar')).to.have.lengthOf(1);
```

##### SetState

`.setState(nextState[, callback]) => Self`:
Este método invoca `setState()` en el componente, y re-renderiza. Nos servirá para testear cambios en el estado del mismo. La documentación no recomienda llevar un componente al estado que queremos testear de esta forma, si no utilizar el método de la misma instancia, a través de `.instance() => ReactComponent`.

```js
const wrapper = shallow(<Foo />);
expect(wrapper.find('.foo')).to.have.lengthOf(1);
expect(wrapper.find('.bar')).to.have.lengthOf(0);
wrapper.setState({ name: 'bar' });
expect(wrapper.find('.foo')).to.have.lengthOf(0);
expect(wrapper.find('.bar')).to.have.lengthOf(1);
```

##### Simulate

`.simulate(event[, ...args]) => Self`:

Esté método nos sirve para simular un evento en un elemento. El primer argumento es el nombre del evento que queremos simular, por ejemplo `click`, el segundo parámetro es un mock del evento que será pasado al event handler que escucha por ese evento.

> *Nota*: el comportamiento de `simulate` será distinto según el método de render elegido, referirse a la documentación para mayor información.

En realidad existen **muchos** más métodos disponibles, podemos verlos todos [acá](https://airbnb.io/enzyme/docs/api/)
