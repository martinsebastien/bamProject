import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SignaturesProvider } from '../../providers/signatures/signatures';
import { Signature } from '../../models/signature';


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
  signature: Signature;
  form: any;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public renderer: Renderer,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public signatureProvider: SignaturesProvider,
  ) { }

  ionViewDidLoad() {
    this.form = this.navParams.data;
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
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: `Êtes-vous certain des informations remplies ? La signature ne pourra ni être éditée ni supprimée`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
          }
        },
        {
          text: 'Créer',
          handler: () => {
            if (this.user) {
              let resizedCanvas = document.createElement("canvas");
              let resizedContext = resizedCanvas.getContext("2d");

              resizedCanvas.height = 100;
              resizedCanvas.width = 200;

              let context = this.canvasElement.getContext("2d");

              resizedContext.drawImage(this.canvasElement, 0, 0, 300, 300);
              let myResizedData = resizedCanvas.toDataURL();
              console.log(this.user)
              this.signature = Signature.build({ 'user_id': this.user.toString(), 'form_id': this.form.id.toString(), 'image': myResizedData})
              this.signatureProvider.create(this.signature).subscribe(data => {
                if (data.error) {
                  this.presentToast(data.error);
                } else {
                  this.presentToast(data.response)
                }
              });
            } else {
              this.presentToast('Veuiller sélectionner un utilisateur')
            }
          }
        }
      ]
    });
    confirm.present();
  }

  public clearCanvas() {
    let ctx = this.canvasElement.getContext('2d');
    console.log(this.canvasElement.toDataURL())

    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  public presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

}
