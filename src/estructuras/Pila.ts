// Pila (LIFO): el último elemento que entra es el primero que sale.
// La usamos para el "deshacer" del carrito y para el historial de atendidos.
export class Pila<T> {
  // DEFENSA: usamos # (campo privado real de JavaScript) y no _ (que es solo una convención).
  // Con # nadie desde afuera puede tocar el arreglo y romper el orden LIFO.
  #items: T[] = [];

  // Agrega un elemento arriba de todo (en el tope).
  push(x: T): void {
    this.#items.push(x);
  }

  // Saca y devuelve el elemento del tope. Si está vacía devuelve undefined.
  pop(): T | undefined {
    return this.#items.pop();
  }

  // Mira el tope sin sacarlo.
  tope(): T | undefined {
    return this.#items[this.#items.length - 1];
  }

  get vacia(): boolean {
    return this.#items.length === 0;
  }

  get tamanio(): number {
    return this.#items.length;
  }

  // DEFENSA: devolvemos una COPIA (de base a tope) para que nadie modifique
  // la pila desde afuera. Además React necesita un arreglo nuevo para notar el cambio.
  aArray(): T[] {
    return [...this.#items];
  }
}
