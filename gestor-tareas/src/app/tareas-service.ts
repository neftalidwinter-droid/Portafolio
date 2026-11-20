import { Service, computed, effect, signal } from '@angular/core';
import { Tarea } from './tarea';

const CLAVE = 'gestor-tareas';

const TAREAS_INICIALES: Tarea[] = [
  { id: 1, texto: 'Instalar Angular CLI', hecha: true },
  { id: 2, texto: 'Crear mi primer componente', hecha: false },
  { id: 3, texto: 'Entender los signals', hecha: false },
];

function cargarTareas(): Tarea[] {
  try {
    const guardado = localStorage.getItem(CLAVE);
    return guardado ? (JSON.parse(guardado) as Tarea[]) : TAREAS_INICIALES;
  } catch {
    return TAREAS_INICIALES;
  }
}

@Service()
export class TareasService {
  private readonly _tareas = signal<Tarea[]>(cargarTareas());
  private siguienteId = Math.max(0, ...this._tareas().map((t) => t.id)) + 1;

  readonly tareas = this._tareas.asReadonly();
  readonly total = computed(() => this._tareas().length);
  readonly pendientes = computed(
    () => this._tareas().filter((t) => !t.hecha).length
  );

  constructor() {
    effect(() => {
      localStorage.setItem(CLAVE, JSON.stringify(this._tareas()));
    });
  }

  agregar(texto: string, hecha = false) {
    const limpio = texto.trim();
    if (!limpio) return;
    this._tareas.update((l) => [
      ...l,
      { id: this.siguienteId++, texto: limpio, hecha },
    ]);
  }

  alternar(id: number) {
    this._tareas.update((l) =>
      l.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t))
    );
  }
  
  eliminar(id: number) {
    this._tareas.update((l) => l.filter((t) => t.id !== id));
  }

  buscar(id: number): Tarea | undefined {
    return this._tareas().find((t) => t.id === id);
  }
}
