# Roadmap - Inmotech Frontend

> Plan maestro de implementacion de features para el SPA con React

---

## Fase 1: Google OAuth

| # | Tarea | Estado |
|---|---|---|
| 1.1 | Instalar `@react-oauth/google` | COMPLETADO (usando redirect flow sin libreria) |
| 1.2 | Crear componente `GoogleLoginButton` | COMPLETADO |
| 1.3 | Modificar `AuthContext.jsx` para soportar login email + Google OAuth | COMPLETADO |
| 1.4 | Anadir boton "Continuar con Google" en `UserLogin.jsx` | COMPLETADO |

---

## Fase 2: Planes y Limites

| # | Tarea | Estado |
|---|---|---|
| 2.1 | Crear pagina `/planes` con comparativa Gratis vs Premium | COMPLETADO |
| 2.2 | Mostrar contador "X/Y propiedades" en `DashboardUser` | COMPLETADO |
| 2.3 | Bloquear boton "Publicar propiedad" al alcanzar limite gratuito | COMPLETADO |
| 2.4 | Redirigir a `/planes` desde el aviso de limite | COMPLETADO |

---

## Fase 3: Stripe Checkout

| # | Tarea | Estado |
|---|---|---|
| 3.1 | Instalar `@stripe/stripe-js` y `@stripe/react-stripe-js` | PENDIENTE |
| 3.2 | Crear componente `StripeCheckoutButton` | PENDIENTE |
| 3.3 | Pagina `/suscripcion-exito` | PENDIENTE |
| 3.4 | Pagina `/suscripcion-cancelada` | PENDIENTE |

---

## Fase 4: Alertas UI

| # | Tarea | Estado |
|---|---|---|
| 4.1 | Crear pagina `/mis-alertas` con listado y opcion eliminar | PENDIENTE |
| 4.2 | Formulario de creacion de alerta (ciudad, provincia, rango precio, superficie) | PENDIENTE |
| 4.3 | Validacion de formulario con Zod | PENDIENTE |

---

## Fase 5: IA UI

| # | Tarea | Estado |
|---|---|---|
| 5.1 | Componente `AIChatbot` flotante (boton abajo-derecha, ventana chat) | PENDIENTE |
| 5.2 | Boton "Generar con IA" en formulario `CreateProperty` | PENDIENTE |
| 5.3 | Seccion "Tambien te puede interesar" en `PropertyDetail` | PENDIENTE |

---

## Fase 6: Mejoras de Calidad

| # | Tarea | Estado |
|---|---|---|
| 6.1 | Instalar `react-hook-form` + `zod` para formularios | PENDIENTE |
| 6.2 | Instalar `@tanstack/react-query` para gestion de datos | PENDIENTE |
| 6.3 | Anadir skeletons/loading states en componentes | PENDIENTE |
| 6.4 | Anadir `ErrorBoundary` global | PENDIENTE |

---

## Estrategia de Ramas

```
main
├── feat/oauth2-google
├── feat/planes-limites
├── feat/stripe-checkout
├── feat/alertas-ui
├── feat/ia-chatbot
└── feat/mejoras-frontend
```

Cada rama se mergea via PR (squash merge) a `main`.

---

## Estado Global

| Fase | Estado |
|---|---|
| Fase 1 - Google OAuth | COMPLETADO |
| Fase 2 - Planes y Limites | COMPLETADO |
| Fase 3 - Stripe Checkout | COMPLETADO |
| Fase 3 - Stripe Checkout | PENDIENTE |
| Fase 4 - Alertas UI | PENDIENTE |
| Fase 5 - IA UI | PENDIENTE |
| Fase 6 - Mejoras Calidad | PENDIENTE |
