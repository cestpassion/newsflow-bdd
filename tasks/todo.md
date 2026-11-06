# Checklist factual — NewsFlow BDD

Legenda: `[x]` com evidência local; `[ ]` pendente ou não verificado. Ver [`plan.md`](plan.md) para recorte e dependências.

## Definição e Gherkin

- [x] Registrar quatro histórias US01–US04 com critérios numerados, prioridades **propostas** e regras em [`../docs/historias.md`](../docs/historias.md).
- [x] Nomear e implementar quatro features executáveis `us01-*` a `us04-*` em [`../features/`](../features/), com `# language: pt`, caminhos felizes e exceções, sem as features antigas no caminho executável.
- [x] US01: salvar por ciclos periódicos de 30 s, fronteira 29/30/31 s e edição sem reinício da contagem (`../features/us01-rascunho.feature`, RN01, US01-CA01–CA04).
- [x] US02: numeração, conteúdo preservado, retenção e fronteira 19/20/21 (`../features/us02-versoes.feature`, RN01, US02-CA01–CA04).
- [x] US03: recuperar versão mantida, preservar posteriores, rejeitar versão descartada (`../features/us03-restauracao.feature`, RN01, US03-CA01–CA03). Restrição de restauração por estado **não** consta como critério do PDF; conferir decisão de produto se outro estado for necessário.
- [x] US04: submissão, aprovação por pessoa diferente da autora e reprovação comentada, inclusive comentário vazio/espacial recusado (`../features/us04-revisao.feature`, RN02 **parcial**, US04-CA01–CA05).

## Automação e evidências locais — 05/11/2026

- [x] Steps com assertions e World/relógio controlado: [`../features/step_definitions/newsflow.steps.js`](../features/step_definitions/newsflow.steps.js), [`../features/support/world.js`](../features/support/world.js), [`../src/newsflow.js`](../src/newsflow.js).
- [ ] Reexecutar `npm ci` em instalação limpa (não feito nesta verificação; dependências já estavam instaladas).
- [x] Executar `npm run test:dry` (código 0): **23 cenários/149 passos skipped**, sem indefinidos ou pendentes; [`../relatorios/dry-run.txt`](../relatorios/dry-run.txt), [`../relatorios/dry-run.json`](../relatorios/dry-run.json) e [`../relatorios/dry-run.html`](../relatorios/dry-run.html).
- [x] Executar `npm test` (código 0): **23 cenários/149 passos passed**; [`../relatorios/execucao.txt`](../relatorios/execucao.txt), [`../relatorios/cucumber-report.json`](../relatorios/cucumber-report.json) e [`../relatorios/cucumber-report.html`](../relatorios/cucumber-report.html).
- [x] Conferir que JSON e HTML atuais contêm as quatro features; HTML verificado como arquivo/conteúdo gerado.
- [ ] Abrir manualmente o HTML no navegador para inspeção visual (não realizado nesta verificação).
- [x] Atualizar README e `docs/historias.md` para quatro US, status `delivered` **apenas do escopo local**, saída real e fora de escopo de RN02/RN03–RN08; não atribuir os resultados locais ao Studio.
- [x] Conferir paths relativos de documentação e separar a execução atual 23/149 dos artefatos históricos removidos. O token exposto no arquivo histórico deve ser revogado pela responsável; sua remoção local não o revoga.

## Dependências externas / não declaradas concluídas

- [ ] Alinhar e comprovar entrega em repositório Git exigida pelo PDF; a existência de `.git` local não comprova publicação. Nenhum commit/push foi realizado nesta atualização.
- [ ] Revogar/rotacionar o token exposto no artefato histórico removido e verificar seus acessos, por responsável autorizado; a remoção dos arquivos da entrega não invalida credenciais já expostas.
- [ ] Se houver exigência de quatro histórias no Cucumber Studio, migrar e colher evidência específica; os resultados locais não comprovam cadastro na plataforma.
- [ ] Se a restauração de uma edição fora de `rascunho` entrar no produto, resolver divergência com a restrição atual do domínio, especificar critério e validar. Não extrapolar RN01 sem decisão.
