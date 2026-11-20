import { Component, computed, inject, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { TareasService } from '../tareas-service';

interface TareaRemota {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-remotas',
  templateUrl: './remotas.html',
  styleUrl: './remotas.css',
})
export class Remotas {
  private readonly servicio = inject(TareasService);

  protected readonly limite = signal(5);

  protected readonly remotas = httpResource<TareaRemota[]>(
    () => `https://jsonplaceholder.typicode.com/todos?_limit=${this.limite()}`
  );

  private readonly textosLocales = computed(
    () => new Set(this.servicio.tareas().map((t) => t.texto))
  );

  protected masTareas() {
    this.limite.update((n) => n + 1);
  }

  protected yaCopiada(r: TareaRemota) {
    return this.textosLocales().has(r.title);
  }

  protected copiar(r: TareaRemota) {
    this.servicio.agregar(r.title, r.completed);
  }
}
