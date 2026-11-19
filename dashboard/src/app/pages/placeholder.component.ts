import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-placeholder',
    template: `<p>Sección "{{ nombre }}" en construcción.</p>`,
})

export class PlaceholderComponent {
    nombre = inject(ActivatedRoute).snapshot.data['nombre'];
}
