# n8n-nodes-api-cmdeb (API CMDEB 2.0 - SEDUC - CE)

Node n8n personalizado (Community Node) para integração e autenticação nativa com a API CMDEB 2.0 (Gestão Presente MEC) - SEDUC CE.

---

## Principais Funcionalidades

- **Autenticação Nativa Integrada:** O node cuida da geração e injeção do Bearer Token por baixo dos panos a partir de usuário e senha.
- **Múltiplos Ambientes:** Suporte pronto para **Produção** (`api-cmde2.gestaopresente.mec.gov.br`) e **Homologação** (`api-cmde2.hmg.gestaopresente.mec.gov.br`).
- **Endpoints Mapeados:** Interface robusta para o consumo de todos os módulos da v2.0 da API:
  - Avaliação de Desempenho
  - Componentes Curriculares
  - Estudantes (Listagem, Edição e Criação com/sem Turma)
  - Frequência Mensal (Criação, Edição, Listagem e Faltantes)
  - Instituições de Ensino
  - Lotes (Status, Erros, Listagem)
  - Matrículas (Conclusões, Enturmações, Movimentações, Edição)
  - Pé-de-Meia (Elegibilidades, Incentivos)
  - Pessoas (Solicitações de Alterações, Validações Cadastrais)
  - Profissionais (Criação, Edição, Formações, Funções, Enturmação)
  - Termos de Autorização
  - Turmas (Criação, Edição, Componentes Curriculares)

---

## Estrutura do Projeto

```text
n8n-nodes-api-cmdeb/
├── credentials/
│   └── ApiCmdeb2.credentials.ts        # Lida com a criação da sessão e tokens
├── nodes/
│   └── ApiCmdeb2/
│       ├── ApiCmdeb2.node.ts           # Definição central do Node N8N
│       ├── Services.ts                 # Direcionador de endpoints
│       ├── properties/                 # Definição UI/Campos do node no N8N
│       ├── services/                   # Intermediadores de regras e serviços
│       └── endpoints/                  # Ações HTTP individuais mapeadas da API
└── package.json
```

---

## Como Instalar e Rodar Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Compile o node:**
   ```bash
   npm run build
   ```
3. **Inicie para desenvolvimento contínuo (Watch):**
   ```bash
   npm run dev
   ```

---

## Como Utilizar no n8n

### 1. Instalação como Community Node

Dentro da sua instância do n8n, vá em **Settings → Community Nodes → Install** e informe o nome do pacote:

```
n8n-nodes-api-cmdeb
```

Após a instalação, o node **CMDEB 2.0** estará disponível na paleta de nodes.

---

### 2. Configurando as Credenciais

As credenciais armazenam o acesso à API e gerenciam o ciclo de vida do token de autenticação automaticamente. Você não precisa lidar com tokens manualmente.

#### Passo a passo

**1.** No n8n, vá em **Credentials → New Credential** e selecione o tipo **API CMDEB 2.0**.

**2.** Preencha os campos conforme descrito abaixo:

| Campo | Descrição | Obrigatório |
|---|---|---|
| **Ambiente** | Selecione `Produção` para o ambiente oficial do MEC ou `Homologação` para testes | ✅ |
| **Usuário** | CPF ou nome de usuário cadastrado no sistema Gestão Presente | ✅ |
| **Senha** | Senha correspondente ao usuário cadastrado | ✅ |

> **Produção:** `https://api-cmde2.gestaopresente.mec.gov.br`
>
> **Homologação:** `https://api-cmde2.hmg.gestaopresente.mec.gov.br`

**3.** Clique em **Save** para salvar e testar a credencial. O n8n realizará um login de verificação automaticamente.

#### Como funciona a autenticação

O node realiza o login na API usando o endpoint `/api/v2/auth/login` com o usuário e senha fornecidos. O `access_token` JWT retornado é armazenado internamente e injetado automaticamente no header `Authorization: Bearer {token}` em todas as requisições subsequentes. Quando o token expira, o node solicita um novo token de forma transparente, sem interromper os workflows.

> ⚠️ **Atenção:** As credenciais de produção e homologação são independentes. Certifique-se de usar o ambiente correto para cada workflow.

---

### 3. Usando o Node em um Workflow

1. Adicione o node **API CMDEB 2.0** ao seu workflow.
2. Selecione a credencial criada no passo anterior.
3. Escolha o **Recurso** (ex: Estudantes, Matrículas, Lotes...).
4. Escolha a **Operação** correspondente (ex: Listagem, Cadastro, Edição...).
5. Preencha os parâmetros exibidos e execute o workflow.

---

## Tecnologias Usadas

- TypeScript
- Framework SDK N8N (`n8n-workflow`)
- Gulp (para build de ícones)
- Eslint & Prettier

---

## Documentação da API

A documentação oficial da API CMDEB 2.0 está disponível em:

- **Produção (ReDoc):** https://api-cmde2.gestaopresente.mec.gov.br/redoc
- **Homologação (ReDoc):** https://api-cmde2.hmg.gestaopresente.mec.gov.br/redoc

---

## Autor

Guilherme Nepomuceno de Carvalho — guilhermenepomuceno46@gmail.com