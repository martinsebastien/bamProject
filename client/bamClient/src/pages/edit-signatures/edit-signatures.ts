import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the EditSignaturesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-signatures',
  templateUrl: 'edit-signatures.html',
})
export class EditSignaturesPage {

  @ViewChild('myCanvas') canvas: any;

  canvasElement: any;
  lastX: number;
  lastY: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public renderer: Renderer,
  ) { }

  ionViewDidLoad() {
    this.canvasElement = this.canvas.nativeElement;
    let width = this.platform.width();
    let height = this.platform.height() - 95;
    this.renderer.setElementAttribute(this.canvasElement, 'width', width.toString());
    this.renderer.setElementAttribute(this.canvasElement, 'height', height.toString());
  }

  public handleStart(ev) {
    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;

    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;

    ctx.beginPath();
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStylec = '#000';
    ctx.lineWidth = '1';
    ctx.stroke();

  }

  public handleMove(ev) {
    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;

    ctx.beginPath();
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStylec = '#000';
    ctx.lineWidth = '1';
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
  }

  public handleEnd(ev) {
  }

  public confirm() {
    console.log('Signature validée !');
  }
}
