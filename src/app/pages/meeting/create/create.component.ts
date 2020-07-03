import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { MeetingService } from 'src/app/shared/service/meeting.service';
import * as dateFun from 'date-fns';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  meetingForm: FormGroup;
  start_time: Date = new Date();
  end_time: Date = new Date();
  meeting_date: Date = new Date();
  disabledDate
  constructor(private location:Location,private mService:MeetingService) { }
  ngOnInit(): void {
    this.createMeetingForm();
  }
  createMeetingForm() {
    this.meetingForm = new FormGroup({
      fullName: new FormControl("", [Validators.required]),
      meetingDate: new FormControl(new Date(), [Validators.required]),
      startTime: new FormControl(new Date(), [Validators.required]),
      endTime: new FormControl(new Date(), [Validators.required])
    });
    this.disabledDate = (current: Date): boolean => {
      // Can not select days before today and today
      return dateFun.differenceInCalendarDays(current, new Date()) < 0;
    };
  }
  _submitForm(formData) {
    console.log(formData)
    this.mService.addData(formData).subscribe(resp => {
      if (resp.status === 200) {
        this.goBack();
      }
    })
    
  }
  goBack() {
    this.location.back();
  }
  log(time:Date,from): void {
    if(from === 'start'){
      this.start_time=time;
    }else{
      this.end_time=time;
    }
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

}
