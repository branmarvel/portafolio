# 🌐 Portafolio de Desarrollador Interactivo Premium & CV Hub 🚀

Un sitio web de portafolio personal y centro de CV interactivo de vanguardia y rendimiento ultra alto construido con **Astro 5**, **React 19** y **Tailwind CSS v4**.

---

<p align="center">
  <a href="./README.md">🇺🇸 English</a> | 🇪🇸 <b>Español</b>
</p>

---

## 🌟 Descripción General

Este repositorio contiene el código fuente de mi portafolio profesional de desarrollador. Está diseñado para actuar como una vitrina elegante, interactiva y de alto rendimiento de mis capacidades en GovTech, FinTech y desarrollo móvil multiplataforma, presentando mis proyectos, currículums profesionales (tanto en formato visual como optimizados para ATS) y layouts interactivos para reclutadores y líderes técnicos.

---

## ✨ Características Clave

*   **⚡ Code Splitting y Rendimiento:** Impulsado por **Astro 5** con carga dinámica mediante React `lazy` y `<Suspense>` para componentes pesados, además de decodificación de imagen asíncrona (`decoding="async"`) para minimizar el tamaño de carga inicial y asegurar una puntuación perfecta en Core Web Vitals.
*   **🎬 Estética Cinemática Premium:** Implementa una capa de ruido sutil fija en pantalla, efectos de hover magnéticos responsivos en botones y enlaces de navegación, badges de categorías de proyectos codificados por color y un cursor parpadeante tipo terminal realista.
*   **🎨 Glassmorphism y Diseño High-Tech:** Aplica diseños premium de tema oscuro tipo vidrio con estilos HSL personalizados y microanimaciones respaldadas por **Framer Motion 12**.
*   **💻 Showcases de Proyectos en Terminal de Mac:** Componentes personalizados de terminal y previsualizaciones de paneles de control con mockups de dispositivos condicionales (teléfono móvil o laptop) para proyectos sin video y estilos de red segura de producción.
*   **🌐 Soporte Bilingüe Completo (i18n):** Cambio rápido de idioma del lado del cliente entre español e inglés utilizando gestión dinámica de contexto de React.
*   **📄 Portales de CV Dual Interactivos y Responsivos:** Aloja páginas de CV bilingües y con selección de tema bajo `/cv/modern` y `/cv/classic` con controles en tiempo real de foto de perfil y exportación a PDF optimizada (`html2pdf.js` / diálogo nativo de impresión).
*   **🐳 Arquitectura Containerizada:** Preconfigurado con reglas modulares de **Dockerfile** y **Docker Compose** para un despliegue rápido y aislamiento en entorno local.

---

## 🛠️ Stack Tecnológico de Vanguardia

*   **Framework Principal:** `Astro 5.2.0` (Generación de Páginas Estáticas)
*   **Librería UI:** `React 19.0.0` (Componentes Interactivos)
*   **Motor de Estilos:** `Tailwind CSS v4.0.0` y tokens de variables HSL nativas
*   **Sistema de Animación:** `Framer Motion 12.0.0` (Transiciones spring y animaciones de layout)
*   **Soporte de Idiomas:** React `LanguageContext` personalizado (traducciones i18n basadas en JSON)
*   **Seguridad de Tipos:** `TypeScript 5.7.3`

---

## 🚦 Primeros Pasos

### Requisitos Previos

*   **Node.js:** `>=18.0.0` (Se recomienda Node 20+)
*   **pnpm:** `^10.x` o más reciente (Gestor de paquetes exclusivo)
*   **Docker y Docker Compose** (Opcional: para ejecución en contenedores)

### Guía de Instalación y Ejecución

1.  **Clonar el Repositorio:**
    ```bash
    git clone https://github.com/branmarvel/portafolio.git
    cd portafolio
    ```

2.  **Instalar Dependencias:**
    ```bash
    pnpm install
    ```

3.  **Iniciar Servidor de Desarrollo:**
    ```bash
    pnpm dev
    ```
    Abre tu navegador en `http://localhost:4321/` para ver el canvas interactivo localmente.

4.  **Generar el Bundle de Producción:**
    ```bash
    pnpm build
    ```
    Esto ejecuta el chequeo de tipos con `@astrojs/check` y genera el build estático optimizado en el directorio `dist/`.

### 🔒 Política de Seguridad: Control de Edad de Publicación

Para prevenir ataques a la cadena de suministro (como paquetes maliciosos o exploits de día cero en módulos recién publicados), este repositorio bloquea la instalación de cualquier dependencia publicada hace menos de **10 días** (14,400 minutos). Esta limitación de seguridad está declarada en `pnpm-workspace.yaml` y `.npmrc` (`minimumReleaseAge` configurado en `14400`). pnpm retrocederá automáticamente a la última versión segura y madura de cualquier dependencia.

---

## 🐳 Ejecución Containerizada (Docker)

Si prefieres ejecutar el portafolio usando Docker:

*   **Usando Docker Compose:**
    ```bash
    docker-compose up --build -d
    ```
    Esto compilará el contenedor de producción y servirá el sitio estático en `http://localhost:8080/`.

---

## 📂 Arquitectura del Proyecto

Este codebase presenta una separación limpia entre páginas de Astro (rutas) y componentes de React interactivos y modulares:

```text
portafolio/
├── public/                 # Recursos estáticos (imágenes, foto de perfil)
├── src/
│   ├── components/         # Componentes UI Interactivos (React)
│   │   ├── ProjectsSection.jsx   # Slider de proyectos con mockups de terminal
│   │   ├── InteractiveCanvas.jsx # Canvas de fondo interactivo con brillo de mouse
│   │   ├── ProjectLens.jsx       # Visor circular de metadatos de proyectos
│   │   └── HeroSection.jsx       # Layout con introducción tipo máquina de escribir
│   │   └── Magnetic.jsx          # Wrapper de efecto de gravedad física
│   ├── context/            # Estados globales de React (Contexto de idioma i18n)
│   ├── i18n/               # Recursos de traducción
│   ├── layouts/            # Plantillas base de HTML y metadatos (Astro)
│   ├── pages/              # Puntos de entrada para rutas
│   │   └── index.astro     # Plantilla principal del portafolio
│   ├── styles/             # Reglas CSS base y tokens de diseño HSL
│   └── utils/              # Configuración de transiciones de Framer Motion
├── cv_projects/            # Recursos de CV profesionales (HTML Visual y ATS)
├── Dockerfile              # Reglas de compilación de Docker
├── docker-compose.yml      # Configuración de contenedor multi-servicio
├── astro.config.mjs        # Configuraciones de integración de Astro
└── tsconfig.json           # Configuración de TypeScript
```

---

## 🤝 Reglas de Commits (Git)

Para mantener una higiene limpia del repositorio tanto para humanos como para agentes de IA, todos los commits deben seguir las convenciones especificadas en [COMMIT_CONVENTION.md](COMMIT_CONVENTION.md). Asegúrate de que tus mensajes de commit comiencen con el emoji apropiado y los prefijos de estilo Angular (por ejemplo, `⚡ perf(scope): descripción` o `💄 style(scope): descripción`).

---

## 📜 Licencia

Licencia MIT - [LICENSE](LICENSE)
