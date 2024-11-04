import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerincidentesPage } from './verincidentes.page';

describe('VerincidentesPage', () => {
  let component: VerincidentesPage;
  let fixture: ComponentFixture<VerincidentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerincidentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
