import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpService } from '../../services/http.service';

import { ToastController } from 'ionic-angular';
import { Room } from '../../models/room';

@Injectable()
export class RoomsProvider {

  constructor(
    public toastCtrl: ToastController,
    public httpService: HttpService,
  ) {}

  getRooms(id: string): Observable<any> {
    return this.httpService
      .get(`rooms?form_id=${id}`)
      .map(data => data.json())
      .map(rooms => {
          return rooms.map(room => {
            return Room.build(room)
        })
      })
  }

  create(object): Observable<any> {
    return this.httpService
      .post(`rooms`, object)
      .map(res => res.json())
      .map(rooms => rooms.map(room => Room.build(room)))
  }

  public deleteRoom(roomToDelete) {
    return this.httpService
      .delete(`rooms/${roomToDelete}`)
      .map(res => res.json())
      .map(rooms => rooms.map(room => Room.build(room)))
  }

}
