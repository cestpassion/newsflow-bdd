# Checklist da entrega — NewsFlow BDD

Os itens concluídos têm evidências vinculadas. Veja o [plano de cobertura](plan.md) para o recorte da suíte.

## Definição e Gherkin

- [x] Quatro histórias US01–US04 com critérios numerados, prioridades sugeridas e regras em [`../docs/historias.md`](../docs/historias.md).
- [x] Implementar quatro features executáveis `us01-*` a `us04-*` em [`../features/`](../features/), com `# language: pt`, caminhos felizes e exceções.
- [x] US01: salvar por ciclos periódicos de 30 s, fronteira 29/30/31 s e edição sem reinício da contagem (`../features/us01-rascunho.feature`, RN01, US01-CA01–CA04).
- [x] US02: numeração, conteúdo preservado, retenção e fronteira 19/20/21 (`../features/us02-versoes.feature`, RN01, US02-CA01–CA04).
- [x] US03: recuperar versão mantida, preservar posteriores, rejeitar versão descartada (`../features/us03-restauracao.feature`, RN01, US03-CA01–CA03). Restrição de restauração por estado **não** consta como critério do PDF; conferir decisão de produto se outro estado for necessário.
- [x] US04: submissão, aprovação por pessoa diferente da autora e reprovação comentada, inclusive comentário vazio/espacial recusado (`../features/us04-revisao.feature`, RN02 **parcial**, US04-CA01–CA05).

## Automação e relatórios — 05/11/2026

- [x] Steps com assertions e World/relógio controlado: [`../features/step_definitions/newsflow.steps.js`](../features/step_definitions/newsflow.steps.js), [`../features/support/world.js`](../features/support/world.js), [`../src/newsflow.js`](../src/newsflow.js).
- [x] Executar `npm run test:dry` (código 0): **23 cenários/149 passos skipped**, sem indefinidos ou pendentes; [`../relatorios/dry-run.txt`](../relatorios/dry-run.txt), [`../relatorios/dry-run.json`](../relatorios/dry-run.json) e [`../relatorios/dry-run.html`](../relatorios/dry-run.html).
- [x] Executar `npm test` (código 0): **23 cenários/149 passos passed**; [`../relatorios/execucao.txt`](../relatorios/execucao.txt), [`../relatorios/cucumber-report.json`](../relatorios/cucumber-report.json) e [`../relatorios/cucumber-report.html`](../relatorios/cucumber-report.html).
- [x] Disponibilizar os relatórios JSON e HTML com as quatro features: [`../relatorios/cucumber-report.json`](../relatorios/cucumber-report.json) e [`../relatorios/cucumber-report.html`](../relatorios/cucumber-report.html).
- [x] Documentação das US01–US04 e resultado de 23 cenários/149 passos em [`../README.md`](../README.md); critérios e limites de cobertura em [`../docs/historias.md`](../docs/historias.md).

## Limites de cobertura

- RN02: decisão editorial implementada; bloqueio de agendamento/envio sem aprovação fora do escopo. RN03–RN08 também ficam fora do escopo.
- Restauração fora do estado `rascunho`: o enunciado não restringe o estado, enquanto o domínio atual restringe. Esse comportamento requer definição de produto e novos critérios caso seja incluído no escopo.
