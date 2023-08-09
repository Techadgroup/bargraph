import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-bar-chart',
  template: '<div #barChart style="width: 100%; height: 400px;"></div>',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @ViewChild('barChart', { static: true }) chartRef!: ElementRef;
  private myChart: echarts.ECharts | null = null;
  private data: number[] = [];
  private option!: echarts.EChartsOption;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.initializeChart();
    setTimeout(() => {
      this.run();
    }, 0);
    setInterval(() => {
      this.run();
    }, 3000);
  }

  private initializeChart(): void {
    this.zone.runOutsideAngular(() => {
      const chartDom = this.chartRef.nativeElement;
      this.myChart = echarts.init(chartDom);
      this.data = this.generateRandomData(5);
      this.option = {
        xAxis: {
          max: 'dataMax'
        },
        yAxis: [
          {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E'],
            inverse: true,
            max: 10 // 
          }
        ],
        series: [
          {
            name: 'X',
            type: 'bar',
            data: this.data,
            label: {
              show: true,
              position: 'right'
            }
          }
        ],
        legend: {
          show: true
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      };
      this.myChart.setOption(this.option);
    });
  }

  private generateRandomData(count: number): number[] {
    const newData = [];
    for (let i = 0; i < count; ++i) {
      newData.push(Math.round(Math.random() * 200));
    }
    return newData;
  }

  private run(): void {
    for (let i = 0; i < this.data.length; ++i) {
      if (Math.random() > 0.9) {
        this.data[i] += Math.round(Math.random() * 2000);
      } else {
        this.data[i] += Math.round(Math.random() * 200);
      }
    }
    this.myChart?.setOption({
      series: [
        {
          type: 'bar',
          data: this.data
        }
      ]
    });
  }
}
