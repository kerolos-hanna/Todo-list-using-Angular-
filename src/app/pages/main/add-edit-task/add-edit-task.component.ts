import { Component, OnInit } from '@angular/core';
import { TaskRequestModel } from '../../../models/tasks-request-model';
import { TasksService } from '../../../services/tasks.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css']
})
export class AddEditTaskComponent implements OnInit {
  task: TaskRequestModel = {
    id: 0,
    title: '',
    desc: '',
  };
  onClose:any;

  constructor(
    private TasksService: TasksService,
    private BsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    console.log(this.task);
  }

  onAddTask(){
    let confirmAdd = confirm('Add Task?');
    if(confirmAdd)
    {
      this.TasksService.AddTask(this.task).subscribe(taskAdded => {
          console.log(taskAdded);
          this.onClose(taskAdded);
          this.BsModalRef.hide();
        }, err => {console.log(err);}
      )
    }
  }

  onEditTask(){
    let confirmEdit = confirm('Edit task?');
    if(confirmEdit)
    {
      this.TasksService.EditTask(this.task).subscribe(taskEdited => {
          console.log(taskEdited);
          this.onClose(taskEdited);
          this.BsModalRef.hide();
        },err => {console.log(err);}
      )
    }
  }

}
