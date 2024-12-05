
export class Coche {
  // Cuando implementamos algo de una interfaz hay que añadir todos sus metodos
  private marca: string;
  private modelo: string;


  constructor(marca: string, modelo: string) {
    this.marca = marca;
    this.modelo = modelo;

  }

  get _modelo(): string {
    return this.modelo;
  }

  set _modelo(value: string) {
    this.modelo = value;
  }
  get _marca(): string {
    return this.marca;
  }

  set _marca(value: string) {
    this.marca = value;
  }

}

