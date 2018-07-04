import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonPopupPage } from './common';

@NgModule({
    declarations: [
        CommonPopupPage,
    ],
    imports: [
        IonicPageModule.forChild(CommonPopupPage),
    ],
    exports: [
        CommonPopupPage
    ]
})
export class CommonPopupPageModule { }