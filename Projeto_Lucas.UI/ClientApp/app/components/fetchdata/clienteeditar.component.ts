import {
    Component,
    Input
} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'clienteeditar',
    templateUrl: './clienteeditar.component.html'
})

export class ClienteEditarComponent {

    constructor(private http: Http) {

    }    

    public maskCPF = [/[1-9]/, /[1-9]/, /[1-9]/, '.', /[1-9]/, /[1-9]/, /[1-9]/, '.', /[1-9]/, /[1-9]/, /[1-9]/, '-', /[1-9]/, /[1-9]/];
    //public maskTelefone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
}
