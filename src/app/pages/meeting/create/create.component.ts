import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { MeetingService } from 'src/app/shared/service/meeting.service';
import * as dateFun from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  meetingForm: FormGroup;
  sTime: Date = new Date();
  eTime: Date = new Date();
  mDate: Date = new Date();
  disabledDate;
  constructor(private location: Location, private mService: MeetingService, private modal: NzModalService) { }
  ngOnInit(): void {
    this.createMeetingForm();
  }
  createMeetingForm() {
    this.meetingForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
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
    const key = 'message';
    this.mService.addData(formData).subscribe(resp => {
      if (resp.status === 200) {
        this.goBack();
      } else {
        this.modal.error({
          nzTitle: 'Validation Failed !',
          nzContent: resp[key]
        });
      }
    });
  }
  goBack() {
    this.location.back();
  }
  log(time: Date, from): void {
    if (from === 'start') {
      this.sTime = time;
    } else {
      this.eTime = time;
    }
  }
}
