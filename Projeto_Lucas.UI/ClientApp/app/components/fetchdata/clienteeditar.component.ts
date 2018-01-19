import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'clienteeditar',
    templateUrl: './clienteeditar.component.html'
})

export class ClienteEditarComponent implements OnInit {

    public Ids = 0;
    public Ativos = true;
    public DataCadastros = new Date();
    public Nomes = "";
    public Nascimentos = new Date();
    public CPFs = 0;
    public Emails = "";
    public Enderecos = "";
    chkValidacao: boolean = true;

    cliente: Cliente;

    constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
 
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.Ids = + params['id'];
        });
        if (this.Ids != 0)
            this.ngGetCliente(this.Ids);
    }

    ngGetCliente(id: number) {
        return this.http.get('http://localhost:5001/api/cliente/' + id).subscribe(result => {
            this.cliente = result.json() as Cliente;
            this.Ids = this.cliente.id;
            this.Ativos = this.cliente.ativo;
            this.DataCadastros = this.cliente.dataCadastro;
            this.Nomes = this.cliente.nome;
            this.Nascimentos = this.cliente.nascimento;
            this.CPFs = this.cliente.cpf;
            this.Emails = this.cliente.email;
            this.Enderecos = this.cliente.endereco;
        }, error => console.error(error));
    }   

    public maskCPF = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
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

        var parse_email = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

        if (!parse_email.test(Email))
            return alert("Email incorreto, ex: 'exemplo@exemplo.com.br'");

        if (Nome.length < 5)
            return alert("Nome incorreto, deve conter de 5 até 100 caracteres");
        
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

        if (this.Ids == 0) {
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
            this.router.navigate(['/clientes']);
        }, 1000);
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
