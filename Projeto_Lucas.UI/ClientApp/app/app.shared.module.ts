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

import { TextMaskModule } from '../src/angularTextMask';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ClienteEditarComponent,
        ProdutoEditarComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        TextMaskModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'cliente-editar/:id', component: ClienteEditarComponent },
            { path: 'produto-editar/:id', component: ProdutoEditarComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
