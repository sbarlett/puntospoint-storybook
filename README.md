## Nuevas acciones ante un Deploy a partir de v1.143.57

Se debe realizar los siguientes pasos para que el Deploy funcione correctamente: 

-   Se crea una rama por componente con el nombre/ruta del componente.
-   Cuando se finaliza el desarrollo borrar el /src/index.tsx y el package-lock.json `rm -rf src/index.tsx package-lock.json ` (importante usar npm y solo npm para todo el proyecto).
-   Se sube la version en el package.json y se actualiza el CHANGELOG.md.
-   Se corre un `npm i` para volver a generar el package-lock.json.
-   Ahora y punto muy importante se corre un `npm run export-components` para generar el index.tsx
-   `npm run build` para comprobar que el build funciona correctamente.
-   `npm run test` para comprobar que todos los tests pasen de manera exitosa.
-   Se pushea la rama, open merge y posterior Merge a Develop.

Muy importante seguir estos pasos y en ese orden de lo contrario el deploy no funcionará correctamente.


# Way of Working

En la siguiente documentacion se detalla un flujo de trabajo sugerido para desarrollar la libreria de componentes
_movistar-ui_.

# Desarrollo

Tener en cuenta antes de empezar un desarrollo en fijarse si ya existe ese componente. Para esto, pueden entrar a Zeplin
y fijarse si esta el componente conectado, o entrar en el storybook, o entrar en el trello y fijarse si hay una tarjeta
de ese componente.

## Trello

La herramienta de Trello la utilizamos para tener un seguimiento de los componentes que desarrollamos. Tambien se usa
para estar sincronizados entre devs en cuanto a los componentes, para no pisarnos y en caso de que haya dos mesas que
usan un mismo componente se pone en la columna de _ALTA PRIORIDAD_ asi el dev que lo hace lo desarrolla lo mas rapido
posible. Despues, cada columna es autoexplicativa.

**TODOS LOS COMPONENTES TIENEN QUE TENER SU TARJETA EN TRELLO.** Esto es para tener buen seguimiento de lo desarrollado.

## Estructura de carpetas/archivos

