# Workshop Angular

Neste workshop de angular vamos desenvolver uma aplicação simples com uma tela de login que conterá validação de formulário. A idéia é apresentar elementos básicos de uma aplicação angular.

## O que será abordado:

- Módulos, Componentes e Serviços
- Routing do Angular
- Forms e Validators
- Requisições Http

## Pré-requisitos:

- Ter instalado Git, Node, NPM e a CLI do angular
- Conhecimento básico de javascript e Git
- Noção básica do que é o Angular e pra que ele serve

## Rodando o projeto:

Primeiramente você deve clonar este repositório
```
git clone https://github.com/VitorIsaacSM/workshop-angular.git
```
Depois disso, na pasta do projeto faça o download das dependências que a aplicação utiliza

```
npm install
```
e para iniciar a aplicação

```
npm start
```

## Passo a Passo:

#### Criação de componentes

Para criarmos novos componentes no Angular através da CLI usamos o comando
```
ng generate component <nome_do_component>
```
Ou a forma abreviada
```
ng g c <nome_do_component>
```
Criaremos dois componentes, login onde faremos nossa tela de login com os formulários e home que será a tela principal.
É recomendavel usar a CLI do angular para criar novos componentes pois ela automaticamente adiciona os mesmos no Módulo da pasta onde o componente foi criado, porém é possivel criar os arquivos e adicionar ao módulo manualmente.

#### Routing

Para podermos renderizar os componentes que criamos ao acessar uma rota específica, devemos adicionar dentro do objeto "Routes" que se encontra no arquivo "app-routing.module.ts", um novo objeto que contenha as "path" que é uma string com o segmento de rota e "component" que é a classe do component que você deseja.
```
const routes: Routes = [
  {path: <'caminho'>, component: <Component>}
]
```
Adicionaremos duas rotas, uma para cada componente que criamos e com os respectivos caminhos 'login' e 'home'.
Agora ao Acessarmos na barra de endereço

#### Tela de Login

Dentro do arquivo "login.component.html" faremos um formulário básico de HTML com um input de texto para o nome de usuario e outro para a senha, além disso um botão de login.
Adicionaremos também algumas classes de css do bootstrap (que ja foi instalado previamente na branch master) para deixar a pagina um pouco mais bonita, e também centralizaremos os campos no meio da tela.


```
<form class="login">
    <div class="mb-3 form-group">
        <h3>Nome de usuario:</h3>
        <input class="form-control mb-1" type="text">
    </div>

    <div class="mb-3 form-group">
        <h3>Senha:</h3>
        <input class="form-control mb-1" type="password">
    </div>
    <button class="btn btn-primary w-100 mt-3">Login</button>
</form>
```
E no arquivo "login.component.scss" (O projeto esta configurado para utilizar SCSS mas ele é 100% compativel com CSS padrão)
```
.login {
    margin: auto;
    margin-top: 30vh;
    max-width: 500px;
    text-align: center;
}
```

Assim está pronto o layout simples da nossa tela de login, porém ainda precisamos pegar os dados digitados nos campos para depois enviarmos para a API que realiza a autenticação.

#### Módulos

Todas aplicações angular começam por padrao com o componente "app.componet" e o módulo "app.module" que são a raiz do seu app, o app.component será sempre renderizado, por isso na maioria das vezes ele contém o "router-outlet" que é onde o angular renderiza o componente da rota atual. Também temos o app.module que é o módulo raiz do app, módulos definem um escopo para os componentes e  geralmente contém estas propriedades:

- Declarations:
  Todos os componentes em uma aplicação angular devem ser declarados em algum módulo (neste app usaremos apenas o app.module), e componentes que estão declarados em um módulo só reconhecem outros componentes que também estejam declarados naquele módulo ou que estejam declarados e exportados em um outro módulo o qual o seu módulo esteja importando.

- Imports:
  Dentro de imports adicionamos somente outros módulos, permitindo que componentes declarados em um módulo tenham acesso à coisas que estão sendo exportadas em outros.

- Exports:
  Em exports adicionamos componentes que estão declarados e desejamos exportar para outros módulos, ou seja, que quando este módulo for importado por outro, este outro tenha acesso aos componentes que estão sendo exportados sem precisar declara-los.

- Providers:
  Dentro de providers colocamos serviços que não possuem escopo "raiz" (global), para que eles possam ser usados dentro dos componentes do módulo.

