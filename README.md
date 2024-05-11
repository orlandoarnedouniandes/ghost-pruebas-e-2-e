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
versión: 5.14 - http://misoubuntuhw.eastus.cloudapp.azure.com:2368/
versión: 3.42 - http://misoubuntuhw.eastus.cloudapp.azure.com:3001/

### Instalación y ejecución de las pruebas en Kraken
#### Requisitos
* Tener instalado [Android SDK](https://developer.android.com/studio?hl=es-419), y configuradas las variables ADB y AAPT
* Tener instalado Appium
* Tener instalado NodeJS (Versión ≥ 12)
* Tener instalado Java

#### Ejecución de pruebas Kraken
1. Antes de iniciar, valide que se cumplan los requisitos previos para el uso de la herramienta usando en tu consola el siguiente comando: kraken-node doctor
2. Clone el siguiente repositorio https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e.git
3. Ubíquese dentro de la carpeta Kraken o Kraken_3_42 dependiendo de la versión de Ghost que desee probar
4. Sobre la carpeta Kraken o Kraken_3_42, use el siguiente comando: npm install
5. A continuación, corra las pruebas usando el siguiente comando: node features/executeKrakenAll.js
 
### Instalación y ejecución de las pruebas en Cypress
#### Requisitos
* Tener instalado Cypress 

#### Ejecución de pruebas Cypress
1. Clone el siguiente repositorio https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e.git
2. Navegue hasta el directorio donde descargó el repositorio
3. Ubíquese dentro de la carpeta Cypress (cd cypress)
4. A continuación, corra las pruebas usando el siguiente comando: cypress run
5. Verifique los resultados.
6. Recuerde que la aplicación bajo pruebas se encuentra desplegada en: http://misoubuntuhw.eastus.cloudapp.azure.com:2368/ (versión 5.14) y http://misoubuntuhw.eastus.cloudapp.azure.com:3001/ (versión 3.42), si desea evidenciar la ejecución de las pruebas puede ingresar a la URL con las siguientes credenciales: User:h.wiesner@uniandes.edu.co; Password: mWxNuDsU5Ng7LD.
#### Versiones utilizadas en el desarrollo de las pruebas
node: 18.13.0
Cypress package version: 13.8.1
Cypress binary version: 13.8.1


#### BackstopJS
node: 18.13.0
BackstopJS v6.3.23
Instale Backstop de manera global si no lo tiene instalado aún: npm install -g backstopjs
 - Si aún no tiene imágenes de referencia:
    - Ejecute las pruebas de Cypress siguiendo las instrucciones anteriores
    - Asegúrese de ubicarse en la raíz del proyecto usando el comando cd
    - Copie las imágenes para comparar usando el comando: xcopy /E /I /Y cypress\screenshots backstop\screenshots
    - Navegue a la carpeta backstop: cd backstop
    - Ejecute el comando backstop remote
    - Inicie una nueva consola de comandos y navegue a la carpeta backstop
    - Ejecute el comando backstop reference
    - Ejecute el comando backstop test
    - Disfrute del informe
Navegue a la carpeta backstop: cd backstop


### Funcionalidades bajo prueba - Regresión Visual (10 Escenarios)
#### [Funcionalidades bajo prueba - Regresión Visual](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Funcionalidades-bajo-pruebas-de-regresion-visual)

### Escenarios de pruebas de regresión visual (10 Escenarios)
#### [Funcionalidades bajo prueba - Regresión Visual](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Escenarios-de-prueba-regresion-visual)

### Resumen de Pros y Contras ResembleJS y BackstopJS
#### [Resumen de Pros y Contras ResembleJS Y BackstopJS](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Pros-y-contras-ResembleJS-vs-BackstopJS)

### Informe de diferencias visuales
#### [Informe de diferencias visuales](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Reporte-de-Incidencias)

### Funcionalidades bajo prueba (40 Escenarios)
Aca de describen todas las funcionalidades bajo prueba que se usaron para los 40 Escenarios de prueba iniciales.
#### [Funcionalidades bajo prueba (40 Escenarios)](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Funcionalidades-bajo-prueba)

### Escenarios de Pruebas (40 Escenarios)
Aca se describen los 20 escenarios trabajados para cada herramienta Kraken y Cypres; en total los 40 escenarios que se modificaron para la toma de captures.
#### [Escenarios de Pruebas (40 Escenarios)](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Escenarios-de-pruebas)

### Video
#### [Presentación Semana 6 (VRT)](https://youtu.be/K9dH1WsJ_C0)

### Ejecución de los 10 Escenarios de prueba - Regresión Visual
#### Reporte HTML ResembleJS
* Se puede visualizar online en el siguiente link https://helverinio.github.io/report_resemble_kraken/Resemble_Comparison_results/2024-05-08/
* Se puede tambien visualizar en la ruta del release del proyecto ghost-pruebas-e-2-e/kraken/resembleReportSemana6/Resemble_Comparison_results/index.html

#### Reporte HTML BackstopJS(Escenario 1 - crear post)
* Se puede visualizar online en el siguiente link https://helverinio.github.io/report_backstop_cypress_escenario1/html_report/
* Se puede tambien visulizar en la ruta del release del proyecto ghost-pruebas-e-2-e/backstop/reporte_escenario1_cypress_backstopindex.html/html_report/index.html

#### Ejecución de 40 Escenarios de pruebas
Aca se describe los resultados de ejecutar los 40 escenarios de pruebas sin ajustar en la versión anterior, y actual de Ghost.
## [Ejecución de 40 Escenarios de pruebas](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Ejecuci%C3%B3n-de-pruebas-en-Ghost-3.42-sin-cambios+)

### Funcionalidades generales de Ghost
## [Funcionalidades generales de Ghost](https://github.com/orlandoarnedouniandes/ghost-pruebas-e-2-e/wiki/Funcionalidades-generales-de-Ghost)



