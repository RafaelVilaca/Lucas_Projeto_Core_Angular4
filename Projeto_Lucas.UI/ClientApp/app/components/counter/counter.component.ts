import {
    Component,
    Input, trigger,
    state,
    style,
    transition,
    animate,
    keyframes
} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})

export class CounterComponent {
    produtos: Produto[];
    produto: Produto;

    public Ids = 0;
    public Ativos = true;
    public DataCadastros = new Date();
    public Titulos = "";
    public Valores = 0;
    public NovoProduto = false;
    animStatus: string = 'inactive';
    AddProdutoTable: Boolean = false;
    chkValidacao: Boolean = true;

    constructor(private http: Http) {
        this.NovoProduto = false;
        this.AddProdutoTable = false;
        this.ngGetProdutos();
    }

    AddProduto() {
        this.animButton();
        this.AddProdutoTable = true;
        this.NovoProduto = true;
        this.Ids = 0;
        this.Titulos = "";
        this.Valores = 0;
        this.DataCadastros = new Date();
        this.chkValidacao = true;
    }

    animButton() {
        this.animStatus = (this.animStatus === 'inactive' ? 'active' : 'inactive');
    }

    UpdateProduto(Id: number, Ativo: boolean, Titulo: string, Valor: number, DataCadastro: Date) {
        this.animButton();
        this.AddProdutoTable = true;
        this.NovoProduto = false;
        this.Ids = Id;
        this.Ativos = Ativo;
        this.Titulos = Titulo;
        this.Valores = Valor;
        this.DataCadastros = DataCadastro;
        this.chkValidacao = Ativo;
    }

    changeStatus() {
        this.chkValidacao = this.chkValidacao ? false : true;
    }

    ngGetProdutos() {
        this.http.get('http://localhost:5001/api/produtos').subscribe(result => {
            this.produtos = result.json() as Produto[];
        }, error => console.error(error));
    }

    ngGetProduto(id: number) {
        return this.http.get('http://localhost:5001/api/produto/' + id).subscribe(result => {
            this.produto = result.json() as Produto;
        }, error => console.error(error));
    }

    ngAddProduto(Id: string, Titulo: string, Valor: number, DataCadastro: Date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        let mensagem = "";

        let produtoAdd = {
            Id: Id == "" ? 0 : Id,
            DataCadastro: new Date(),
            Titulo: Titulo,
            Valor: Valor,
            Ativo: this.chkValidacao
        };

        if (this.NovoProduto) {
            this.http.post('http://localhost:5001/api/produto', produtoAdd)
                .toPromise()
                .then(response => {
                    return mensagem = "Produto " + response.text() + " incluido com sucesso!";
                }).catch(error => { return mensagem = error.message })
        } else {
            produtoAdd.DataCadastro = this.DataCadastros;
            this.http.put('http://localhost:5001/api/produto', produtoAdd)
                .toPromise()
                .then(response => {
                    return mensagem = "Produto " + response.text() + " editado com sucesso!";
                }).catch(error => { return mensagem = error.message })
        }
        setTimeout(() => {
            this.AddProdutoTable = false;
            this.ngGetProdutos();
            alert(mensagem);
        }, 250);

    }

    ngDeleteProduto(id: number) {
        let r = confirm("Deseja realmente excluir esse Produto?")
        if (r) {
            let mensagem = "";
            
            this.http.delete('http://localhost:5001/api/produto/' + id)
                .toPromise()
                .then(response => {
                    return mensagem = "Produto " + response.text() + " excluido com sucesso!";
                }).catch(error => { return mensagem = error.message })
            setTimeout(() => {
                this.ngGetProdutos();
                alert(mensagem);
            }, 250);
        }
    }

    closeEdit() {
        this.Ids = 0;
        this.Ativos = true;
        this.DataCadastros = new Date();
        this.Titulos = "";
        this.Valores = 0;
        this.NovoProduto = false;
        this.chkValidacao = true;
    }
}

export interface Produto {
    id: number,
    ativo: boolean,
    dataCadastro: Date,
    titulo: string,
    valor: number
}
