import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, Platform } from '@ionic/angular';

import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';

import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
//import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user = {} as User;
  products: Product[] = [];
  results: Product[] = [];
  fullPrice: Number[] = [];
  loading: boolean = false;
  desktop: boolean = false;
  nextPage = 1;
  constructor(
    private api: ApiService,
    private utilsSvc: UtilsService,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.desktop = this.platform.is("desktop");
    //this.addOrUpdateTask(this.tasks[0]);
  }

  ionViewWillEnter() {

    this.getProducts();
    this.getUser();
  }



  getUser() {
    return this.user = this.utilsSvc.getElementFromLocalStorage("user");
  }
  

  async addOrUpdateTask(product?: Product) {
    let res = await this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      componentProps: { product },
      cssClass: "add-update-modal"
    })
    if (res && res.success) {
      this.getProducts();
    }
  }
  handleInput(event) {
    if (event.target.value.length > 0) {
      const query = event.target.value.toLowerCase();
      this.results = this.products.filter((d) => {
        return d.name.toLowerCase().indexOf(query) > -1
      });
      this.products = this.results;
    }
    else {
      this.getProducts();
    }
  }

  async getProducts() {
    this.results = [...this.products];
    //let user: User = this.utilsSvc.getElementFromLocalStorage("user");
    //let path = `users/${user.uid}`
    this.loading = true;
    this.api.getProducts().then(res => {
      this.nextPage = res.data.nextPage;
      this.products = res.data.docs;
      this.products.forEach(product => {
        let strDiscount = "0." + String(product.discount);
        let total = (Number(product.price) * Number(strDiscount)) + Number(product.price);
        this.fullPrice.push(Number(total));
      })
      this.loading = false;
    });


  }
  getMoreProducts(event) {
    this.loading = true;
    this.api.getProducts(this.nextPage).then(res => {
      this.nextPage = res.data.nextPage;
      let newproducts = res.data.docs;
      newproducts.forEach(product => {
        this.products.push(product);
      })
      this.products.forEach(product => {
        let strDiscount = "0." + String(product.discount);
        let total = (Number(product.price) * Number(strDiscount)) + Number(product.price);
        this.fullPrice.push(Number(total));
        (event as InfiniteScrollCustomEvent).target.complete();
      })

      this.loading = false;
    });
  }

  confirmDeleteTask(product: Product) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Producto',
      message: '¿Quieres eliminar este producto?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteProduct(product);
          }
        }
      ]
    })
  }
  deleteProduct(product: Product) {
    //let path = `users/${this.user.uid}/tasks/${task.id}`;
    this.utilsSvc.presentLoading();
    this.api.deleteProduct(product._id).then(res => {
      this.utilsSvc.presentToast(
        {
          message: "Producto eliminado correctamente",
          color: "success",
          icon: "checkmark-circle-outline",
          duration: 2000,
        })
      this.getProducts();
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
    });
  }

}

