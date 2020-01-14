import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  bsModalRef: BsModalRef;
  tasks:any = [];

  constructor(
    private TasksService: TasksService,
    private modalService: BsModalService
    ) {  }

  ngOnInit() {
    this.getAllTasks()
  }

  getAllTasks(){
    this.TasksService.getTasks().subscribe(res => {
      this.tasks = res;
      console.log(this.tasks);
    })
  }


  AddItem() {
    this.bsModalRef = this.modalService.show(AddEditTaskComponent);
    this.bsModalRef.content.onClose = (added) => {
      if(added)
      {
        this.getAllTasks();
      }
    }
  }

  EditTask(task) {
    this.bsModalRef = this.modalService.show(AddEditTaskComponent, { initialState: {task} });
    this.bsModalRef.content.onClose = (updated) => {
      if(updated)
      {
        this.getAllTasks();
      }
    }
  }

  DeleteTask(taskId) {
    let confirmMessage = confirm('Are you sure?!');
    if (confirmMessage) {
      this.TasksService.DeleteTask(taskId).subscribe(deleted => {
        this.getAllTasks();
      }, err => console.log(err))
    }
  }

}
