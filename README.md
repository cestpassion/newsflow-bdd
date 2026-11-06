# Sistema News / NewsFlow — BDD com Cucumber.js

**Bruna Furtado e Izadora Galarza | 05/11/2026**

Entrega didática de **quatro histórias (US01–US04)**, uma funcionalidade executável por história: rascunho, versões, restauração e revisão editorial. São **23 cenários executáveis e 149 passos**, conforme a execução local registrada em [`relatorios/execucao.txt`](relatorios/execucao.txt). Os cenários de esquema contam como casos distintos. Consulte [histórias, critérios e limites](docs/historias.md).

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
| [`relatorios/execucao.txt`](relatorios/execucao.txt), [`relatorios/cucumber-report.json`](relatorios/cucumber-report.json), [`relatorios/cucumber-report.html`](relatorios/cucumber-report.html) | Saída de `npm test` e relatórios da suíte atual |
| [`relatorios/dry-run.txt`](relatorios/dry-run.txt), [`relatorios/dry-run.json`](relatorios/dry-run.json), [`relatorios/dry-run.html`](relatorios/dry-run.html) | Saída e relatórios de `npm run test:dry` |

## Resultado local

Saída de `npm test` registrada em `relatorios/execucao.txt` (05/11/2026):

```text
> newsflow-bdd-bruna@1.0.0 test
> cucumber-js

.....................................................................................................................................................

23 scenarios (23 passed)
149 steps (149 passed)
0m 0.073s (0m 0.009s executing your code)
```

`npm run test:dry` terminou com código 0: **23 scenarios (23 skipped), 149 steps (149 skipped)**. `skipped` é esperado porque o dry-run não executa os passos; a aprovação efetiva é demonstrada por `npm test`. Os JSONs indicam quatro features, 23 cenários, 149 passos aprovados na execução normal e 149 ignorados no dry-run. Os HTMLs gerados contêm as quatro features; não são resultados de testes de interface nem de execução no Studio.

## Fora de escopo

- **RN02, bloqueio de envio/agendamento sem aprovação:** US04 cobre submissão e decisão editorial, não implementa envio/agendamento nem testa o bloqueio de disparo. Portanto RN02 está **parcialmente** coberta.
- **RN03, agendamento:** horários, reagendamento e cancelamento exigem fluxo de operação do gestor além das quatro histórias.
- **RN04, segmentação:** escolha de público e deduplicação exigem dados e critérios de assinantes não modelados neste recorte.
- **RN05, frequência:** limite semanal exige histórico de entregas por assinante, ausente neste domínio.
- **RN06, descadastro:** opt-out e duplo opt-in dependem de gestão de consentimento, fora do fluxo editorial.
- **RN07, falhas:** tentativas, bounces e tratamento de falha exigem a operação de entrega, não simulada aqui.
- **RN08, push:** janela de silêncio e limite diário dizem respeito às notificações, não às versões/revisões.
- Interface visual, autenticação real, persistência externa e envio efetivo não são exercitados: os testes verificam apenas o serviço didático em memória.

## Fontes e alcance da evidência

Esta entrega conserva apenas as quatro features e os relatórios locais da suíte atual; não há evidência de atualização ou execução das quatro histórias no Cucumber Studio. A validação indicada acima é do Cucumber.js local, não da plataforma.

- Enunciado: exercicio-newsflow.pdf (fornecido à parte; não incluído no repositório).
- Documentação oficial: https://cucumber.io/docs/installation/javascript/ e https://github.com/cucumber/cucumber-js.
- Entrega externa: a pasta contém metadados Git locais, mas os relatórios não comprovam commit, remoto ou publicação. Verificar os requisitos de entrega em repositório separadamente.
