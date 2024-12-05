import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CharacterRM} from "../../common/interfaces";
import {RickymortyService} from "../../services/rickymorty.service";

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.css']
})
export class InfoDetailComponent implements OnInit {

  // Creamos una variable del id del personaje
  idChar: number = 0;

  // Recogemos el personaje
  char!: CharacterRM;

  // Recogemos el valor
  constructor(private activatedRoute: ActivatedRoute,
              private dataService: RickymortyService,
              private router: Router) {
    // Nos permite acceder a las variables de la ruta
  }

  ngOnInit(): void {
    this.loadChar();
  }

  private loadChar() {
    // el id del personaje lo podemos recoger de 2 maneras, dinamica (va a variar) y estatica (no va a variar)

    // Esta es la manera estática, solo voy a usar el parametro una única vez
    // this.idChar = this.activatedRoute.snapshot.params['id'];
    // console.log(this.activatedRoute.snapshot.params);

    // Esta es la manera dinámica
    this.activatedRoute.params.subscribe({
      next: value => {
        console.log(value);
        this.idChar = value['id'];
        this.dataService.getCharacter(this.idChar).subscribe({
          next: charData => {
            this.char = charData;
          },
          error: err => {
            console.error(err);
          },
          complete: () => {
            console.log('Char loaded');
          }
        })
      },
      error: err => {
        console.error(err);
      },
      complete: () => {
        console.log('Done');
      }
    });
    console.log(this.activatedRoute.snapshot.params);
  }

  anterior() {
    this.idChar--;
    this.router.navigateByUrl('/info-detail/'+this.idChar);
  }

  siguiente() {
    this.idChar++;
    this.router.navigateByUrl('/info-detail/'+this.idChar);
  }
}
