# Operacion Faraon

Web estatica para la despedida de soltero. No necesita servidor ni base de datos: solo HTML, CSS, JavaScript y la imagen del timeline.

## Como verla en tu ordenador

1. Abre la carpeta `despedida-faraon-web`.
2. Haz doble clic en `index.html`.
3. Se abrira en tu navegador.

## Como subirla para que tus amigos la vean

La forma mas sencilla para principiantes es GitHub Pages.

1. Crea una cuenta en [GitHub](https://github.com), si no tienes una.
2. Pulsa `New repository`.
3. Nombre recomendado: `despedida-faraon-web`.
4. Marca el repositorio como `Public`.
5. Pulsa `Create repository`.
6. Sube estos archivos desde el boton `Add file` > `Upload files`:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `server.js` es opcional; solo sirve para probar en local
   - la carpeta `assets`
7. Pulsa `Commit changes`.
8. Entra en `Settings` > `Pages`.
9. En `Build and deployment`, selecciona:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
10. Pulsa `Save`.
11. Espera uno o dos minutos. GitHub te dara una URL parecida a:
   `https://tu-usuario.github.io/despedida-faraon-web/`

## Como permitir que tus amigos contribuyan

Opcion sencilla:

1. En GitHub, entra en el repositorio.
2. Ve a `Settings` > `Collaborators`.
3. Pulsa `Add people`.
4. Escribe el usuario de GitHub de cada amigo.
5. Ellos podran editar los archivos y proponer cambios.

Opcion ordenada:

1. Tus amigos entran en el repositorio.
2. Editan un archivo con el icono del lapiz.
3. Guardan los cambios en una rama nueva.
4. Crean una `Pull request`.
5. Tu revisas y aceptas el cambio.

## Que archivo tocar para cada cosa

- Textos principales: `index.html`
- Colores, tamanos y animaciones: `styles.css`
- Cuenta atras, mensajes rebotando, modales y cerveza: `app.js`
- Imagen del timeline: `assets/timeline-faraon.png`

## Fecha de la cuenta atras

Ahora esta configurada para el viernes 22 de mayo de 2026 a las 15:00, hora de Madrid. Puedes cambiarla en `app.js`, en esta linea:

```js
const targetDate = new Date("2026-05-22T15:00:00+02:00");
```
