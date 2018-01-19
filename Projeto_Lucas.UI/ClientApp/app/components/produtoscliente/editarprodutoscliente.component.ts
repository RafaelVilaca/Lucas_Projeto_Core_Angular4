import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'produtoclienteeditar',
    templateUrl: './editarprodutoscliente.component.html'
})

export class EditarProdutosClienteComponent implements OnInit {

    produtoCliente: ProdutoCliente;
    produtos: Produto[];
    clientes: Cliente[];
    public Ids = 0;
    public DataCadastros = new Date();
    public IdClientes = 0;
    public IdProdutos = 0;
    public NomeCli = "";
    public TituloProd = "";
    public Qtdes = 0;

    constructor(private http: Http, private route: ActivatedRoute, private router: Router) {

    }

    onSelectCliente(id: number) {
        for (var i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i].idCli == id) {
                this.IdClientes = this.clientes[i].idCli;
            }
        }
    }

    onSelectProduto(id: number) {
        for (var i = 0; i < this.produtos.length; i++) {
            if (this.produtos[i].idProd == id) {
                this.IdProdutos = this.produtos[i].idProd;
            }
        }
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.Ids = + params['id'];
        });
        if (this.Ids != 0)
            this.ngGetProdutosCliente(this.Ids);

        setTimeout(() => {
            this.ngGetClientes();
            this.ngGetProdutos();
        }, 1000);        
    }

    ngGetProdutosCliente(id: number) {
        return this.http.get('http://localhost:5001/api/produtosCliente/' + id).subscribe(result => {
            this.produtoCliente = result.json() as ProdutoCliente;

            this.Ids = this.produtoCliente.id;
            this.IdClientes = this.produtoCliente.idCliente;
            this.IdProdutos = this.produtoCliente.idProduto;
            this.DataCadastros = this.produtoCliente.dataCadastro;
            this.Qtdes = this.produtoCliente.qtde;

        }, error => console.error(error));
    }

    ngGetClientes() {
        this.http.get('http://localhost:5001/api/clientes').subscribe(result => {
            this.clientes = result.json() as Cliente[];
            //console.log(this.clientes);
        }, error => console.error(error));
    }

    ngGetProdutos() {
        this.http.get('http://localhost:5001/api/produtos').subscribe(result => {
            this.produtos = result.json() as Produto[];
            //console.log(this.produtos);
        }, error => console.error(error));
    }  

    ngAddProdutosCliente(Id: string, DataCadastro: Date, Qtde: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        let mensagem = "";

        if (Qtde <= "0" || !parseInt(Qtde))
            return alert("Entre com uma quantidade acima de 0");

        let produtoClienteAdd = {
            Id: Id == "" ? 0 : Id,
            DataCadastro: new Date(),
            IdCliente: this.IdClientes,
            IdProduto: this.IdProdutos,
            Qtde: parseInt(Qtde)
        };

        if (this.Ids == 0) {
            this.http.post('http://localhost:5001/api/produtosCliente', produtoClienteAdd)
                .toPromise()
                .then(response => {
                    return mensagem = "Produto " + response.text() + " incluido com sucesso!";
                }).catch(error => { return mensagem = error.message })
        } else {
            produtoClienteAdd.DataCadastro = this.DataCadastros;
            this.http.put('http://localhost:5001/api/produtosCliente', produtoClienteAdd)
                .toPromise()
                .then(response => {
                    return mensagem = "Produto " + response.text() + " editado com sucesso!";
                }).catch(error => { return mensagem = error.message })
        }
        setTimeout(() => {
            alert(mensagem);
            this.router.navigate(['/produtos-cliente']);
        }, 250);
    }
}

export interface ProdutoCliente {
    id: number,
    dataCadastro: Date,
    qtde: number,
    idCliente: number,
    idProduto: number
}

export interface Cliente {
    idCli: number,
    nome: string
}

export interface Produto {
    idProd: number,
    titulo: string
}
