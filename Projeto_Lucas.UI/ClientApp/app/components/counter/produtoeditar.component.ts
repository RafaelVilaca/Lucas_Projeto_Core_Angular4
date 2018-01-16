import {
    Component,
    Input
} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'produtoeditar',
    templateUrl: './produtoeditar.component.html'
})

export class ProdutoEditarComponent {

    constructor(private http: Http) {

    }

    public maskValor = [/[1-9]/, /[1-9]/, /[1-9]/, '.', /[1-9]/, /[1-9]/];

    chkValidacao: Boolean = true;

    changeStatus() {
        this.chkValidacao = this.chkValidacao ? false : true;
    }
}
