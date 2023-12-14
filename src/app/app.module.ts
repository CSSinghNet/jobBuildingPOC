import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';
import {CdkDragDropConnectedSortingExample} from './cdk-drag-drop-connected-sorting-example';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { DialogOverviewExample, DialogOverviewExampleDialog } from './dialog-overview-example/dialog-overview-example';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [CdkDragDropConnectedSortingExample,DialogOverviewExample,DialogOverviewExampleDialog],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [CdkDragDropConnectedSortingExample],
})
export class AppModule {}
