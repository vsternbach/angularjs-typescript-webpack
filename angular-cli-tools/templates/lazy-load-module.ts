import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { $PascalCaseName$Routing } from './$name$.routing';
import { $PascalCaseName$Component } from './$name$.component';

@NgModule({
    imports: [
        CommonModule,
        $PascalCaseName$Routing
    ],
    providers: [],
    declarations: [
        $PascalCaseName$Component
    ],
    exports: []
})
export class $PascalCaseName$Module {

}
