import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // Import the standalone component
        MatDatepickerModule,
        MatNativeDateModule
      ],
      providers: [
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: ActivatedRoute, useValue: { params: of({}) } },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Charts' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Charts');
  });
});
