import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-details-task',
  template: `
    <div class="main-container">
     
    </div>
  `,
  styles: [],
})
export class DetailsTaskComponent implements OnInit {

  id: any;
  data: any;
  tasks: any;

  constructor(private service: TasksService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById() {
    this.id = this.route.snapshot.params.id;
    this.service.getTaskById(this.id).subscribe((res) => {
      this.data = res;
      this.tasks = this.data.item[0];
      console.log(this.tasks);
    });
  }
}
