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
    if (localStorage.getItem('meeting') != undefined && localStorage.getItem('meeting') != null) { 
      this.meetings = this.decryptData(localStorage.getItem('meeting'));
    }
    this.meetings.push(data);
    this.encryptData(this.meetings);
    return of({ status : 200 });
  }
  retriveData() {
    if (localStorage.getItem('meeting') != undefined && localStorage.getItem('meeting') != null) { 
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
      console.log("Error:", error);
    }
  }
}
