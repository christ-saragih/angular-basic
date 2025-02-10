import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';

interface Todo {
  id: number;
  title: string;
  progress: number;
}

export interface ApexChartInterface {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
}

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  todos: Todo[] = [];
  chartOptions: Partial<ApexChartInterface> | any;

  constructor(private restApiService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.restApiService.getTodo().subscribe({
      next: (res) => {
        this.todos = res.data;
        this.showChart();
        console.log(this.todos);
      },
      error: (err) => {
        console.log('Error: ', err);
      },
    });
  }

  showChart() {
    const todoTitles = this.todos.map(todo => todo.title);
    const todoProgress = this.todos.map(todo => todo.progress);
  
    this.chartOptions = {
      series: [
        {
          name: 'Progress',
          data: todoProgress,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '50%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return `${val}%`;
        },
      },
      xaxis: {
        categories: todoTitles,
        title: {
          text: 'Progress (%)',
        },
      },
      yaxis: {
        // title: {
        //   text: 'Todo Titles',
        // },
        max: 100,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return `${val}% completed`;
          },
        },
      },
    };
  }
}
