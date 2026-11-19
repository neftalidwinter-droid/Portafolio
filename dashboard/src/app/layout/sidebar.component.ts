import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MENU } from './menu';

@Component({
    selector: 'app-sidebar',
    imports: [RouterLink, RouterLinkActive],
    template: `
        <aside class="sidebar">
            <div class="brand"><span class="logo">A</span> MI DASHBOARD</div>
            <nav>
                @for (item of menu; track item.path) {
                    <a [routerLink]="item.path" routerLinkActive="active">
                        <span class="material-icons">{{ item.icon }}</span>
                        {{ item.label }}
                    </a>
                }
            </nav>
        </aside>
    `,
    styles: `
        .sidebar {
            position: fixed; top: 0; bottom: 0; left: 0;
            width: var(--sidebar-w);
            background: #fff;
            box-shadow: 0 0 20px rgba(0,0,0,.15);
            padding: 16px;
        }
        .brand { display: flex; align-items: center; gap: 12px; font-weight: 500; padding: 8px 8px 24px; }
        .logo { background: var(--red); color: #fff; width: 34px; height: 34px; border-radius: 6px; display: grid; place-items: center; font-weight: 700; }
        nav { display: flex; flex-direction: column; gap: 6px; }
        a { display: flex; align-items: center; gap: 16px; padding: 12px 16px; border-radius: 4px; color: var(--text); text-decoration: none; font-size: 14px; }
        a:hover { background: rgba(0,0,0,.06); }
        a.active { background: var(--red); color: #fff; box-shadow: 0 4px 14px rgba(244,67,54,.4); }
        @media (max-width: 991px) { .sidebar { display: none; } }
    `,
})

export class SidebarComponent {
    menu = MENU;
}
