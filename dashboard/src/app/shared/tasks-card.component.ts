import { Component, computed, inject, signal } from '@angular/core';
import { DashboardService } from '../core/dashboard.service';

@Component({
    selector: 'app-tasks-card',
    template: `
        <article class="card">
            <div class="header">
                <span>Tareas:</span>
                @for (t of tabs(); track t.id) {
                    <button type="button" [class.on]="t.id === activeId()" (click)="activeId.set(t.id)">
                        <span class="material-icons">{{ t.icon }}</span> {{ t.label }}
                    </button>
                }
            </div>
            <ul>
                @for (tarea of active().tareas; track $index) {
                    <li>
                        <label>
                            <input type="checkbox" [checked]="tarea.hecha" (change)="toggle($index)" />
                            <span [class.done]="tarea.hecha">{{ tarea.texto }}</span>
                        </label>
                    </li>
                } @empty {
                    <li class="empty">Sin tareas.</li>
                }
            </ul>
        </article>
    `,
    styles: `
        .card { background: var(--card); border-radius: 6px; padding: 15px; box-shadow: 0 1px 4px rgba(0,0,0,.14); }
        .header { display: flex; align-items: center; gap: 8px; margin-top: -35px; padding: 10px 14px; border-radius: 3px; background: var(--purple); color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,.25); flex-wrap: wrap; }
        button { display: flex; align-items: center; gap: 6px; border: 0; background: transparent; color: #fff; padding: 8px 12px; border-radius: 4px;
        cursor: pointer; text-transform: uppercase; font-size: 12px; }
        button.on { background: rgba(255,255,255,.25); }
        ul { list-style: none; margin: 16px 0 0; padding: 0; }
        li { padding: 10px 0; border-bottom: 1px solid #eee; }
        label { display: flex; gap: 12px; align-items: center; cursor: pointer; }
        .done { text-decoration: line-through; color: var(--muted); }
        .empty { color: var(--muted); }
    `,
})

export class TasksCardComponent {
    tabs = signal(inject(DashboardService).getTaskTabs());
    activeId = signal('bugs');

    active = computed(() => this.tabs().find((t) => t.id === this.activeId()) ?? this.tabs()[0]);

    toggle(index: number) {
        const id = this.activeId();
        this.tabs.update((tabs) =>
            tabs.map((t) =>
                t.id !== id ? t : {
                    ...t,
                    tareas: t.tareas.map((x, i) => (i === index ? { ...x, hecha: !x.hecha } : x)),
                },
            ),
        );
    }
}
