// Cola (FIFO): el primero que entra es el primero que sale.
// La usamos para los pedidos: la cocina atiende en orden de llegada.
export class Cola<T> {
  // DEFENSA: # hace los campos privados de verdad (con _ se podrían tocar desde afuera).
  #items: T[] = [];
  // Índice del elemento que está al frente de la cola.
  #inicio = 0;

  // Agrega un elemento al final de la cola.
  encolar(x: T): void {
    this.#items.push(x);
  }

  // DEFENSA: no usamos shift() porque corre todos los elementos una posición (es O(n)).
  // En cambio avanzamos el índice #inicio, que es O(1).
  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const x = this.#items[this.#inicio];
    this.#inicio++;

    // Compactamos: si más de la mitad del arreglo son elementos ya atendidos,
    // nos quedamos solo con los que siguen en la cola y volvemos el índice a 0.
    if (this.#inicio > this.#items.length / 2) {
      this.#items = this.#items.slice(this.#inicio);
      this.#inicio = 0;
    }
    return x;
  }

  // Mira el elemento del frente sin sacarlo.
  frente(): T | undefined {
    return this.vacia ? undefined : this.#items[this.#inicio];
  }

  get vacia(): boolean {
    return this.tamanio === 0;
  }

  // Los elementos reales son los que están desde #inicio hasta el final.
  get tamanio(): number {
    return this.#items.length - this.#inicio;
  }

  // DEFENSA: devuelve una COPIA (de frente a final) para proteger la cola
  // y para que React reciba un arreglo nuevo cada vez.
  aArray(): T[] {
    return this.#items.slice(this.#inicio);
  }
}
