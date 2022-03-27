FarmaciaApp
Simulador de farmacia en línea que consta con las siguientes características:
- Login/Register de usuarios
- Tres categorías de productos a ser: Higiene, Medicamentos y Bioseguridad
- Modulo de carrito de compras
- Chatbot potenciado con DialogFLow de Google Cloud y Kommunicate como medio de inserción en reactjs
- Base de datos y control de usuarios mediante Firebase y Firestore

¿Cómo instalarlo?
Solo descarga el repositorio y ejecuta el comando yarn install --ignore-engines, esta última sección del comando fuerza la instalación de un plugin necesario.

¿Cómo ejecutarlo?
ejecuta en la terminal el comando npm start o yarn start

¿Configuraciones necesarias?
Debes configurar las credenciales del proyecto firebase tanto en el código del sitio web como en DialogFlow, a su vez debes configurar las credenciales de DialogFLow en Kommnunicate.

¿Qué es DialogFlow?
DialogFlow nos permite la creación y entrenamiento de bots y chatbots los cuales nos permiten darle un servicio más personalizado a los cliente que visitan el sitio web de la farmacia, debes vincular tu chatbot al proyecto de firebase donde estará almacenado el sitio web.

¿Qué es Kommunicate?
Kommunicate es una plataforma de automatización de atención al cliente híbrida humano + bot que brinda soporte en tiempo real, proactivo y personalizado para empresas en crecimiento. Es uno de los mejores complementos de Bigcommerce Chatbot y Live Chat disponibles en el mercado.
Para poder usarlo debes tener creado tu chatbot en DialogFlow y usar sus credenciales  y configurarlos en Kommnunicate.

