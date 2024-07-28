import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChartModalComponent } from './chart-modal.component';

describe('ChartModalComponent', () => {
  let component: ChartModalComponent;
  let fixture: ComponentFixture<ChartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartModalComponent, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