- Bootstrap:
  Esta propriedade irá apenas dentro do app.module, e servirá para dizer qual o componente raiz que irá ser renderizado sempre, por padrão é o "app.component".

Para fazer nossos formulários primeiro precisamos dizer para o angular que iremos usar o módulo que nos permite fazer tal coisa, que neste caso é o "ReactiveFormsModule".

```
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Formulário e validação

Dentro do componente de login primeiramente vamos fazer a injeção de dependência do serviço de FormBuilder, que nos permite criar um grupo de campos de formulário chamado FormGroup.

```
constructor(private fb: FormBuilder) { }
```
Mais sobre injeção de dependência no angular: https://angular.io/guide/dependency-injection

Agora também na classe do nosso componente de login vamos criar a propriedade form, que será um objeto do nosso formulário que conterá informações de cada campo (nome de usuário e senha) e se eles são válidos ou não.

```
form = this.fb.group({
    username: ['', Validators.required],
    senha: ['', Validators.required]
  }) as FormGroup;
```
Esta propriedade será um FormGroup, que é um grupo de FormControls. Cada campo de nosso formulário é considerado um FormControl, que contém o valor atual do campo, e outras propriedades de validação e status. FormControls podem possuir validadores que são funções que analisam o valor atual do campo e dizem se ele é válido ou não, no código acima dizemos que os campos username e senha terão o validador "required" que coloca o status destes FormControls como inválido quando eles estiverem vazios.

Mais sobre Formulários: https://angular.io/guide/reactive-forms

Agora em nosso HTML precisamos dizer que nosso form está relacionado com a propriedade que criamos, e também relacionar os campos de nome de usuario e senha, com os FormControls do nosso FormGroup.

```
<form class="login" [formGroup]="form">
    <div class="mb-3 form-group">
        <h3>Nome de usuario:</h3>
        <input formControlName="username" class="form-control mb-1" type="text">
    </div>

    <div class="mb-3 form-group">
        <h3>Senha:</h3>
        <input formControlName="senha" class="form-control mb-1" type="password">
    </div>

    <span *ngIf="senhaInvalida" class="text-danger">Usuario ou senha invalidos</span>
    <button class="btn btn-primary w-100 mt-3">Login</button>
</form>
```

Utilizamos primeiramente o atributo formGroup dentro da tag form, porém ele precisa estar entre colchetes pois dessa forma o angular sabe que voce quer acessar a propriedade form que está dentro da classe de seu componente e não a string "form", assim relacionamos o formulário com nosso FormGroup. Agora devemos linkar nossos inputs com os FormControls, utilizamos o atributo "formControlName" dentro das tags input para dizer que o nome (repare que aqui sim queremos a string do nome, por isso não usamos colchetes) da propriedades que queremos relacionar sao "username" e "senha" e devem ser os mesmos nomes que colocamos na declaração de nosso form.

Nosso formulário simples de HTML já está "bindado" com a propriedade form que criamos, agora precisamos adicionar algumas validações e um método que realiza o login quando o usuário apertar o botão de login.

Vamos primeiro adicionar mensagens de erro que serão disparadas quando o usuário já tiver alterado o valor de um campo, e mesmo assim ele estiver em branco (o que significa que o usuário propositalmente deixou ele em branco).

Adicione spans embaixo de cada input com mensagens dizendo que o campo está invalido. Utilize também a classe "text-danger" que coloca nosso texto na cor padrão danger do bootstrap (que é vermelha) passando a idéia de que há um erro no preenchimento do campo. Também adicionamos a diretiva "ngIf" do angular que vai esconder a tag span, quando o resultado do método que passamos para ela seja falso (criaremos os metodos isUsernameInvalid e isSenhaInvalid em seguida).

Além disso no botão de login, adicione um a propriedade "(click)" e diga que ela será igual ao método "login()", que criaremos em sequencia dentro da nossa classe do componente login. Assim, quando o botão for clicado será executado o método login.

```
<form class="login" [formGroup]="form">
    <div class="mb-3 form-group">
        <h3>Nome de usuario:</h3>
        <input formControlName="username" class="form-control mb-1" type="text">
        <span *ngIf="isUsernameValid()" class="text-danger">Digite o nome de usuario</span>
    </div>

    <div class="mb-3 form-group">
        <h3>Senha:</h3>
        <input formControlName="senha" class="form-control mb-1" type="password">
        <span *ngIf="isSenhaInvalid()" class="text-danger">Digite uma senha</span>
    </div>

    <span *ngIf="senhaInvalida" class="text-danger">Usuario ou senha invalidos</span>
    <button class="btn btn-primary w-100 mt-3" (click)="login()">Login</button>
