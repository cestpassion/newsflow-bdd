# Plano de cobertura — quatro histórias NewsFlow BDD

**Entrega:** quatro histórias (US01–US04), quatro arquivos `.feature`, steps verificáveis e relatórios HTML/JSON. `npm test` executou **23 cenários e 149 passos com sucesso** em 05/11/2026.

Enunciado: exercicio-newsflow.pdf (fornecido à parte; não incluído no repositório). Capítulos 01–04, 06–07; [histórias e critérios](../docs/historias.md).

## Premissas e fronteiras

- Serviço didático **em memória**, relógio controlado por cenário, World isolado e personas de teste; não há autenticação integrada, servidor, banco, envio real nem teste de interface.
- RN01: edição nasce em rascunho; salvamentos em ciclos periódicos de 30 segundos, não por inatividade (decisão confirmada pela usuária); cada salvamento gera versão numerada; retêm-se as últimas 20; restauração de versão disponível não apaga posteriores. A divergência entre quadro RN01 e exemplo de história do PDF está registrada em [`../docs/historias.md`](../docs/historias.md).
- RN02 **parcial**: submissão, aprovação independente e reprovação comentada. Não se implementou envio/agendamento nem seu bloqueio sem aprovação.
- A restauração em estados que não sejam `rascunho` não está coberta pelas features: o PDF não a restringe, mas o domínio atual em `../src/newsflow.js` a rejeita. Não tratar essa restrição de implementação como regra aprovada; caso esse fluxo entre no escopo, requer decisão de produto e teste.

## Histórias e evidências

| Item | Cobertura | Evidência |
| --- | --- | --- |
| Histórias | Quatro US, critérios CA e recorte documentados | [`../docs/historias.md`](../docs/historias.md) |
| US01 | Criação, autoria, salvamento periódico e fronteira 29/30/31 s; 7 casos executáveis | [`../features/us01-rascunho.feature`](../features/us01-rascunho.feature) |
| US02 | Numeração, fotografia de conteúdo e fronteira 19/20/21 versões; 6 casos | [`../features/us02-versoes.feature`](../features/us02-versoes.feature) |
| US03 | Restauração mantida, histórico preservado e exceção descartada; 4 casos | [`../features/us03-restauracao.feature`](../features/us03-restauracao.feature) |
| US04 | Submissão, revisão independente e comentário obrigatório; 6 casos; RN02 parcial | [`../features/us04-revisao.feature`](../features/us04-revisao.feature) |
| Automação | `npm run test:dry`: 23 cenários/149 passos ignorados como esperado; `npm test`: 23 cenários/149 passos aprovados, sem falhas; relógio controlado e World por cenário | [`../relatorios/dry-run.txt`](../relatorios/dry-run.txt), [`../relatorios/execucao.txt`](../relatorios/execucao.txt), [`../features/support/world.js`](../features/support/world.js) |
| Relatórios | JSON/HTML com quatro features e resultado da execução | [`../relatorios/cucumber-report.json`](../relatorios/cucumber-report.json), [`../relatorios/cucumber-report.html`](../relatorios/cucumber-report.html), [`../README.md`](../README.md) |

## Resultado e limites

- Os JSONs de execução normal listam 4 features, **7 + 6 + 4 + 6 = 23** casos e **149 passos `passed`**; no dry-run os 149 são `skipped`. Os HTMLs gerados contêm as quatro features atuais. O dry-run não substitui a execução efetiva.
- A automação valida o serviço em memória; interface, autenticação, persistência externa e envio efetivo não fazem parte da suíte. RN02 cobre apenas a decisão editorial; RN03–RN08 ficam fora do escopo.
