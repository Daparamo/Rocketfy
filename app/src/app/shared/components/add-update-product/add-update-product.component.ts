import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent implements OnInit {

  @Input() product: Product;
  user = {} as User;


  form = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4)]),
    sku: new FormControl('', [Validators.required, Validators.minLength(4)]),
    image:new FormControl([], [Validators.required, Validators.minLength(1)]),
    tags:new FormControl([], [Validators.required, Validators.minLength(1)]),
    price: new FormControl(0, [Validators.required]),
    discount: new FormControl(0, [Validators.required]),
    stock: new FormControl(0, [Validators.required]),
    fechaCreacion: new FormControl(Date.now().toString()),
    fechaModificacion: new FormControl(Date.now().toString())
  })
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private apiSvc:ApiService
  ) { }

  ngOnInit() {
    this.user = this.utilsSvc.getElementFromLocalStorage("user");

    if (this.product) {
      
      this.form.setValue(this.product);
      this.form.updateValueAndValidity();
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.product) {
        this.UpdateProduct();
      }
      else {
        this.createProduct();
      }
    }
  }


  //========= Crear Producto ==========
  createProduct() {
    this.utilsSvc.presentLoading();
    
    
    delete this.form.value["_id"];
    

    this.apiSvc.addProduct(this.form.value).then(res=> {
      this.utilsSvc.dismissModal({ success: true });
      this.utilsSvc.presentToast(
        {
          message: "Producto creado correctamente",
          color: "success",
          icon: "checkmark-circle-outline",
          duration: 2000,
        })
      this.utilsSvc.dismissLoading();
    }, error => {
      this.utilsSvc.presentToast(
        {
          message: error,
          color: "warning",
          icon: "alert-circle-outline",
          duration: 5000,
        })
      this.utilsSvc.dismissLoading();
    })
  }

  //========= Editar Producto ==========
  UpdateProduct() {
    this.utilsSvc.presentLoading();
    let id = this.form.value._id;
    
    this.apiSvc.updateProduct(id, this.form.value).then(res => {
        this.utilsSvc.dismissModal({ success: true });
        this.utilsSvc.presentToast(
          {
            message: "Producto actualizado correctamente",
            color: "success",
            icon: "checkmark-circle-outline",
            duration: 2000,
          })
        this.utilsSvc.dismissLoading();
      }, error => {
        this.utilsSvc.presentToast(
          {
            message: error,
            color: "warning",
            icon: "alert-circle-outline",
            duration: 5000,
          })
        this.utilsSvc.dismissLoading();
      })    
  }


  handleReorderImages(ev: CustomEvent<ItemReorderEventDetail>) {
    
    this.form.value.image = ev.detail.complete(this.form.value.image);
    this.form.updateValueAndValidity();
  }
  handleReorderTags(ev: CustomEvent<ItemReorderEventDetail>) {
    this.form.value.tags = ev.detail.complete(this.form.value.tags);
    this.form.updateValueAndValidity();
  }

  removeImage(index: number) {
    this.form.value.image.splice(index, 1);
    this.form.controls.image.updateValueAndValidity();
  }

  removeTag(index: number) {
    this.form.value.image.splice(index, 1);
    this.form.controls.image.updateValueAndValidity();
  }

  createImage() {
    this.utilsSvc.presentAlert({
      header: "Nueva Imagen",
      backdropDismiss: false,
      inputs: [{
        name: "name",
        type: "textarea",
        placeholder: "URL Image"
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Agregar',
          handler: (res) => {
            let image = res.name;
            this.form.value.image.push(image);
            this.form.controls.image.updateValueAndValidity();

          }
        }
      ]
    })
  }
  createTag() {
    this.utilsSvc.presentAlert({
      header: "Nuevo Tag",
      backdropDismiss: false,
      inputs: [{
        name: "name",
        type: "textarea",
        placeholder: "Tag"
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Agregar',
          handler: (res) => {
            let tag = res.name;
            this.form.value.tags.push(tag);
            this.form.controls.tags.updateValueAndValidity();

          }
        }
      ]
    })
  }
}
