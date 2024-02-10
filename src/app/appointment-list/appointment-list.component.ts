import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit{

  editMode: boolean = false;
  editAppointmentIndex: number = 1;
  newAppointmentTitle: string = "";
  newAppointmentDate: Date | null = null;

  appointments: Appointment[] = [];

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem('appointments');

    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  addAppointment() {
    if(!this.newAppointmentTitle.trim().length || !this.newAppointmentDate) return;

      let newAppointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
        completed: false
      }

      this.appointments.push(newAppointment);

      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();

      localStorage.setItem('appointments', JSON.stringify(this.appointments));

  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  editAppointment(index: number) {
    this.editMode = true;
    this.editAppointmentIndex = index;
    this.newAppointmentTitle = this.appointments[index].title;
    this.newAppointmentDate = this.appointments[index].date;
  }

  markAsDone(index: number) {
    this.appointments[index].completed = true;
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  persistEdit() {
    if(!this.newAppointmentTitle.trim().length || !this.newAppointmentDate) return;

    let index = this.editAppointmentIndex;
    this.appointments[index].title = this.newAppointmentTitle;
    this.appointments[index].date = this.newAppointmentDate;

    this.newAppointmentTitle = '';
    this.newAppointmentDate = new Date();

    localStorage.setItem('appointments', JSON.stringify(this.appointments));

    this.editMode = false;
  }

  undoEdit() {
    this.editMode = false;
    this.newAppointmentTitle = '';
    this.newAppointmentDate = new Date();
  }

}
