import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ClienteEditarComponent } from './components/fetchdata/clienteeditar.component';
import { ProdutoEditarComponent } from './components/counter/produtoeditar.component';

import { ProdutosClienteComponent } from './components/produtoscliente/produtoscliente.component';
import { EditarProdutosClienteComponent } from './components/produtoscliente/editarprodutoscliente.component';

import { TextMaskModule } from '../src/angularTextMask';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ClienteEditarComponent,
        ProdutoEditarComponent,
        ProdutosClienteComponent,
        EditarProdutosClienteComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        TextMaskModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'produtos', component: CounterComponent },
            { path: 'produtos/editar/:id', component: ProdutoEditarComponent },
            { path: 'clientes', component: FetchDataComponent },
            { path: 'clientes/editar/:id', component: ClienteEditarComponent },            
            { path: 'produtos-cliente', component: ProdutosClienteComponent },
            { path: 'produtos-cliente/editar/:id', component: EditarProdutosClienteComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