Cada componente va a estar contenido dentro de `src/`, en la misma ruta que especifica su nombre en zeplin. Por ejemplo
el componente [Ι🔒Resources/ListsAmount/Left/Secondary14R](https://zpl.io/bWZ3oOK) lo vamos a desarrollar en la ruta
`/src/Resources/ListsAmount/Left/Secondary14R` y el arbol de archivos que vamos a generar en esa carpeta sera el
siguiente:
```
- index.tsx
- Secondary14R.tsx
- Secondary14R.stories.tsx
- Secondary14R.styles.ts
- Secondary14R.test.tsx
```

## Gitflow

-   Se crea una rama por componente con el nombre/ruta del componente.
-   Cuando se finaliza el desarrollo chequear cual es la ultima version publicada de la libreria e incrementar la
    version correspondiente con `npm version (patch || minor || major)`.
-   Se conecta el componente con Zeplin como se detalla en [este documento](##Conexion-de-componentes-con-Zeplin).
-   Se hace un merge request a `develop` y si es necesario se asigna un revisor de codigo.

## Conexion de componentes con Zeplin

1. Hacer un `npm install` para instalar las dependencias de Zeplin necesarias. _(@zeplin/cli,
   @zeplin/cli-connect-react-plugin, @zeplin/cli-connect-storybook-plugin)_.
2. [OPCIONAL] Instalar [extension de zeplin](vscode:extension/zeplin.zeplin) en VSCode.
3. Abrir el archivo `components.json` ubicado en la carpeta `.zeplin`.
4. Editamos el array `components: []` agregando un nuevo objeto que contenga el _path_ relativo del `.tsx` del
   componente y el nombre del componente tal como figura en el zeplin. Si ya tienen la extension de Zeplin para VSCode
   instalada, van a ver que la misma extension les ofrece la opcion de **Add components** (para buscar el componente en
   `src/` y extraer el _path_) y **Connect to Zeplin Components** (para buscar el componente en la libreria de Zeplin y
   extrar el _zeplinName_ ).

```json
{
    ...

    "components": [
        {
            "path": "src/Resources/ListsAmount/Left/Primary14R/Primary14R.tsx",
            "zeplinNames": ["Controls / Button / Primary"]
        }
    ],

    ...
}
```

El _zeplinName_ tambien lo podemos encontrar en zeplin:

![alt text](https://github.com/zeplin/connected-components-docs/blob/master/img/zeplinComponents.png?raw=true 'Logo Title Text 1')

6. Una vez que termine el pipeline y se levante el Storybook en Openshift ya se puede correr el comando `npm run zeplin`
   para terminar de conectar los componentes con el codigo en VSCode y con StoryBook. Probablemente la primera vez que
   lo hagan les va a pedir pass y usr de zeplin.

## Prueba local de los componentes

1. Hacer un `npm run build` de la libería para compilar los componentes.
2. Hacer un `npm pack` para generar un paquete **.tgz** en la raiz del repositorio. El nombre del paquete se corresponde al _name_ y _version_ que tengas en tu `package.json` (por ejemplo, _telefonica-movistar-ui-0.x.x.tgz_).
3. Mover el paquete generado a la raiz del proyecto de React donde lo quieras probar con el comando `mv telefonica-movistar-ui-0.x.x.tgz {path-proyecto}`.
4. Dentro de tu proyecto de React, instalar el paquete recién generado con el comando `npm i ./telefonica-movistar-ui-0.x.x.tgz`.
   
## Versionado Semántico

La propuesta con respecto al versionado es usar como referencia el estandar de versionado semantico
([SemVer](https://semver.org/lang/es/)) y/o adaptarlo en la medida que veamos que es necesario. Tendriamos una version
con 3 campos: **MAJOR.MINOR.PATCH**

-   Por cada nuevo fix/patch a cualquiera de los componentes de la version actual, que sea retrocompatible, se va a
    incrementar en 1 la **PATCH** version (`npm version patch`).
-   Si se introducen nuevos componentes/funcionalidades tambien compatibles con la version actual, se incrementa la
    **MINOR** version en 1 y se reseta el PATCH a 0 (este reset ya lo hace solo _npm_ si usan el comando
    `npm version minor` para incrementar la version).
-   Para la **primer version estable** de la libreria, se incrementara la **MAJOR** version de 0.x.x a 1.0.0 y se
    resetean minor y patch a 0 (`npm version major`). Queda a definir que criterios vamos a usar para publicar esta
    version.
-   Por cada nuevo cambio que **no sea compatible** con la version anterior de la libreria se incrementa la **MAJOR**
    version en 1 y se sugiere documentar los nuevos cambios de la API en un
    **[CHANGELOG.md](https://keepachangelog.com/es-ES/1.0.0/)**.
    ([ejemplo](https://github.com/olivierlacan/keep-a-changelog/blob/master/CHANGELOG.md))

## Funcion del pipeline

El pipeline es el encargado de ejecutar los tests, publicar la nueva version de la libreria y ademas de deployar el
Storybook con el nuevo componente. Todo esto se hace automaticamente cuando se _pushea_ a la rama `develop` (Por nuestro
gitflow, se hace una nueva rama y despues se hace un merge request. Una vez mergeada la nueva rama en develop se ejecuta
el pipeline automaticamente)

# Instalación y utilización de la libreria

## Instalación

1. Tener visibilidad de https://devops.movistar.com.ar/gitlab en la intranet (vpn).
2. Crear archivo `.npmrc` o `.yarnrc` _(dependiendo del manejador de paquetes que se use)_ con la sigiente
   linea/registry: `@telefonica:registry=https://devops.movistar.com.ar/gitlab/api/v4/packages/npm/`
3. Ejecutar comando `npm install @telefonica/movistar-ui` o con yarn `yarn add @telefonica/movistar-ui`

## Utilización

Se importa el componente con la base de `@telefonica/movistar-ui/dist` y despues el nombre completo del componente. Las
carpetas tienen un index, por lo que no hace falta llamar al componente .tsx en especifico. Por ejemplo, el import del
componente `Bars/NavBar/Contextual` sería `@telefonica/movistar-ui/dist/Bars/NavBar/Contextual`

Ej práctico:

```JSX
import React from 'react';
import Contextual from '@telefonica/movistar-ui/dist/Bars/NavBar/Contextual';

export default function Header(props){
    ...
    return <Contextual onBackButtonPress={props.onBackButtonPress} title={props.title}/>
}
```

# Links utiles:

-   **_Movistar Ui Storybook:_** http://movistar-ui-movistar-ui.apps.ocpnp.cuyorh.tcloud.ar/
-   **_Movistar Ui Paas/Openshift (servidores, pipelines, tasks) (Cuyo):_**
    https://console-openshift-console.apps.ocpnp.cuyorh.tcloud.ar/topology/ns/movistar-ui/graph
-   **_Movistar Ui Zeplin:_** https://app.zeplin.io/styleguide/5fc01140cde681b5d1efb51a/components
-   **_Movistar Ui Repo/Gitlab:_** https://devops.movistar.com.ar/gitlab/telefonica/movistar-ui
-   **_Movistar Ui Trello:_** https://trello.com/b/BOqu1BDv/componentes
-   **_Movistar Ui Trello Invite:_** https://trello.com/invite/b/BOqu1BDv/01450ce3efeae556419c884524e1c62a/componentes

_Readme version: 1.0_

## Upgrade

Se modifica el `package-lock.json` para que la version sea la que se está usando en el momento de la instalación y corran los pipelines.
