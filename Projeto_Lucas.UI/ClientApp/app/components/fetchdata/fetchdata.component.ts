import { Component, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

//import { TextMaskModule } from '../../../src/angularTextMask';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})

export class FetchDataComponent {
    clientes: Cliente[];
    cliente: Cliente;

    public Ids = 0;
    public Ativos = true;
    public DataCadastros = new Date();
    public Nomes = "";
    public Nascimentos = new Date();
    public CPFs = 0;
    public Emails = "";
    public Enderecos = "";

    constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
        this.ngGetClientes();        
    }

    AddCliente() {
        this.router.navigate(['/cliente-editar/' + '0']);
    }

    UpdateCliente(Id: number) {
        this.router.navigate(['/cliente-editar/' + Id]);
    }

    ngGetClientes() {
        this.http.get('http://localhost:5001/api/clientes').subscribe(result => {
            this.clientes = result.json() as Cliente[];
        }, error => console.error(error));
    } 

    ngDeleteCliente(id: number) {
        let r = confirm("Deseja realmente excluir esse Cliente?")
        let mensagem = "";
        if (r) {
            this.http.delete('http://localhost:5001/api/cliente/' + id)
                .toPromise()
                .then(response => {
                    return mensagem = "Cliente " + response.text() + " excluido com sucesso!";
                }).catch(error => { return mensagem = error.message })
            setTimeout(() => {
                this.ngGetClientes();
                alert("Cliente excluido com sucesso!");
            }, 1000);
        }
    }
}

interface Cliente {
    id: number,
    ativo: boolean,
    dataCadastro: Date,
    nome: string,
    nascimento: Date,
    cpf: number,
    email: string,
    endereco: string
}
