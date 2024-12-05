import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MovieService} from "../../services/movie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan";
import {faHeartBroken} from "@fortawesome/free-solid-svg-icons/faHeartBroken";
import {FormValidators} from "../../validators/FormValidators";

@Component({
  selector: 'app-movies-edit',
  templateUrl: './movies-edit.component.html',
  styleUrls: ['./movies-edit.component.css']
})
export class MoviesEditComponent {

  /*
  Vamos a realizar un formulario reactivo, así el html y el typescript están sincronizados
  Los formularios reactivos se recomiendan como usamos modelos de datos APIS
   */

  /*
  Para los formularios normales se trabaja con el ngmodel
  Esto permite vincular el valor de un input con un atributo del typescript
   */


  // Formulario de peliculas
  movieForm: FormGroup = this.formBuilder.group({
    // Con los [''] inicializamos la variable, en este caso vacío
    _id: [''],
    // Los parentesis se ponen cuando llevan parametros, si no lleva parametros no se pone
    title: ['', [Validators.required,, FormValidators.palabraProhibida('sex'), Validators.minLength(2), FormValidators.notOnlyWhiteSpace]],
    year: [1900, [Validators.required,Validators.min(1900), Validators.max(new Date().getFullYear())]],
    /*
    Con el Validators.pattern('') TRABAJAREMOS CON EXPRESIONES REGULARES REGEX
     */
    director: ['',[Validators.required, Validators.minLength(2),FormValidators.notOnlyWhiteSpace]],
    // En el plot que el campo es de tipo string lo estamos forzando a que sea de tipo numerico
    plot: ['',[Validators.required,Validators.minLength(2), FormValidators.notOnlyWhiteSpace]],
    poster: ['',[Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]],
    genres: [[],[Validators.required]],
    favorite: [false],
    /*
    Se usa el Validator.requiredTrue para booleanos
    Esto es en el tipico formulario de "acepto las condiciones para continuar"
    favorite: [false, Validators.requiredTrue],
     */
    // Para hacer el imdb que es un objeto, lo tenemos que definir como formgroup
    imdb: this.formBuilder.group({
      rating: [0,[Validators.required, Validators.min(0),Validators.max(10)]],
      votes: [0,[Validators.required, Validators.min(0)]],
    })
    // Con esto tenemos definido nuestro formulario reactivo en typescript
  });

  toast = {
    header: '',
    body: '',
    duration: 2000
  };
  toastShow = false;
  //boton editar
  edit = false;

  // generos que tenemos en la base de datos
  genresBD: string[] = [];

  // formulario nuevo genero
  formNewGenre = this.formBuilder.group({
    // nuevo genero
    newGenre: ['', [Validators.minLength(2), FormValidators.notOnlyWhiteSpace]]
  })


  constructor(private formBuilder: FormBuilder,
              private movieService: MovieService,
              /*
              El activatedroute lo usamos para recoger
              los parametros (PARAMS) QUE TENÍAMOS EN LA URL
              Para trabajar de manera dinámica
               */
              private ar: ActivatedRoute,
              // El router lo usamos para navegar desde el typescript
              private router: Router) {

    this.loadMovie();
  }

  // hacemos los getters de los campos del formulario
  get title(){
    return this.movieForm.get('title');
  }
  get year(){
    return this.movieForm.get('year');
  }
  get director(){
    return this.movieForm.get('director');
  }
  get plot(){
    return this.movieForm.get('plot');
  }
  get poster(){
    return this.movieForm.get('poster');
  }
  get genres(){
    return this.movieForm.get('genres');
  }
  get favorite(){
    return this.movieForm.get('favorite');
  }
  get rating(){
    return this.movieForm.get('imdb')?.get('rating');
  }
  get votes(){
    return this.movieForm.get('imdb')?.get('votes');
  }

  get newGenre(){
    return this.formNewGenre.get('newGenre');
  }


  // funcion para cargar las peliculas
  private loadMovie() {
    this.ar.params.subscribe({
      next: value => {
        console.log(value)
        if (value['id']){
          this.edit = true;
          this.movieService.getOneMovie(value['id']).subscribe({
            next: res => {
              this.movieForm.patchValue(res);
            },
            error: err => {
              console.error(err);
            }
          })
        }else {
          this.edit = false;
        }
      },
      error: err => {
        console.error(err);
      }
    })

    this.movieService.getGenres().subscribe({
      next: value => {
        this.genresBD = value;
      },
      error: err => {
        console.error(err);
      }
    })
  }

  addMovie() {
    if (this.movieForm.invalid){
      // Esto es para validar formularios
      /*
      Tiene 3 estados la validacion de formularios
      1. Si no han tocado el input
      2. Dirty si el usuario está escribiendo en el input
      3. Touched si el input ha tocado el input y lo suelta
      Siver para controlar la validación de formularios, si está correctamente escrito lo que quiere el usuario
       */
      this.movieForm.markAllAsTouched();
      // hacemos el return para salir de la funcion
      return;
    }
    const movie = this.movieForm.getRawValue();
    delete movie._id;
    // Aqui el formulario es valido, el getRawValue me devuelve el formgroup en modo objeto
    this.movieService.addMovie(movie).subscribe({
        next: value => {
          this.toastGenerator(value);
          this.router.navigateByUrl('/movies');
        },
        error: err => {
          console.error(err);
        }
      }
    )

  }

  protected readonly faCirclePlus = faCirclePlus;

  addNewGenre() {
    if (this.edit){
      // El ? significa que puede no estar definido
      this.genresBD.push(this.newGenre?.value as unknown as string);
      // Aqui usando un auxiliar (myGenres) cogemos el valor actual del array de generos
      const myGenres = this.genres?.value;
      // Añadimos el nuevo genero al auxiliar
      myGenres.push(this.newGenre);
      // Ahora actualizamos el formulario con la variable genres y el auxiliar myGenres
      this.movieForm.patchValue({genres: myGenres});
    }else{
      this.genresBD.push(this.newGenre?.value as unknown as string);
    }
    this.formNewGenre.reset();
  }

  editMovie() {
    if (this.movieForm.invalid){
      // Esto es para validar formularios
      /*
      Tiene 3 estados la validacion de formularios
      1. Si no han tocado el input
      2. Dirty si el usuario está escribiendo en el input
      3. Touched si el input ha tocado el input y lo suelta
      Siver para controlar la validación de formularios, si está correctamente escrito lo que quiere el usuario
       */
      this.movieForm.markAllAsTouched();
      // hacemos el return para salir de la funcion
      return;
    }
    // Aqui el formulario es valido, el getRawValue me devuelve el formgroup en modo objeto
    this.movieService.updateMovie(this.movieForm.getRawValue()).subscribe({
      next: value => {
        this.toastGenerator(value);
        this.router.navigateByUrl('/movies');
      },
      error: err => {
        console.error(err);
      }
    }
    )
  }

  private toastGenerator(value: any) {
    this.toast.body = value.message;
    this.toastShow = true;
    setTimeout(() =>{
      this.toastShow = false;
    }, 2000);

  }

  protected readonly faHeart = faHeart;
  protected readonly faEdit = faEdit;
  protected readonly faTrashCan = faTrashCan;
  protected readonly faHeartBroken = faHeartBroken;
}
