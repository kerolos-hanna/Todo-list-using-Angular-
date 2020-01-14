import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { TaskRequestModel } from '../models/tasks-request-model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { } 

  getTasks(){
    return this.http.get(environment.apiUrl + '/tasks');
  }

  AddTask(body: TaskRequestModel) {
    return this.http.post(environment.apiUrl + '/tasks',body);
  }

  EditTask(body: TaskRequestModel) {
    return this.http.put(environment.apiUrl + '/tasks/'+ body.id , body);
  }

  DeleteTask(id) {
    return this.http.delete(environment.apiUrl+`/tasks/${id}`);
  }

}
