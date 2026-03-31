<h1>Cascader Converter</h1>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)


Status do Projeto: :heavy_check_mark: <!-- > :heavy_check_mark:--> Concluído <!-- > :warning:-->

### Tópicos

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto-pencil)

:small_blue_diamond: [Funcionalidades](#funcionalidades-wrench)

:small_blue_diamond: [Layout](#layout-dash)

<!-- :small_blue_diamond: [Pré-requisitos](#pré-requisitos) -->

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

<!-- :small_blue_diamond: [Dependencias e libs utilizadas](#dependencias-e-libs-utilizadas-books) -->

## Descrição do projeto :pencil:

<p align="justify">
  Conversor de unidades CSS e calculadora de tipografia fluida com `clamp()`.
</p>

## Funcionalidades :wrench:

### Conversor de Unidades CSS

Converta valores entre 8 unidades CSS:

| Unidade | Descrição               | Base padrão |
| ------- | ----------------------- | ----------- |
| `px`    | Pixels                  | —           |
| `rem`   | Root em                 | 16px        |
| `em`    | Em (relativo ao pai)    | 16px        |
| `vw`    | Viewport Width          | 1920px      |
| `vh`    | Viewport Height         | 1080px      |
| `dvh`   | Dynamic Viewport Height | 1080px      |
| `cm`    | Centímetros             | 96 DPI      |
| `%`     | Porcentagem             | 1000px      |

Todas as conversões passam por `px` como unidade intermediária, seguindo o padrão amplamente adotado na comunidade web. Os valores de referência (viewport, font-size raiz, etc.) são editáveis pelo usuário.

### Tipografia Fluida

Gere valores `clamp()` para tamanho de fonte e altura de linha responsivos:

- Defina tamanho mínimo e máximo da fonte (em px)
- Defina altura de linha mínima e máxima (em px)
- Defina viewport mínima e máxima (em px)
- Pré-visualize o resultado com um slider que simula diferentes larguras de tela
- Copie os valores `clamp()` gerados com um clique

## Layout :dash:


![N|Solid](https://iili.io/B2oeiRp.png)

---

![N|Solid](https://iili.io/B2oesON.png)

<!-- ## Pré-requisitos

:warning: [Node](https://nodejs.org/en/download/)

...

Liste todas as dependencias e libs que o usuário deve ter instalado na máquina antes de rodar a aplicação  -->

## Como rodar a aplicação :arrow_forward:

### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação

```bash
git clone https://github.com/seu-usuario/www.cascaderconverter.com.git
cd www.cascaderconverter.com
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

> [ACESSAR APP WEB](https://whatsappnoadd.vercel.app/)

<!-- ## Como rodar os testes

Coloque um passo a passo para executar os testes

```
$ npm test, rspec, etc
```

## Casos de Uso

Explique com mais detalhes como a sua aplicação poderia ser utilizada. O uso de **gifs** aqui seria bem interessante.

Exemplo: Caso a sua aplicação tenha alguma funcionalidade de login apresente neste tópico os dados necessários para acessá-la.

## JSON :floppy_disk:

### Usuários:

|name|email|password|token|avatar|
| -------- |-------- |-------- |-------- |-------- |
|Lais Lima|laislima98@hotmail.com|lais123|true|https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9-U_HbQAipum9lWln3APcBIwng7T46hdBA42EJv8Hf6Z4fDT3&usqp=CAU|

...

Se quiser, coloque uma amostra do banco de dados

## Iniciando/Configurando banco de dados

Se for necessário configurar algo antes de iniciar o banco de dados insira os comandos a serem executados  -->

<!-- ## Dependencias e libs utilizadas :books:

- [JSPDF](https://artskydj.github.io/jsPDF/docs/jsPDF.html) -->

<!-- ## Resolvendo Problemas :exclamation:

Em [issues]() foram abertos alguns problemas gerados durante o desenvolvimento desse projeto e como foram resolvidos.  -->

<!-- ## Tarefas em aberto

Se for o caso, liste tarefas/funcionalidades que ainda precisam ser implementadas na sua aplicação

:memo: Tarefa 1

:memo: Tarefa 2

:memo: Tarefa 3  -->

## Licença

Copyright :copyright: 2026 - Jessica Aguiar
