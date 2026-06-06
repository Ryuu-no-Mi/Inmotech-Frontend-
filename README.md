
<p align="center">
  <img src="https://img.shields.io/badge/React-19-%2361DAFB?logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-6-%23646CFF?logo=vite&logoColor=white" alt="Vite 6">
  <img src="https://img.shields.io/badge/Tailwind-3-%2306B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3">
  <img src="https://img.shields.io/badge/React_Router-7-%23CA4245?logo=reactrouter&logoColor=white" alt="React Router 7">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License MIT">
</p>

<h1 align="center">Inmotech Frontend</h1>
<p align="center">Portal inmobiliario - SPA con React + Vite + Tailwind</p>

---

## Stack Tecnologico

| Categoria | Tecnologia |
|---|---|
| **Framework** | React 19 |
| **Build** | Vite 6 |
| **Estilos** | Tailwind CSS 3 |
| **Routing** | React Router DOM 7 |
| **HTTP** | Axios |
| **Iconos** | Lucide React |
| **Carrusel** | Swiper |
| **Linting** | ESLint 9 |

## Estructura del Proyecto

```
src/
├── api/                  # Configuracion Axios + interceptores
│   └── index.js
├── assets/               # Imagenes, logos, SVG
├── components/           # Componentes reutilizables
│   ├── BtnInicio.jsx
│   ├── BtnVolver.jsx
│   ├── CreateAgency.jsx
│   ├── CreateProperty.jsx
│   ├── DashboardUser.jsx
│   ├── DeleteUser.jsx
│   ├── EditProperty.jsx
│   ├── EditUser.jsx
│   ├── Favoritos.jsx
│   ├── Footer.jsx
│   ├── HeaderComponent.jsx
│   ├── Navbar.jsx
│   ├── PropertyCard.jsx
│   ├── PropertyDetail.jsx
│   ├── PropertyList.jsx
│   └── SearchBar.jsx
├── contexts/             # Contextos React
│   └── AuthContext.jsx   # Autenticacion (JWT, login, registro)
├── entities/             # Tipos/entidades reutilizables
├── pages/                # Paginas (rutas)
│   ├── AgencyDetail.jsx
│   ├── ComingSoonPage.jsx
│   ├── DashboardUser.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   ├── Property.jsx
│   ├── RegisterUser.jsx
│   └── UserLogin.jsx
```

## Paginas

| Ruta | Pagina | Descripcion |
|---|---|---|
| `/` | Home | Pagina principal con buscador y listado |
| `/property/:id` | Property | Detalle de propiedad |
| `/login` | UserLogin | Inicio de sesion |
| `/register` | RegisterUser | Registro de usuario |
| `/dashboard` | DashboardUser | Panel de usuario autenticado |
| `/agency/:id` | AgencyDetail | Detalle de agencia |
| `*` | NotFound | 404 |

## Arranque

```bash
npm install
npm run dev      # Dev server en http://localhost:5173
npm run build    # Build produccion
npm run preview  # Previsualizar build
```

## Roadmap

Ver [docs/ROADMAP.md](docs/ROADMAP.md) para el plan completo de features.
