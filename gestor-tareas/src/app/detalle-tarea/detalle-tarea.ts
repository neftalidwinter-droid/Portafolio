import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TareasService } from '../tareas-service';

@Component({
  selector: 'app-detalle-tarea',
  imports: [RouterLink],
  templateUrl: './detalle-tarea.html',
  styleUrl: './detalle-tarea.css',
})
export class DetalleTarea {
  private readonly servicio = inject(TareasService);

  readonly id = input.required<string>();

  protected readonly tarea = computed(() => this.servicio.buscar(Number(this.id())));

  protected alternar() {
    const t = this.tarea();
    if (t) this.servicio.alternar(t.id);
  }
}
