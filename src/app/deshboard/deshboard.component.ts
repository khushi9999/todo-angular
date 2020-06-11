import { Component, OnInit, AfterContentChecked, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { DataService } from '../service/data.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as _ from 'lodash';

@Component({
  selector: 'app-deshboard',
  templateUrl: './deshboard.component.html',
  styleUrls: ['./deshboard.component.scss']
})
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DeshboardComponent implements OnInit, AfterContentChecked {
  @BlockUI() blockUI: NgBlockUI;
  title = 'TodosApp';
  jsonPath = 'https://jsonplaceholder.typicode.com/todos/';
  loadingText = 'Please wait...';
  showdata = false;
  dataFromApi = [];
  selectedID: any;
  details: any;
  status: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  showDetails() {
  if (!this.selectedID) {
    alert('Please Enter Id');
    return;
  }
  // this.dataService.errorInApi
  this.blockUI.start(this.loadingText);
  this.showdata = false;
  const api = this.jsonPath + this.selectedID;
  this.dataService.dataJsonLoad(api).subscribe(
    res => {
      this.details = res;
      this.showdata = true;
      this.status = this.details['completed'] ? 'Yes' : 'No';
      this.blockUI.stop();
    }
  );

  }
  ngAfterContentChecked() {
    if (this.dataService.errorInApi) {
      this.dataService.errorInApi = false;
      this.blockUI.stop();
      alert('Something went wrong with API!');
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    this.showdata = false;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
