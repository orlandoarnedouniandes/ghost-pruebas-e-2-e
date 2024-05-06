# Gost Pruebas E2E

## Descripción

## En este repositorio se documentan escenarios y pruebas creadas con las herramientas Cypress y Kraken para la aplicación Ghost.

### Conformación de Equipo

Apellidos | Nombres  | Emails Uniandes | Usuario GitHub 
-- | -- | -- | -- 
Tarazona Jaimes | Karen Fernanda | k.tarazonaj@uniandes.edu.co  | karentarazonaj |
Piarpuzan Artunduaga | Willian Andres | w.piarpuzan@uniandes.edu.co  | wpiarpuzan |
Arnedo | Orlando | o.arnedoc@uniandes.edu.co | orlandoarnedouniandes |
Wiesner | Helvert | h.wiesner@uniandes.edu.co  | helverinio |

### URL pública de aplicación bajo pruebas: Ghost 5.14.1
https://ghost-jpjk.onrender.com/

### Instalación y ejecución de las pruebas en Kraken
#### Requisitos
* Tener instalado [Android SDK](https://developer.android.com/studio?hl=es-419), y configuradas las variales ADB and AAPT
* Tener instalado Appium
* Tener instalado NodeJS (Version ≥ 12)
* Tener intslado Java

#### Ejecución de pruebas Kraken
1. Antes de iniciar valide que se cumplan con los requisitos previos para el uso de la herramienta usando en tu consola el siguiente comando: kraken-node doctor
2. Clone el siguiente repositorio https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e.git
3. Ubiquese dentro de la carpeta Kraken
4. Sobre la carpeta Kraken use el siguiente comando: npm install
5. A continuación corra las pruebas usando el siguiente comando: npx kraken-node run
6. Recuerde que la aplicación bajo pruebas se encuentra desplegada en: https://ghost-jpjk.onrender.com/, si desea evidenciar la ejecución de las pruebas puede ingresar a la siguiente url https://ghost-jpjk.onrender.com/ghost con las isguientes credenciales: User:h.wiesner@uniandes.edu.co; Password: mWxNuDsU5Ng7LD.

### En caso de querer correr una prueba en particular: dado que hay una limitante de la herramienta en ejeutar varias pruebas consecutivas en ambientes Windows, se debe ejecutar las pruebas una a una
1. Navegar a la carpeta principal del proyecto y luego a la carpeta kraken
2. copiar la prueba desde el folder en el que se encuentra situada (ejemplo: feature/e15)
3. pegar el archivo de prueba dentro del folder /features
4. Asegurarse de que ningun otro archivo con extension .feature esta presente en /features aparte del que desamos probar (esto debido a la limitacion de kraken para correr differentes archivos de prueba en windows Link de la discusion: https://uniandes-miso.slack.com/archives/C06QRVAKMHR/p1714705849745749)
5. correr - npx kraken-node run
 
### Instalación y ejecución de las pruebas en Cypress
#### Requisitos
* Tener instalado Cypress 

#### Ejecución de pruebas Cypress
1. Clone el siguiente repositorio https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e.git
2. navegue hasta el directorio donde descargo el repositorio
3. Ubíquese dentro de la carpeta Cypress(cd cypress)
4. A continuación corra las pruebas usando el siguiente comando: cypress run
5. verifique los resultados.
6. Recuerde que la aplicación bajo pruebas se encuentra desplegada en: https://ghost-jpjk.onrender.com/, si desea evidenciar la ejecución de las pruebas puede ingresar a la siguiente url https://ghost-jpjk.onrender.com/ghost con las isguientes credenciales: User:h.wiesner@uniandes.edu.co; Password: mWxNuDsU5Ng7LD.
#### Versiónes utilizadas en el desarrollo de las pruebas
node: 18.13.0
Cypress package version: 13.8.1
Cypress binary version: 13.8.1

### Escenarios de pruebas
[Escenarios de pruebas](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Escenarios-de-pruebas)

### Funcionalidades bajo prueba
[Funcionalidades bajo prueba](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Funcionalidades-bajo-prueba)

### Resumen de Pros y Contras
[Pros y Contras de las herramientas](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Pros-y-Contras-de-las-herramientas)


