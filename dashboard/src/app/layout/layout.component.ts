import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { NavbarComponent } from './navbar.component';

@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, SidebarComponent, NavbarComponent],
    template: `
        <app-sidebar />
        <div class="main">
            <app-navbar />
            <main class="content"><router-outlet /></main>
        </div>
    `,
    styles: `
        .main { margin-left: var(--sidebar-w); min-height: 100vh; }
        .content { padding: 10px 30px 30px; }
        @media (max-width: 991px) { .main { margin-left: 0; } }
    `,
})

export class LayoutComponent {}