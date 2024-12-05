import {Component, OnInit} from '@angular/core';
import {RickymortyService} from "../../services/rickymorty.service";
import {CharacterRM, InfoApiRM} from "../../common/interfaces";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{

  // Con la exclamacion le decimos que lo vamos a inicializar
  dataApi!: InfoApiRM;

  // Vamos a buscar a morty, creamos la variable
  morty!: CharacterRM;

  // Creamos la variable de la página actual, que empieza en la 1. Es la pagina inicial
  page: number = 1;

  constructor(private rmservice: RickymortyService) {

  }
  ngOnInit(): void {
    this.loadCharacters();
  }

  /*
  Llamamos a la función de paginación y le pasamos la página actual
  Le quitamos el private para poder llamarlo desde el html
  */
  loadCharacters() {
    this.rmservice.getCharactersPagination(this.page).subscribe(
      {
        // La respuesta del servidor la cogemos con el next
        // El next es si va todo bien
        next: (datos: InfoApiRM) => {
          this.dataApi = datos;
          console.log(datos);
          this.morty = this.dataApi.results.filter(item => item.name.includes('Morty'))[0];

        },
        // El error si algo sale mal
        error: (err) => {
          alert(err.message);
        },
        // Aquí si todo ha salido bien
        complete: () => {
          console.log('Done');
        }
      }
    )
  }
}
