# GOST ESTRATEGIA SEMANA FINAL

## Descripción

## En este repositorio se docuemntan los escenarios de pruebas que se realizaron para la semana 1 de la estrategia final de pruebas.

### Conformación de Equipo

Apellidos | Nombres  | Emails Uniandes | Usuario GitHub 
-- | -- | -- | -- 
Tarazona Jaimes | Karen Fernanda | k.tarazonaj@uniandes.edu.co  | karentarazonaj |
Piarpuzan Artunduaga | Willian Andres | w.piarpuzan@uniandes.edu.co  | wpiarpuzan |
Arnedo | Orlando | o.arnedoc@uniandes.edu.co | orlandoarnedouniandes |
Wiesner | Helvert | h.wiesner@uniandes.edu.co  | helverinio |

### URL pública de aplicación bajo pruebas: Ghost 5.14.1
versión: 5.14 - http://misoubuntuhw.eastus.cloudapp.azure.com:2368/

### Instalación y ejecución de las pruebas en Kraken
#### Requisitos
* Tener instalado [Android SDK](https://developer.android.com/studio?hl=es-419), y configuradas las variables ADB y AAPT
* Tener instalado Appium
* Tener instalado NodeJS (Versión ≥ 12)
* Tener instalado Java

#### Ejecución de pruebas Kraken
1. Antes de iniciar, valide que se cumplan los requisitos previos para el uso de la herramienta usando en tu consola el siguiente comando: kraken-node doctor
2. Clone el siguiente repositorio https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e.git

3. Ubíquese dentro de la carpeta Kraken
4. Sobre la carpeta Kraken, use el siguiente comando: npm install
5. A continuación, corra las pruebas de la semana 7 usando el siguiente comando: node features/executeKrakenAll_week7.js

#### ResembleJS
1. ResembleJS viene incluido dentro de las dependencias del proyecto, por tanto se instala al correr normalmente el comando npm install que se describe en las instrucciones de instalacion y ejecucion de Kraken para este repositorio
2. Resemble corre automaticamente mientras el proyecto de Kraken ejecuta su analisis y esta  acoplado al proceso de toma de screenshots de forma que al momento de ejecutarse el screenshot que describe el cierre del paso (-after.) se dispara un reporte automatico que compara ese punto especifico dentro de la ejecucion.

### Reporte de pruebas regresión visual- semana 1
#### [Reporte de comparación escenarios](https://helverinio.github.io/comparacionedgechrome/Resemble_Comparacion_2024-05-23_results/)
 
### Instalación y ejecución de las pruebas en Cypress
#### Requisitos
* Tener instalado Cypress 

#### Ejecución de pruebas Cypress
Como parte de la estrategia se incluyeron pruebas automatizadas con el API de automatización cypres con una resolución de pantalla de celular (375x667)

Para ejecutar las pruebas
1. Clone el siguiente repositorio https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e.git
2. Navegue hasta el directorio donde descargó el repositorio
3. Ubíquese dentro de la carpeta Cypress (cd cypress)
4. **Generación de datos: Ejecutar npm i**  para instralar la libreria js-faker. 
5. A continuación, corra las pruebas usando el siguiente comando: cypress run
6. Verifique los resultados.
7. Recuerde que la aplicación bajo pruebas se encuentra desplegada en: http://misoubuntuhw.eastus.cloudapp.azure.com:2368/ (versión 5.14) 
 si desea evidenciar la ejecución de las pruebas puede ingresar a la URL con las siguientes credenciales: User:h.wiesner@uniandes.edu.co; Password: mWxNuDsU5Ng7LD.

#### Versiones utilizadas en el desarrollo de las pruebas
node: 18.13.0
Cypress package version: 13.8.1
Cypress binary version: 13.8.1


### Instalación del Plugin AXE DevTols (Accesibilidad)
* Instale el plugin AXE en su navegador, está disponible para Chrome (https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd).
* En el caso de Chrome, luego de haber instalado el plugin, vaya a las herramientas para desarrolladores (ubicadada en el menú Más herramientas).
* Postariormente en las opciones seleccione AXE. 
* Luego haga clic en el botón Analyze. Eso mostrará un listado de todos los issues reportados por la herramienta.


### Semana 8  - Ejecución de escenarios:

### [Estretagía](https://uniandes-my.sharepoint.com/:b:/g/personal/k_tarazonaj_uniandes_edu_co/EcwmKdbn_HNIghWQPpsw4kQBXdSgxyo5L6oX3Zz9viUbKA?e=eKf5a2)


### [Inventario de pruebas semana 1](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Inventario-de-pruebas-semana-1)


### [Video](https://youtu.be/UYmwYIT9uJ4)


### [Pros y contras herramientas](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Pros-y-contras-herramientas-usadas-en-la-semana-8) 


### [Reporte de incidencias](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Reporte-de-Incidencias-semana-8) 


### [Retrospectiva](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Retrospectiva-semana-8)


### [Funcionalidades generales de Ghost](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Funcionalidades-generales-de-Ghost)
