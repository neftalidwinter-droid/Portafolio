import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TareaItem } from './tarea-item';

describe('TareaItem', () => {
  let component: TareaItem;
  let fixture: ComponentFixture<TareaItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaItem],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TareaItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tarea', { id: 1, texto: 'Prueba', hecha: false });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
