import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tarea } from '../tarea';

@Component({
  selector: 'app-tarea-item',
  imports: [RouterLink],
  templateUrl: './tarea-item.html',
  styleUrl: './tarea-item.css',
})
export class TareaItem {
  tarea = input.required<Tarea>();
  resaltar = input(false);
  alternada = output<number>();
  eliminada = output<number>();
}
