import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpService } from '../../services/http.service';

import { ToastController } from 'ionic-angular';
import { Item } from '../../models/item';

@Injectable()
export class ItemsProvider {
  public items = [];

  constructor(
    public toastCtrl: ToastController,
    public httpService: HttpService,
  ) {}

  getItems(id: string): Observable<any> {
    return this.httpService
      .get(`items?room_id=${id}`)
      .map(data => data.json())
      .map(items => {
          return items.map(item => {
            return Item.build(item)
        })
      })
  }

  edit(object): Observable<any> {
    const id = object.id;
    return this.httpService
      .put(`items/${id}`, object)
      .map(res => res.json())
      .map(items => items.map(item => Item.build(item)))
  }

  create(object): Observable<any> {
    return this.httpService
      .post(`items`, object)
      .map(res => res.json())
      .map(items => items.map(item => Item.build(item)))
  }

  public deleteItem(itemToDelete) {
    return this.httpService
      .delete(`items/${itemToDelete}`)
      .map(res => res.json())
      .map(items => items.map(item => Item.build(item)))
  }

}
