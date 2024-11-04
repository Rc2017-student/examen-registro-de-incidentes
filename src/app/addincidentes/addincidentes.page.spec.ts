import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddincidentesPage } from './addincidentes.page';

describe('AddincidentesPage', () => {
  let component: AddincidentesPage;
  let fixture: ComponentFixture<AddincidentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddincidentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
