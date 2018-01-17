import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'produtoeditar',
    templateUrl: './produtoeditar.component.html'
})

export class ProdutoEditarComponent implements OnInit {

    produto: Produto;
    public Ids = 0;
    public Ativos = true;
    public DataCadastros = new Date();
    public Titulos = "";
    public Valores = 0;
    chkValidacao: boolean = true;

    constructor(private http: Http, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.Ids = + params['id'];
        });
        if (this.Ids != 0)
            this.ngGetProduto(this.Ids);
    }

    //public maskValor = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/];    

    changeStatus() {
        this.chkValidacao = this.chkValidacao ? false : true;
    }

    ngGetProduto(id: number) {
        return this.http.get('http://localhost:5001/api/produto/' + id).subscribe(result => {
            this.produto = result.json() as Produto;

            this.Ativos = this.produto.ativo;
            this.Titulos = this.produto.titulo;
            this.Valores = this.produto.valor;
            this.DataCadastros = this.produto.dataCadastro;
            this.chkValidacao = this.produto.ativo;

        }, error => console.error(error));
    }

    ngAddProduto(Id: string, Titulo: string, Valor: string, DataCadastro: Date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        let mensagem = "";

        let valorFormatado = Valor.replace(',', '.');

        let produtoAdd = {
            Id: Id == "" ? 0 : Id,
            DataCadastro: new Date(),
            Titulo: Titulo,
            Valor: parseFloat(valorFormatado),
            Ativo: this.chkValidacao
        };

        if (this.Ids == 0) {
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
            alert(mensagem);
            this.router.navigate(['/counter']);
        }, 250);
    }
}

export interface Produto {
    id: number,
    ativo: boolean,
    dataCadastro: Date,
    titulo: string,
    valor: number
}