</form>
```

Agora vamos adicionar os métodos que referenciamos em nosso HTML dentro da classe de nosso componente de login

```
  login() {
    if (this.form.invalid) {
      this.username.markAsDirty();
      this.senha.markAsDirty();
      return;
    }
  }

  get username() {
    return this.form.get('username');
  }

  get senha() {
    return this.form.get('senha');
  }

  isUsernameInvalid(): boolean {
    return this.username.dirty && this.username.invalid;
  }

  isSenhaInvalid(): boolean {
    return this.senha.dirty && this.senha.invalid;
  }
```

Primeiramente vamos criar os 2 getters username e senha, que irão nos retornar o formControl dos campos de nome de usuário e senha.
A partir dos formControls podemos saber se o usuário ja alterou o valor inicial do campo (status dirty), se ele está valido (se os validadores passam) e o valor atual do campo.

Então criamos os métodos que checam se os campos individuais sao inválidos, ou seja se pode mostrar a mensagem de que os campos são necessarios. Para isso queremos que o usuário ja tenha alterado o valor inicial do campo e que ele esteja vazio, por isso utilizamos dirty e invalid (lembrando que usamos invalid, pois colocamos o validador de "required" que deixa nosso campo invalido se ele estiver em branco).

Também Adicionamos o método de login que futuramente irá fazer o request de autenticação, mas por hora só contém mais uma camada de validação que é: se o usuário clicar em login com o formulário inválido (isto é, pelo menos algum campo em branco) então ele não só retorna mas antes disso, coloca os campos do form como dirty para que a mensagem de que os campos são necessários seja mostrada através do método markAsDirty().


#### Serviços e Requisiçõs Http

Em projetos angular por padrão, devemos fazer requisições http dentro de serviços, que são classes que podem ser injetadas no seu componente, e contém um estado próprio dentro de um escopo. Então vamos criar um serviço para fazermos nosso request de autenticação para a API.

```
ng generate service <nome_do_servico>
```
ou a forma abreviada:
```
ng g s login
```

Dentro do serviço que criamos vamos injetar o HttpClient, que nos permite fazer requisições Http e é o padrão do angular para isso.
Primeiro será necessário importar no seu app.module o "HttpClienteModule".

Crie também um método de login que será chamado pelo seu componente. Este método realizará uma requisição do tipo POST e passará um objeto JSON no body da requisição conteudo as propriedades username e password.

```
  constructor(private http: HttpClient) { }

  login(username: string, senha: string) {
    return this.http.post('/api/login', {username, password: senha});
  }
```

Agora Podemos injetar o serviço de login dentro do nosso componente de login e chamar o metodo que criamos dentro do método que ja é chamado quando o usuário clica no botão para se logar.

em login.component
```
  login() {
    if (this.form.invalid) {
      this.username.markAsDirty();
      this.senha.markAsDirty();
      return;
    }
    this.loginService.login(this.username.value, this.senha.value).subscribe(
      (res: {token: string}) => {
        localStorage.setItem('token', res.token);
      }
    );
  }
```

Ao chamar o método de login do nosso serviço, ele nos retornará um Observable ao qual podemos no inscrever para esperar a reposta da chamada assíncrona da API. Chamamos o método subscribe() e passamos como parametro um callback com a resposta da api (que neste caso é um objeto com a propriedade token que é uma string) e neste callback simplesmente pegamos o token e salvamos ele no localStorage do navegador, como é o padrão.

Feito isso ja teremos nosso login integrado com a API (a API neste projeto ja está disponibilizada e configurada com um proxy por isso apenas dizemos /api/login em nosso request, pois a ja está configurado no proxy a URL inteira do resquest)

#### Dúvidas?
Documentação do Angular:
- Componentes: https://angular.io/guide/architecture-components
- Módulos: https://angular.io/guide/architecture-modules
- Serviços: https://angular.io/tutorial/toh-pt4
- Routing: https://angular.io/guide/router
- Formulários: https://angular.io/guide/reactive-forms
- Http: https://angular.io/guide/http




