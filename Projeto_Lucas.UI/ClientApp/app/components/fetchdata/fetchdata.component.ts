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
    public NovoCliente = false;
    chkValidacao: boolean = true;

    public maskCPF = [/[1-9]/, /[1-9]/, /[1-9]/, '.', /[1-9]/, /[1-9]/, /[1-9]/, '.', /[1-9]/, /[1-9]/, /[1-9]/, '-', /[1-9]/, /[1-9]/];
    //public maskTelefone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    
    AddClienteTable: boolean = false;

    animStatus: string = 'inactive';
    myName: string;

    constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
        this.myName = "Rafael";
        this.NovoCliente = false;
        this.AddClienteTable = false;
        this.ngGetClientes();        
    }

    changeStatus() {
        this.chkValidacao = this.chkValidacao ? false : true;
    }

    animButton() {
        this.animStatus = (this.animStatus === 'inactive' ? 'active' : 'inactive');
    }

    AddCliente() {
        this.Ids = 0;
        this.Nomes = "";
        this.CPFs = 0;
        this.DataCadastros = new Date();
        this.Nascimentos = new Date();
        this.Emails = "";
        this.Enderecos = "";
        this.NovoCliente = true;
        this.chkValidacao = true;

        this.router.navigate(['/cliente-editar',
            this.Ids, this.Nomes, this.CPFs, this.DataCadastros, this.Nascimentos, this.Emails, this.Enderecos, this.NovoCliente, this.chkValidacao]);
    }

    UpdateCliente(Id: number, Nome: string, Email: string, Nascimento: Date, DataCadastro: Date,
        CPF: number, Endereco: string, Ativo: boolean) {
        this.Ids = Id;
        this.Nomes = Nome;
        this.CPFs = CPF;
        this.DataCadastros = DataCadastro;
        this.Nascimentos = Nascimento;
        this.Emails = Email;
        this.Enderecos = Endereco;
        this.Ativos = Ativo;
        this.NovoCliente = false;
        this.chkValidacao = Ativo;

        this.router.navigate(['/cliente-editar',
            this.Ids, this.Nomes, this.CPFs, this.DataCadastros, this.Nascimentos, this.Emails, this.Enderecos, this.NovoCliente, this.chkValidacao]);
    }

    ngGetClientes() {
        this.http.get('http://localhost:5001/api/clientes').subscribe(result => {
            this.clientes = result.json() as Cliente[];
        }, error => console.error(error));
    }

    ngGetCliente(id: number) {
        return this.http.get('http://localhost:5001/api/cliente/' + id).subscribe(result => {
            this.cliente = result.json() as Cliente;
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

    closeEdit() {
        this.Ids = 0;
        this.Ativos = true;
        this.DataCadastros = new Date();
        this.Nomes = "";
        this.Nascimentos = new Date();
        this.CPFs = 0;
        this.Emails = "";
        this.Enderecos = "";
        this.AddClienteTable = false;
        this.chkValidacao = true;
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
