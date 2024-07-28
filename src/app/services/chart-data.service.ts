// src/app/services/chart-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private chartsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { id: 1, name: 'Chart 1', type: 'line', color: '#ff0000' },
    { id: 2, name: 'Chart 2', type: 'spline', color: '#00ff00' }
  ]);

  getCharts(): Observable<any[]> {
    return this.chartsSubject.asObservable();
  }

  addChart(chart: any): void {
    const currentCharts = this.chartsSubject.value;
    chart.id = currentCharts.length ? Math.max(...currentCharts.map(c => c.id)) + 1 : 1;
    this.chartsSubject.next([...currentCharts, chart]);
  }

  updateChart(updatedChart: any): void {
    const currentCharts = this.chartsSubject.value.map(chart =>
      chart.id === updatedChart.id ? updatedChart : chart
    );
    this.chartsSubject.next(currentCharts);
  }

  removeChart(chartId: number): void {
    const currentCharts = this.chartsSubject.value.filter(chart => chart.id !== chartId);
    this.chartsSubject.next(currentCharts);
  }

  getChartData(): Observable<any[]> {
    // Mock data generation; replace with API call if needed
    const data = [];
    for (let i = 1; i <= 30; i++) {
      data.push({
        date: new Date(2024, 6, i),
        value: Math.random() * 100
      });
    }
    return of(data);
  }
}
