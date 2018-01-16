import { Component, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FetchDataComponent } from './fetchdata.component';

@Component({
    selector: 'clienteeditar',
    templateUrl: './clienteeditar.component.html'
})

export class ClienteEditarComponent {

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

    constructor(private http: Http, private route: ActivatedRoute, private router: Router, public fetch: FetchDataComponent) {
        this.Ids = fetch.Ids;
        this.Nomes = fetch.Nomes;
        this.CPFs = fetch.CPFs;
        this.DataCadastros = fetch.DataCadastros;
        this.Nascimentos = fetch.Nascimentos;
        this.Emails = fetch.Emails;
        this.Enderecos = fetch.Enderecos;
        this.NovoCliente = fetch.NovoCliente;
        this.chkValidacao = fetch.chkValidacao;
        this.Ativos = this.chkValidacao;
    }    

    public maskCPF = [/[1-9]/, /[1-9]/, /[1-9]/, '.', /[1-9]/, /[1-9]/, /[1-9]/, '.', /[1-9]/, /[1-9]/, /[1-9]/, '-', /[1-9]/, /[1-9]/];
    //public maskTelefone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

    changeStatus() {
        this.chkValidacao = this.chkValidacao ? false : true;
    }

    ngAddCliente(Id: string, Nome: string, Email: string, Nascimento: Date, DataCadastro: Date,
        CPF: string, Endereco: string) {
        var head = new Headers();
        head.append('Content-Type', 'application/json; charset=utf-8');

        let cpfSemMascara = CPF.replace('.', '').replace('.', '').replace('-', '');

        let clienteAdd = {
            Id: Id == "" ? 0 : Id,
            Nome: Nome,
            CPF: parseInt(cpfSemMascara),
            Nascimento: Nascimento,
            Email: Email,
            Endereco: Endereco,
            DataCadastro: DataCadastro,
            Ativo: this.chkValidacao
        };

        let mensagem: any = "";

        if (this.NovoCliente) {
            this.http.post('http://localhost:5001/api/cliente', clienteAdd)
                .toPromise()
                .then(response => {
                    return mensagem = "Cliente " + response.text() + " incluido com sucesso!";
                }).catch(error => { return mensagem = error.message })
        } else {
            clienteAdd.DataCadastro = this.DataCadastros;
            this.http.put('http://localhost:5001/api/cliente', clienteAdd)
                .toPromise()
                .then(response => {
                    return mensagem = "Cliente " + response.text() + " editado com sucesso!";
                }).catch(error => { return mensagem = error.message })
        }
        setTimeout(() => {
            alert(mensagem);
            this.router.navigate(['/fetch-data']);
        }, 1000);
    }
}
