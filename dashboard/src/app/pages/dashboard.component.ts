import { Component, inject } from '@angular/core';
import { DashboardService } from '../core/dashboard.service';
import { StatCardComponent } from '../shared/stat-card.component';
import { ChartCardComponent } from '../shared/chart-card.component';
import { TasksCardComponent } from '../shared/tasks-card.component';
import { EmployeesTableComponent } from '../shared/employees-table.component';

@Component({
    selector: 'app-dashboard',
    imports: [StatCardComponent, ChartCardComponent, TasksCardComponent, EmployeesTableComponent],
    template: `
        <section class="grid stats">
            @for (s of stats; track s.label) {
                <app-stat-card [data]="s" />
            }
        </section>

        <section class="grid charts">
            @for (c of charts; track c.title) {
                <app-chart-card [info]="c" />
            }
        </section>

        <section class="grid bottom">
            <app-tasks-card />
            <app-employees-table [employees]="employees" />
        </section>
    `,
    styles: `
        .grid { display: grid; gap: 50px 24px; margin-top: 40px; }
        .stats { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
        .charts { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
        .bottom { grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); }
    `,
})

export class DashboardComponent {
    private service = inject(DashboardService);
    stats = this.service.getStats();
    charts = this.service.getCharts();
    employees = this.service.getEmployees();
}
