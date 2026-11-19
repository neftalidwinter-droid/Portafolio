import { Component, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ChartCardInfo } from '../core/dashboard.models';

@Component({
    selector: 'app-chart-card',
    imports: [BaseChartDirective],
    template: `
        <article class="card">
            <div [class]="'chart ' + info().color">
                <canvas baseChart [type]="info().type" [data]="info().data" [options]="options"></canvas>
            </div>
            <h3>{{ info().title }}</h3>
            <p class="sub">{{ info().subtitle }}</p>
            <footer>
                <span class="material-icons">access_time</span> {{ info().footer }}
            </footer>
        </article>
    `,
    styles: `
        .card { background: var(--card); border-radius: 6px; padding: 15px; box-shadow: 0 1px 4px rgba(0,0,0,.14); }
        .chart { margin-top: -35px; height: 190px; padding: 10px; border-radius: 3px; box-shadow: 0 4px 12px rgba(0,0,0,.25); }
        .green { background: var(--green); }
        .orange { background: var(--orange); }
        .red { background: var(--red); }
        h3 { margin: 16px 0 4px; font-weight: 400; font-size: 18px; }
        .sub { margin: 0 0 12px; color: var(--muted); font-size: 14px; }
        footer { padding-top: 10px; border-top: 1px solid #eee; font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 6px; }
        footer .material-icons { font-size: 16px; }
    `,
})

export class ChartCardComponent {
    info = input.required<ChartCardInfo>();

    options: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,.2)' } },
            y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,.2)' } },
        },
    };
}
