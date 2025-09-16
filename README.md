# Acortador de URLs - Frontend

## Descripción
Este es el frontend de una aplicación web para acortar URLs. Permite a los usuarios registrados crear y gestionar enlaces cortos para URLs largas, facilitando su compartición y seguimiento.

## Características
- Interfaz de usuario moderna y responsive
- Sistema de autenticación de usuarios
- Creación de URLs cortas
- Listado de URLs creadas
- Límite de 5 URLs por usuario
- Gestión de tokens de autenticación

## Tecnologías Utilizadas
- Next.js 14
- React 18
- Tailwind CSS
- Axios para peticiones HTTP
- JWT para autenticación

## Requisitos Previos
- Node.js (versión recomendada: 18 o superior)
- npm o yarn
- Servidor Keycloak: Esta aplicación requiere que Keycloak esté configurado y en funcionamiento. Keycloak se utiliza para la autenticación de usuarios y la gestión de tokens.
- Backend del servicio de acortamiento de URLs: Esta aplicación requiere que el backend [shortlink-api](https://github.com/tavosud/shortlink-api) esté desplegado y configurado correctamente. El backend proporciona:
  - API RESTful para el acortamiento de URLs
  - Sistema de autenticación con Keycloak
  - Validación y seguridad de enlaces

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Crear archivo de variables de entorno:
- Copiar el archivo `.env.example` a `.env.local`
- Configurar las variables necesarias:
```env
NEXT_PUBLIC_KEYCLOAK_OPENID_URL=http://keykloakserver/realms/your_realm/protocol/openid-connect
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=your_client_id
NEXT_PUBLIC_KC_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/api/auth/callback
NEXT_PUBLIC_API_BASE_URL=http://shorlink_api_url
```

## Uso

### Desarrollo
Para ejecutar en modo desarrollo:
```bash
npm run dev
# o
yarn dev
```

### Producción
Para construir y ejecutar en producción:
```bash
npm run build
npm start
# o
yarn build
yarn start
```

## Estructura del Proyecto
```
src/
├── app/              # Rutas y páginas de la aplicación
├── components/       # Componentes reutilizables
├── lib/             # Utilidades y configuraciones
└── public/          # Archivos estáticos
```

## Características de Seguridad
- Manejo seguro de tokens de autenticación
- Redirección automática para sesiones expiradas
- Protección de rutas privadas
- Validación de datos en el cliente

## Contribución
Si deseas contribuir al proyecto:
1. Crea un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

## Scripts Disponibles
- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm start`: Inicia el servidor de producción
- `npm run lint`: Ejecuta el linter para verificar el código
