import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {CharacterRM, InfoApiRM} from "../common/interfaces";


// Lo voy a poder usar en cualquiera de mis aplicaciones inyectandolo en mi constructor
@Injectable({
  providedIn: 'root'
})
export class RickymortyService {

  // En esta variable guardamos la URL de la api
  private URI: string = "https://rickandmortyapi.com/api/character/";

  // Creamos la variable http de tipo HttpCliente para poder hacer peticiones http
  constructor(private http: HttpClient) { }

  // Creamos la funcion para coger la información
  getCharacters(): Observable<InfoApiRM>{
    return this.http.get<InfoApiRM>(this.URI);
  }

  // Creamos la funcion en la que nos pasan la pagina
  getCharactersPagination(page: number): Observable<InfoApiRM>{
    return this.http.get<InfoApiRM>(this.URI+'?page='+page);
  }

  // Creamos una función pasandole el id del pesonaje
  getCharacter(id:number): Observable<CharacterRM>{
    return this.http.get<CharacterRM>(this.URI+id);
  }
}
