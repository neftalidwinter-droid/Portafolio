import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DetalleTarea } from './detalle-tarea';

describe('DetalleTarea', () => {
  let fixture: ComponentFixture<DetalleTarea>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [DetalleTarea],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleTarea);
  });

  it('muestra la tarea del id recibido', async () => {
    fixture.componentRef.setInput('id', '2');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Crear mi primer componente');
  });

  it('avisa si la tarea no existe', async () => {
    fixture.componentRef.setInput('id', '999');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Tarea no encontrada');
  });
});
