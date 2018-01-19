import { Component, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'produtoscliente',
    templateUrl: './produtoscliente.component.html'
})

export class ProdutosClienteComponent {
    produtoscliente: ProdutoCliente[];
    produto: ProdutoCliente;

    public Ids = 0;
    public DataCadastros = new Date();
    public IdClientes = 0;
    public IdProdutos = 0; 
    public Qtdes = 0;

    constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
        this.ngGetProdutosClientes();
    }

    AddProdutoCliente() {
        this.router.navigate(['/produtos-cliente/editar/' + '0']);
    }

    UpdateProdutoCliente(Id: number) {
        this.router.navigate(['/produtos-cliente/editar/' + Id]);
    }

    ngGetProdutosClientes() {
        this.http.get('http://localhost:5001/api/produtosCliente').subscribe(result => {
            this.produtoscliente = result.json() as ProdutoCliente[];
        }, error => console.error(error));
    }
}

export interface ProdutoCliente {
    id: number,
    dataCadastro: Date, 
    qtde: number,
    idCliente: number,
    idProduto: number
}
