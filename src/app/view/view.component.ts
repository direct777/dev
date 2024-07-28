import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartDataService } from '../services/chart-data.service';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [HighchartsChartModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions: any[] = [];
  data: any[] = [];
  filteredData: any[] = [];
  startDate = new Date(2024, 6, 1); // Example start date
  endDate = new Date(2024, 6, 30); // Example end date
  charts: any[] = [];

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit(): void {
    this.fetchData();
    this.chartDataService.getCharts().subscribe(charts => {
      this.charts = charts;
      this.updateCharts();
    });
  }

  fetchData(): void {
    this.chartDataService.getChartData().subscribe(data => {
      this.data = data;
      this.filterData();
    });
  }

  filterData(): void {
    if (this.startDate && this.endDate) {
      this.filteredData = this.data.filter(d =>
        new Date(d.date) >= this.startDate && new Date(d.date) <= this.endDate
      );
    } else {
      this.filteredData = this.data;
    }
    this.updateCharts();
  }

  updateCharts(): void {
    this.chartOptions = this.charts.map(chart => this.createChartOptions(chart));
  }

  createChartOptions(chartConfig: any): any {
    return {
      chart: {
        type: chartConfig.type
      },
      title: {
        text: chartConfig.name
      },
      xAxis: {
        categories: this.filteredData.map(d => d.date)
      },
      yAxis: {
        title: {
          text: 'Values'
        }
      },
      series: [{
        name: chartConfig.name,
        data: this.filteredData.map(d => d.value),
        color: chartConfig.color
      }]
    };
  }

  onDateChange(): void {
    this.filterData();
  }
}
