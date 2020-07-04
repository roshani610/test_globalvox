import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/shared/service/meeting.service';
import { en_US, vi_VN, NzI18nService } from 'ng-zorro-antd/i18n';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listOfMeetings = [];
  selectedTimezone = 'GMT+5:30';
  selectedLang = 'en';
  constructor(private mService: MeetingService, private i18n: NzI18nService, public translate: TranslateService) {
    translate.addLangs(['en', 'hi']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|hi/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.mService.retriveData().subscribe(resp => {
      this.listOfMeetings = resp;
    });
  }
  log(e) {
    this.selectedTimezone = e;
  }
  changeLang(e) {
    this.translate.use(e);
  }

}
