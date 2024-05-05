# Gost Pruebas E2E

## Descripcion

A brief description of what the project does.

### Conformación de Equipo

Apellidos | Nombres  | Emails Uniandes | Usuario GitHub 
-- | -- | -- | -- 
Tarazona Jaimes | Karen Fernanda | k.tarazonaj@uniandes.edu.co  | karentarazonaj |
Piarpuzan Artunduaga | Willian Andres | w.piarpuzan@uniandes.edu.co  | wpiarpuzan |
Arnedo | Orlando | o.arnedoc@uniandes.edu.co | orlandoarnedouniandes |
Wiesner | Helvert | h.wiesner@uniandes.edu.co  | helverinio |

### Instalacion y ejecucion de las pruebas en Kraken
- 1...

### Instalacion y ejecucion de las pruebas en Cypress
- 1...

### Funcionalidades bajo prueba
-  Funcionalidad 1
- Funcionalidad 2
- Funcionalidad 3
- Funcionalidad 4
- Funcionalidad 5

### Resume de Pros y Contras

#### Kraken

| Pros  | Contras |
| ----- | ------- |
| Permite realizar pruebas de extremo debido que se puede simular el flujo de trabajo real de una aplicación, detectando errores y problemas de usabilidad | Tiene varias dependencias externas y su configuración es compleja debido a la gestión de dependencias |
| Tiene soporte para múltiples plataformas, debido a es versátil, permitiendo pruebas en aplicaciones web, móviles y de escritorio.  | No es apto para desarrolladores inexpertos. Se requiere un buen tiempo para familiarizarse con todas sus funcionalidades y aprender a crear y ejecutar pruebas eficazmente, aun para desarrolladores expertos|
| Ideal para probar escenarios complejos de interacción, sincronizando la ejecución de pruebas entre diferentes usuarios o dispositivos. | Tiene limitaciones en la detección de errores, ya que al operar en modalidad de caja negra, puede tener limitaciones en la detección de errores a nivel de código. |
| Permite generar eventos aleatorios pero tambien especificar datos importantes para el paso a paso de las pruebas | Se pueden presentar posibles conflictos de dependencias y Errores de instalación los cuales pueden afectar la estabilidad y ejecución de las pruebas|
| De forma nativa tiene implementado el patrón de Given-When-Then (Dado-Cuando-Entonces) | Solo permite correr de un escenario a la vez, si se requiere correr todos los escenarios desde un mismo archivo al tiempo hacen que corran todos al tiempo y no se tiene control sobre la ejecucion de las pruebas, lo cual dificulta el proceso de desarrollo |
|| Debido al uso de referencias estaticas tales como nombres de elementos o contenido, si estas cambian puede afectar la pruebas debido a que dejan de funcionar.|
|| Al ser una herramienta relativamente nueva y con una comunidad limitada, hace que no se encuentre tanta documentación a la hora de buscar errores|



#### Cypress
| Pros  | Contras |
| ----- | ------- |
| Es facil de aprender y usar, no requiere tanto tiempo para familiriarizarse con la herramienta ya que es facil de entender | No es compatible con todos los navegadores, especialmente aquellos que no son compatibles con la herramienta o que tienen problemas con su implementación.|
| La ejecución de pruebas se realiza de forma rapida y eficiente, lo cual lo hace util para aplicaciones que requieren una gran cantidad de pruebas. | Debido al uso de referencias estaticas tales como nombres de elementos o contenido, si estas cambian puede afectar la pruebas debido a que dejan de funcionar |
|Permite hacer web scrapping por diferentes tipos de navegación, incluyendo navegación porlinks, botones, y eventos, facilitando su uso. | El patron PageObject no es algo nativo de la herramienta, y se tiende a acoplar la interface con los escenarios de prueba. |
| Se pue usar diferentes tipos de interacciones, incluyendo con formularios, botones, y eventos.| Contra5 |
| En comparación con Kraken su instalación es sencilla y no tiene tantas dependencias externas, lo cual facilita su uso para usuario expertos e inexpertos.  |         |
| Al ser una herramienta de trayectoria y gran comunidad tiene una amplia documentación disponible|

