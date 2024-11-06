import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentescompletadosPage } from './incidentescompletados.page';

describe('IncidentescompletadosPage', () => {
  let component: IncidentescompletadosPage;
  let fixture: ComponentFixture<IncidentescompletadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentescompletadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
