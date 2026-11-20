import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Remotas } from './remotas';
import { TareasService } from '../tareas-service';

describe('Remotas', () => {
  let fixture: ComponentFixture<Remotas>;
  let http: HttpTestingController;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Remotas],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Remotas);
    http = TestBed.inject(HttpTestingController);

    TestBed.tick();
    http
      .expectOne('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .flush([{ id: 1, title: 'Tarea remota', completed: false }]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('copia una tarea remota a la lista local', async () => {
    const servicio = TestBed.inject(TareasService);
    const antes = servicio.total();

    const boton = fixture.nativeElement.querySelector('li button') as HTMLButtonElement;
    boton.click();
    await fixture.whenStable();

    expect(servicio.total()).toBe(antes + 1);
    expect(boton.disabled).toBe(true);
    expect(boton.textContent).toContain('Copiada');
  });
});
