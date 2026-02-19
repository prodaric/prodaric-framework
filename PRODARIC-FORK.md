# Prodaric Framework — fork en Prodaric

Este árbol es el **fork para Prodaric** (marca Dicon). El repositorio upstream es [Coderic/coderic-ide](https://github.com/Coderic/coderic-ide).

- **Repositorio del fork:** [prodaric/prodaric-framework](https://github.com/prodaric/prodaric-framework)
- **Refactor aplicado:** Coderic IDE → Prodaric Framework, Coderic (marca) → Dicon. Scope de packages: `@prodaric/` y referencias a Coderic Engine donde aplica.

## Subir cambios al fork

```bash
git remote add prodaric https://github.com/prodaric/prodaric-framework.git   # solo la primera vez
git push prodaric main
```

Para traer actualizaciones del upstream (Coderic IDE) y fusionar:

```bash
git remote add upstream https://github.com/Coderic/coderic-ide.git   # solo la primera vez
git fetch upstream
git merge upstream/main
# Resolver conflictos si los hay (nombres Coderic IDE vs Prodaric Framework)
git push prodaric main
```
