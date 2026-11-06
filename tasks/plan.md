# Plano e checkpoints — quatro histórias NewsFlow BDD

**Estado em 05/11/2026:** implementação didática local de US01–US04 validada por `npm run test:dry` e `npm test` (ambos código 0). O requisito externo de entrega em repositório Git **permanece pendente**: há metadados Git locais, mas a publicação não foi comprovada.  
Enunciado: exercicio-newsflow.pdf (fornecido à parte; não incluído no repositório). Capítulos 01–04, 06–07; [histórias e critérios](../docs/historias.md). A fonte executável atual são as quatro features locais.  
**Meta local atingida:** quatro histórias e quatro `.feature` (uma por US), steps verificáveis, `npm test` verde e HTML/JSON da execução local atual.

## Premissas e fronteiras

- Serviço didático **em memória**, relógio controlado por cenário, World isolado e personas de teste; não há autenticação integrada, servidor, banco, envio real nem teste de interface.
- RN01: edição nasce em rascunho; salvamentos em ciclos periódicos de 30 segundos, não por inatividade (decisão confirmada pela usuária); cada salvamento gera versão numerada; retêm-se as últimas 20; restauração de versão disponível não apaga posteriores. A divergência entre quadro RN01 e exemplo de história do PDF está registrada em [`../docs/historias.md`](../docs/historias.md).
- RN02 **parcial**: submissão, aprovação independente e reprovação comentada. Não se implementou envio/agendamento nem seu bloqueio sem aprovação. RN03–RN08 estão fora do escopo pelas dependências de operação de envio, público, consentimento ou notificações descritas no [README](../README.md#fora-de-escopo).
- A restauração em estados que não sejam `rascunho` não está coberta pelas features: o PDF não a restringe, mas o domínio atual em `../src/newsflow.js` a rejeita. Não tratar essa restrição de implementação como regra aprovada; caso esse fluxo entre no escopo, requer decisão de produto e teste.
- Prioridades das US em `../docs/historias.md` são **propostas**, não homologações de produto. Nenhum resultado local comprova atualização do Studio nem publicação de repositório.

## Sequência e aceite verificado

| Fatia | Resultado local | Evidência |
| --- | --- | --- |
| 0 — definir | Quatro US, critérios CA e recorte documentados | [`../docs/historias.md`](../docs/historias.md) |
| 1 — US01 | Criação, autoria, salvamento periódico e fronteira 29/30/31 s; 7 casos executáveis | [`../features/us01-rascunho.feature`](../features/us01-rascunho.feature) |
| 2 — US02 | Numeração, fotografia de conteúdo e fronteira 19/20/21 versões; 6 casos | [`../features/us02-versoes.feature`](../features/us02-versoes.feature) |
| 3 — US03 | Restauração mantida, histórico preservado e exceção descartada; 4 casos | [`../features/us03-restauracao.feature`](../features/us03-restauracao.feature) |
| 4 — US04 | Submissão, revisão independente e comentário obrigatório; 6 casos; RN02 parcial | [`../features/us04-revisao.feature`](../features/us04-revisao.feature) |
| 5 — automação | `npm run test:dry`: 23 cenários/149 passos ignorados como esperado; `npm test`: 23 cenários/149 passos aprovados, sem falhas; relógio controlado e World por cenário | [`../relatorios/dry-run.txt`](../relatorios/dry-run.txt), [`../relatorios/execucao.txt`](../relatorios/execucao.txt), [`../features/support/world.js`](../features/support/world.js) |
| 6 — evidência | Relatórios JSON/HTML atualizados com quatro features; README e status das histórias conciliados | [`../relatorios/cucumber-report.json`](../relatorios/cucumber-report.json), [`../relatorios/cucumber-report.html`](../relatorios/cucumber-report.html), [`../README.md`](../README.md) |

## Verificações, limitações e próxima decisão

- Os JSONs de execução normal listam 4 features, **7 + 6 + 4 + 6 = 23** casos e **149 passos `passed`**; no dry-run os 149 são `skipped`. Os HTMLs gerados contêm as quatro features atuais. O dry-run não substitui a execução efetiva.
- Os relatórios mantidos nesta entrega são somente os da execução normal e do dry-run das quatro features atuais; nenhum resultado local comprova cadastro das quatro US no Studio.
- `npm ci` **não foi reexecutado nesta verificação**: a suíte usou dependências já instaladas. O HTML/JSON foi inspecionado como arquivo/estrutura e conteúdo de features, sem atestar abertura manual em navegador.
- Alinhar com a responsável como entregar o **repositório Git** exigido pelo PDF. Não criar repo, commitar, publicar, nem declarar essa exigência satisfeita por testes locais.
