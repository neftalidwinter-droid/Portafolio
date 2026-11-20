import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { TareaItem } from '../tarea-item/tarea-item';
import { TareasService } from '../tareas-service';

type Filtro = 'todas' | 'pendientes' | 'hechas';

@Component({
  selector: 'app-lista-tareas',
  imports: [TareaItem, FormField],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tareas.css',
})
export class ListaTareas {
  private readonly servicio = inject(TareasService);

  protected readonly tareas = this.servicio.tareas;
  protected readonly total = this.servicio.total;
  protected readonly pendientes = this.servicio.pendientes;

  protected readonly filtros: Filtro[] = ['todas', 'pendientes', 'hechas'];
  protected readonly filtro = signal<Filtro>('todas');
  protected readonly tareasFiltradas = computed(() => {
    const lista = this.tareas();
    switch (this.filtro()) {
      case 'pendientes': return lista.filter((t) => !t.hecha);
      case 'hechas':     return lista.filter((t) => t.hecha);
      default:           return lista;
    }
  });

  protected readonly modelo = signal({ texto: '' });
  protected readonly nuevaForm = form(this.modelo, (campo) => {
    required(campo.texto, { message: 'Escribe una tarea.' });
    minLength(campo.texto, 3, { message: 'Mínimo 3 caracteres.' });
  });

  protected agregar(evento: Event) {
    evento.preventDefault();
    this.nuevaForm.texto().markAsTouched();
    if (this.nuevaForm().invalid()) return;

    this.servicio.agregar(this.modelo().texto);
    this.nuevaForm().reset({ texto: '' });
  }

  protected alternar(id: number) { this.servicio.alternar(id); }
  protected eliminar(id: number) { this.servicio.eliminar(id); }
}
