import { Component, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

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

    constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
        this.ngGetProdutos();
    }

    AddProduto() {
        this.router.navigate(['/produto-editar/' + '0']);
    }

    UpdateProduto(Id: number) {
        this.router.navigate(['/produto-editar/' + Id]);
    }

    ngGetProdutos() {
        this.http.get('http://localhost:5001/api/produtos').subscribe(result => {
            this.produtos = result.json() as Produto[];
        }, error => console.error(error));
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
}

export interface Produto {
    id: number,
    ativo: boolean,
    dataCadastro: Date,
    titulo: string,
    valor: number
}
