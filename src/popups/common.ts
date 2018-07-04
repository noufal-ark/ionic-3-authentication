import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
    templateUrl: 'common.html'
})

export class CommonPopupPage {
    public heading;
    public body;
    public button;
    constructor(public viewCtrl: ViewController, public navParams: NavParams) {
        this.heading = this.navParams.get('heading') || 'Message';
        this.body = this.navParams.get('body') || '';
        this.button = this.navParams.get('button') || 'OK';
    }
    close() {
        this.viewCtrl.dismiss();
    }
    ionViewDidLoad() {
        var x: any = document.getElementsByClassName('popover-content');
        x[x.length - 1].style.borderRadius = '10px';
    }
}