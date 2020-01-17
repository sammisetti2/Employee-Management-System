import { Component } from '@angular/core';
import { getLocaleCurrencyName } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeManagementSystem';

  employeeid:number;
  employeename:string;
  position:string;
  task:string;

  addButton = "inline";
  save = "none";
  globalposition;

  employees = this.getAllEmployees();

  addEmployee(){
    
    var Employee = {
      id:this.employeeid,
      name:this.employeename,
      position:this.position,
      task:this.task
  
    }
    
    if(!this.isAnEntry("employees"))
    {
      localStorage.setItem('employees', JSON.stringify([]));
      this.employees = this.getAllEmployees();
      this.employees.push(Employee);
      this.updateEntry(this.employees);
    }
    else
    {
      this.employees = this.getAllEmployees();
      this.employees.push(Employee);
      this.updateEntry(this.employees);
    }

    this.clearFields();
  }

  isAnEntry(key){
    if(localStorage.getItem(key) != null)
      return true;
    else
      return false;
  }

  getAllEmployees(){
    return JSON.parse(localStorage.getItem('employees'));
  }

  updateEntry(array){
    localStorage.setItem('employees', JSON.stringify(array));
    this.employees = this.getAllEmployees();
  }

  Edit(i){
    this.employees = this.getAllEmployees();

      
        this.employeeid = this.employees[i].id;
        this.employeename = this.employees[i].name;
        this.position = this.employees[i].position;
        this.task = this.employees[i].task;
        this.addButton = "none";
        this.save = "inline";
        this.globalposition = i;
        console.log(this.globalposition);

  }

  Save(){
    this.employees = this.getAllEmployees();

        console.log(this.employeeid);
        this.employees[this.globalposition].id = this.employeeid;
        this.employees[this.globalposition].name = this.employeename;
        this.employees[this.globalposition].position = this.position;
        this.employees[this.globalposition].task = this.task;
        this.clearFields();

        this.updateEntry(this.employees);
        this.employees = this.getAllEmployees();
        this.addButton = "inline";
        this.save = "none";
  }

  clearFields(){
    this.employeeid = null;
        this.employeename = "";
        this.position = "";
        this.task = "";
  }

  Delete(i){
    this.employees = this.getAllEmployees();

    this.employees.splice(i,1);
    this.updateEntry(this.employees);

    this.employees = this.getAllEmployees();

  }

  
  
}
