import { Component } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ChartDataService } from '../services/chart-data.service'; // Correct import path
import { ChartModalComponent } from '../chart-modal/chart-modal.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, ChartModalComponent]
})
export class SettingsComponent {
  charts: Observable<any[]>;

  constructor(private chartDataService: ChartDataService, public dialog: MatDialog) {
    this.charts = this.chartDataService.getCharts();
  }

  openChartModal(chart?: any): void {
    const dialogRef = this.dialog.open(ChartModalComponent, {
      width: '400px',
      data: chart ? { ...chart } : { name: '', type: 'line', color: '#000000' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (chart) {
          this.chartDataService.updateChart(result);
        } else {
          this.chartDataService.addChart(result);
        }
      }
    });
  }

  removeChart(chartId: number): void {
    this.chartDataService.removeChart(chartId);
  }
}
