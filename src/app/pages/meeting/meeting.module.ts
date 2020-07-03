import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { NgZorroAntdModuleModule } from 'src/app/ng-zorro-antd-module.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListComponent, CreateComponent],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    NgZorroAntdModuleModule,
    ReactiveFormsModule
  ]
})
export class MeetingModule { }
