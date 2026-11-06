# Sistema News / NewsFlow — BDD com Cucumber.js

**Bruna Furtado e Izadora Galarza | 05/11/2026**

Entrega de **quatro histórias (US01–US04)**, uma funcionalidade por história: rascunho, versões, restauração e revisão editorial. A suíte Cucumber.js executou **23 cenários e 149 passos com sucesso**, conforme [`relatorios/execucao.txt`](relatorios/execucao.txt). Os exemplos dos esquemas de cenário contam como casos distintos. Consulte [histórias, critérios e limites](docs/historias.md).

## Executar

1. Instale Node.js 22 ou superior e abra esta pasta no terminal.
2. Execute `npm ci` para instalar as dependências do lockfile.
3. Execute `npm run test:dry` para conferir o reconhecimento dos passos sem executá-los.
4. Execute `npm test` para rodar a suíte e gerar os relatórios.
5. Abra `relatorios/cucumber-report.html` no navegador para consultar o resultado.

## Conteúdo e evidências

| Caminho | Conteúdo |
| --- | --- |
| [`docs/historias.md`](docs/historias.md) | US01–US04, critérios, regras e rastreabilidade |
| [`features/`](features/) | `us01-rascunho.feature`, `us02-versoes.feature`, `us03-restauracao.feature`, `us04-revisao.feature` (`# language: pt`) |
| [`features/step_definitions/newsflow.steps.js`](features/step_definitions/newsflow.steps.js) | Steps com verificações usando `node:assert/strict` |
| [`features/support/world.js`](features/support/world.js), [`src/newsflow.js`](src/newsflow.js) | Estado por cenário e domínio em memória com relógio controlado |
| [`cucumber.js`](cucumber.js) | Seleção das features e formatos de relatório |
| [`relatorios/execucao.txt`](relatorios/execucao.txt), [`relatorios/cucumber-report.json`](relatorios/cucumber-report.json), [`relatorios/cucumber-report.html`](relatorios/cucumber-report.html) | Saída de `npm test` e relatórios da suíte |
| [`relatorios/dry-run.txt`](relatorios/dry-run.txt), [`relatorios/dry-run.json`](relatorios/dry-run.json), [`relatorios/dry-run.html`](relatorios/dry-run.html) | Saída e relatórios de `npm run test:dry` |

## Resultado dos testes

Saída de `npm test` registrada em [`relatorios/execucao.txt`](relatorios/execucao.txt) (05/11/2026):

```text
> newsflow-bdd-bruna@1.0.0 test
> cucumber-js

.....................................................................................................................................................

23 scenarios (23 passed)
149 steps (149 passed)
0m 0.073s (0m 0.009s executing your code)
```

`npm run test:dry` terminou com código 0: **23 cenários e 149 passos identificados**, marcados como `skipped` porque esse comando não executa os passos. O resultado de execução está no relatório [HTML](relatorios/cucumber-report.html) e no [JSON](relatorios/cucumber-report.json) de `npm test`.

## Referências

- Enunciado: exercicio-newsflow.pdf (fornecido à parte; não incluído no repositório).
- Documentação oficial: https://cucumber.io/docs/installation/javascript/ e https://github.com/cucumber/cucumber-js.
