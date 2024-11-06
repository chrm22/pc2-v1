import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Servicio} from '../model/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Servicio[]>();

  constructor() { }

  list(): Observable<any> {
    return this.http.get(this.url + "/servicios");
  }

  insert(servicio: Servicio): Observable<any> {
    return this.http.post(this.url + "/servicios", servicio);
  }

  setList(listaNueva : Servicio[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }

  getList(){
    return this.listaCambio.asObservable();
  }
}
