import {Component, OnInit} from '@angular/core';
import {Coche} from "../../common/Coche";
import {Superheroe} from "../../common/Vehiculo";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  // Tipos de datos Typescript
  numero: number = 10;
  edad: number = 0;
  nombre: string = "Jose";
  esValido: boolean = true;
  fecha: Date = new Date();

  //Array de números
  coleccionNumeros: number[] = [1, 2, 3, 4];

  //Opcional
  otroNumero?: number;

  // Varios tipos
  numeroONo: number | undefined;

  // Objetos, elemento compuesto. VAMOS A TRABAJAR CON OBJETOS O COLECCIONES DE OBJETOS
  objeto: { nombre: string; edad: number } = {
    nombre: 'pepe moreno salas',
    edad: 29
  }

  // Array de string
  superHeroes: string[] = ["Spiderman", "Ironman", "WonderWoman"];

  // Un array con objetos
  personas: { nombre: string; edad: number }[] = [
    {
      nombre: 'pepe moreno salas',
      edad: 29
    },
    {
      nombre: 'Sara',
      edad: 23
    }
  ];


  // Esto es un objeto de tipo superheroe
  superheroe: Superheroe = {
    nombre: 'Spiderman',
    superpoder: 'Lanzar telarañas'
  };


  ngOnInit(): void {
    setTimeout(() => {
      this.trabajarConDatos();
    }, 1000);

  }

  private trabajarConDatos() {
    let variable = 0;

    // La constante no va a variar su valor
    const miConstante = 0;
    variable = this.numero;
    this.numero = miConstante;

  }

  sumarUno() {
    if (this.numeroONo !== undefined) {
      this.numeroONo++;
    } else this.numeroONo = 0;
    this.numero +=10;

    // Creamos el objeto coche, lo hacemos estatico
    let coche: Coche = new Coche("Seat", "Ibiza");

    // Invocamos al getter
    coche._marca;

    // Invocamos al setter
    coche._modelo = 'León';
    // Si estoy asignando un valor coge el setter y si estoy recogiendo un valor coge el getter

    // Mostramos con un alert la marca y modelo del coche
    alert(coche._marca+ ' ' + coche._modelo)

  }

  trabajarConArrays(){
    this.personas.push({nombre: this.nombre, edad: this.edad});

  }

  trabajarConArraysMenos() {
    this.personas.pop();
  }
}
