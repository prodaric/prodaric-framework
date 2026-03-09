# @prodaric/framework

Meta-paquete que agrupa la base común de Prodaric Framework (shell, theia-l10n-es, layout, ui-engine) para que las aplicaciones cliente (ERP, CRM, POS, Accounting, HRM) lo instalen como una sola dependencia versionada.

## Uso

```bash
npm install @prodaric/framework
```

Configura `.npmrc` para el scope `@prodaric`:

```
@prodaric:registry=https://npm.pkg.github.com/
```

## Versionado

Semver. Las aplicaciones cliente pueden fijar por ejemplo `"@prodaric/framework": "^1.0.0"` para recibir parches y minors compatibles.
