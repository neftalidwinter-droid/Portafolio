import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ListaTareas } from './lista-tareas';

describe('ListaTareas', () => {
  let fixture: ComponentFixture<ListaTareas>;
  let el: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ListaTareas],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTareas);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('filtra las tareas hechas', async () => {
    const botonHechas = [...el.querySelectorAll('.filtros button')].find((b) => b.textContent?.trim() === 'hechas') as HTMLButtonElement;
    botonHechas.click();
    await fixture.whenStable();
    expect(el.querySelectorAll('app-tarea-item').length).toBe(1);
  });

  it('no agrega textos de menos de 3 caracteres', async () => {
    const input = el.querySelector('form input') as HTMLInputElement;
    input.value = 'ab';
    input.dispatchEvent(new Event('input'));
    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    expect(el.querySelectorAll('app-tarea-item').length).toBe(3);
    expect(el.querySelector('.error')?.textContent).toContain('Mínimo 3 caracteres');
  });
});
