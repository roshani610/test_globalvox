import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/shared/service/meeting.service';
interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listOfMeetings = [];
  listOfData: Person[]  = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ]
  constructor(private mService:MeetingService) { }

  ngOnInit(): void {
    this.mService.retriveData().subscribe(resp => {
      console.log("resp:", resp);
      this.listOfMeetings = resp;
      console.log("list:", this.listOfMeetings);
    })
  }

}
