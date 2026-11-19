import { Component, input } from '@angular/core';
import { StatCard } from '../core/dashboard.models';

@Component({
    selector: 'app-stat-card',
    template: `
        <article class="card">
            <div [class]="'icon ' + data().color">
                <span class="material-icons">{{ data().icon }}</span>
            </div>
            <div class="info">
                <span class="label">{{ data().label }}</span>
                <strong>{{ data().value }}</strong>
            </div>
            <footer>
                <span class="material-icons">{{ data().footerIcon }}</span>
                {{ data().footerText }}
            </footer>
        </article>
    `,
    styles: `
        .card { position: relative; background: var(--card); border-radius: 6px; padding: 15px; box-shadow: 0 1px 4px rgba(0,0,0,.14); }
        .icon { position: absolute; top: -20px; left: 15px; width: 64px; height: 64px; border-radius: 3px; display: grid; place-items: center; color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,.25); }
        .icon .material-icons { font-size: 32px; }
        .orange { background: var(--orange); }
        .green { background: var(--green); }
        .red { background: var(--red); }
        .cyan { background: var(--cyan); }
        .info { display: flex; flex-direction: column; align-items: flex-end; min-height: 48px; }
        .label { color: var(--muted); font-size: 14px; }
        strong { font-size: 24px; font-weight: 400; }
        footer { margin-top: 12px; padding-top: 10px; border-top: 1px solid #eee; font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 6px; }
        footer .material-icons { font-size: 16px; }
    `,
})

export class StatCardComponent {
    data = input.required<StatCard>();
}
