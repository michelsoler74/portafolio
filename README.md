# Portafolio Web - Michel Soler

[Ver Demo en Vivo](https://portafolio-new-one.vercel.app/)

Este proyecto es un portafolio web profesional construido con Next.js, que incluye varias características modernas como formulario de contacto, galería de imágenes, y más.

## 🌟 Características

- ✨ Diseño moderno y responsive
- 🖼️ Galería de imágenes con vista previa
- 🎥 Sección de videos
- 🔍 SEO optimizado
- 🚀 Rendimiento optimizado
- 🔒 Configuraciones de seguridad mejoradas

## 🛠️ Tecnologías Utilizadas

- Next.js
- React
- Cloudinary (para gestión de imágenes)
- CSS Modules
- Prisma
- Resend
- TailwindCSS
- Framer Motion

## 📋 Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Cuenta en Cloudinary (para la gestión de imágenes)

## 🚀 Instalación

1. Clona el repositorio
2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno en `.env.local`:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
DATABASE_URL=tu_database_url
RESEND_API_KEY=tu_resend_api_key
NEXTAUTH_SECRET=tu_nextauth_secret
NEXTAUTH_URL=tu_nextauth_url
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
portafolio-minimalista/
├── components/           # Componentes reutilizables
│   ├── Navigation.js    # Barra de navegación principal
│   └── Footer.js        # Pie de página
│
├── pages/               # Páginas de la aplicación
│   ├── _app.js         # Configuración principal de la app
│   ├── index.js        # Página de inicio
│   ├── about.js        # Página "Sobre Mí"
│   ├── contact.js      # Página de contacto
│   ├── videos.js       # Página de videos
│   └── api/            # APIs del backend
│       └── contact/    # API para el formulario de contacto
│
├── public/             # Archivos estáticos
│   ├── images/        # Imágenes de la galería
│   └── profile.jpg    # Foto de perfil
│
├── styles/            # Archivos CSS
│   ├── globals.css    # Estilos globales
│   └── *.module.css   # Estilos específicos por componente
│
├── prisma/            # Configuración de la base de datos
│   └── schema.prisma  # Esquema de la base de datos
│
└── .env              # Variables de entorno
```

## 🔍 Explicación de los Componentes Principales

### 1. Páginas (`/pages`)

- **index.js**: Página principal del portafolio

  - Muestra una introducción
  - Enlaces a secciones principales
  - Diseño moderno y minimalista

- **about.js**: Página "Sobre Mí"

  - Foto de perfil
  - Biografía profesional
  - Experiencia y habilidades
  - Enlaces a redes sociales

- **contact.js**: Página de Contacto

  - Formulario de contacto
  - Integración con email (Resend)
  - Validación de campos
  - Mensajes de éxito/error

- **videos.js**: Página de Videos
  - Galería de videos
  - Integración con YouTube/Twitch
  - Diseño responsive

### 2. Componentes (`/components`)

- **Navigation.js**: Barra de navegación

  - Menú responsive
  - Enlaces a todas las secciones
  - Diseño moderno

- **Footer.js**: Pie de página
  - Enlaces de contacto
  - Redes sociales
  - Información de copyright

### 3. Estilos (`/styles`)

Cada archivo .module.css corresponde a un componente específico:

- **About.module.css**: Estilos para la página "Sobre Mí"
- **Contact.module.css**: Estilos para el formulario de contacto
- **Videos.module.css**: Estilos para la galería de videos

### 4. API (`/pages/api`)

- **/api/contact**:
  - Procesa los envíos del formulario de contacto
  - Envía emails usando Resend
  - Almacena mensajes en la base de datos

### 5. Base de Datos (Prisma)

- **schema.prisma**: Define la estructura de la base de datos
  - Modelo para mensajes de contacto
  - Configuración de la base de datos

## 📦 Dependencias Principales

```json
{
  "dependencies": {
    "@prisma/client": "Base de datos",
    "next": "Framework principal",
    "react": "Biblioteca UI",
    "resend": "Envío de emails",
    "framer-motion": "Animaciones"
  }
}
```

## 🔧 Configuración

El proyecto incluye varias configuraciones optimizadas:

- **SEO**: Metadatos optimizados
- **Seguridad**: Headers HTTP seguros configurados
- **Rendimiento**: Optimización de imágenes y compresión

## 🔐 Seguridad

Implementamos varias medidas de seguridad:

- Headers HTTP seguros
- Protección XSS
- Control de referencias cruzadas

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

[Tu Nombre]

## 🤝 Contribuir

Este es un proyecto personal, pero las sugerencias son bienvenidas:

1. Fork del repositorio
2. Crear rama para cambios
3. Commit de cambios
4. Push a la rama
5. Crear Pull Request

## ⭐️ Muestra tu apoyo

Si este proyecto te ha sido útil, ¡dale una estrella!
