import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  meetings = [];
  constructor() { }
  addData(data) {
    if (localStorage.getItem('meeting') !== undefined && localStorage.getItem('meeting') !== null) {
      this.meetings = this.decryptData(localStorage.getItem('meeting'));
    }
    if (this.validate(data, this.meetings)) {
      this.meetings.push(data);
      this.encryptData(this.meetings);
      return of({ status: 200 });
    } else {
      return of({ status: 400, message: 'Invalid date and time' });
    }
  }
  retriveData() {
    if (localStorage.getItem('meeting') !== undefined && localStorage.getItem('meeting') !== null) {
      return of(this.decryptData(localStorage.getItem('meeting')));
    } else {
      return of(this.meetings);
    }
  }
  encryptData = (data: any) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data).trim(), environment.encryptionKey).toString();
    localStorage.setItem('meeting', encryptedData);
  }
  decryptData = (data: any) => {
    try {
      const decryptedData = CryptoJS.AES.decrypt(data.trim(), environment.encryptionKey);
      if (decryptedData.toString()) {
        return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  getDate(date) {
    date = new Date(date);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  }
  getTime(date) {
    date = new Date(date);
    return date.getHours();
  }
  validate(data, meetings) {
    let flag = false;
    if (data.startTime < data.endTime) {
      const meetingOnSameDate = meetings.filter(e => {
        return this.getDate(e.meetingDate) === this.getDate(data.meetingDate);
      });
      if (meetingOnSameDate.length > 0) {
        for (const element of meetingOnSameDate) {
          const startTime = this.getTime(element.startTime);
          const endTime = this.getTime(element.endTime);
          if (this.getTime(data.startTime) > startTime && this.getTime(data.startTime) < endTime) {
            flag = false;
            break;
          } else if (this.getTime(data.startTime) === startTime || this.getTime(data.startTime) === endTime) {
            flag = false;
            break;
          } else if (this.getTime(data.endTime) === startTime || this.getTime(data.endTime) === endTime) {
            flag = false;
            break;
          }
          else {
            flag = true;
            break;
          }
        }
        // for (let i = 0; i < meetingOnSameDate.length; i++) {
        //   const startTime = this.getTime(meetingOnSameDate[i].startTime);
        //   const endTime = this.getTime(meetingOnSameDate[i].endTime);
        //   if (this.getTime(data.startTime) > startTime && this.getTime(data.startTime) < endTime) {
        //     flag = false;
        //     break;
        //   } else if (this.getTime(data.startTime) === startTime || this.getTime(data.startTime) === endTime) {
        //     flag = false;
        //     break;
        //   } else if (this.getTime(data.endTime) === startTime || this.getTime(data.endTime) === endTime) {
        //     flag = false;
        //     break;
        //   }
        //   else {
        //     flag = true;
        //     break;
        //   }
        // }
      } else {
        flag = true;
      }
      return flag;
    }

  }
}
