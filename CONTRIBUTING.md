# Guía de Contribución
Este documento explica cómo colaborar con LitHub

---

##  Flujo de trabajo para contribuir

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/UrielGGarcia/lit-hub.git
   cd lit-hub
   npm install
   ```
2. Crea una nueva rama a partir de `main`:
   ```bash
   git checkout -b nombre-de-tu-rama
   ```
   Ejemplo:
   ```bash
   git checkout -b feature/agregar-login
   ```
3. Realiza los cambios necesarios en el código.
4. Haz commits siguiendo la convención descrita abajo.
5. Sube tu rama:
   ```bash
   git push origin nombre-de-tu-rama
   ```
6. Crea un **Pull Request (PR)** hacia `main` en GitHub.
7. Espera la revisión. Si hay comentarios, realiza los ajustes solicitados.
8. Una vez aprobado, se hará el merge.

---

##  Issues

Si encuentras un bug o quieres proponer una nueva funcionalidad:
1. Ve a la pestaña **Issues** del repositorio.
2. Crea un issue describiendo el problema o propuesta.
3. El equipo revisará y lo etiquetará.

---

##  Convención de Commits

Este proyecto sigue la convención **Conventional Commits**, que facilita la lectura del historial y la generación de changelogs.

### Estructura
```
<tipo>(<área>): <descripción corta>
```

### Tipos más usados:
- **feat**: Nueva funcionalidad (ej. `feat(auth): agregar login con Google`)
- **fix**: Corrección de bug (ej. `fix(ui): corregir bug en responsive del navbar`)
- **docs**: Cambios en documentación (ej. `docs(readme): actualizar instrucciones de instalación`)
- **style**: Cambios de formato (espacios, comas, indentación), sin cambiar la lógica.
- **refactor**: Cambio de código que no corrige bugs ni agrega funciones.
- **test**: Agregar o modificar pruebas.
- **chore**: Cambios de mantenimiento (dependencias, scripts).

### Ejemplo de commit válido:
```bash
git commit -m "feat(auth): agregar login con Google"
```

---

##  Estilo de código

Por ahora **no hay reglas estrictas de linting** (como ESLint o Prettier).  
Más adelante podemos integrarlas para mantener un estilo uniforme.

---

##  Reglas básicas de colaboración

- Trabajar siempre en una rama diferente a `main`.
- Hacer commits pequeños y claros.
- Acompañar los cambios importantes con una breve explicación en el PR.
- Respetar la convención de commits.
