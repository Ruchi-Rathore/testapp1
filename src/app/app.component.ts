import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ApiService } from 'src/service/api-service';
import cityData from '../data/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  projectTitle: string;
  projectDetails: string;
  controlledAccess: boolean = false;
  createProjectForm: FormGroup;
  errorMessage: any;
  wordCountError: boolean = false;
  detailCountError: boolean = false;
  searchText: string;
  searchData: any = [];
  cityJsonData: any = cityData;
  addedUserList: any = [{
    name: 'John',
    rights: 1
  },
  {
    name: 'Jay',
    rights: 3
  },
  {
    name: 'July',
    rights: 2
  }];

  constructor(public fb: FormBuilder, private apiCall: ApiService){

  }

   chkwordRange(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined || control.value > max) {
            return { 'wordRange': true };
        }
        return null;
    };
}

  ngOnInit(){
    this.createProjectForm = this.fb.group({
      projectTitleVal: [Validators.required],
      projectDetailsVal: [Validators.required]
    });

    console.log('cityData:', cityData)
  }

  dataChanged(value) {
    if (value && value.split(' ').length > 10) {
      this.wordCountError = true;
    } else {
      this.wordCountError = false;
    }
  }

  dataChangedtextArea(value) {
    if (value && value.split(' ').length > 10) {
      this.detailCountError = true;
    } else {
      this.detailCountError = false;
    }
  }

  onChangeSwitch(value){
    this.controlledAccess = value;
  }

  searchResult(value) {
    this.searchData = [];
    if (value) {
      cityData.filter(item => {
        if (item.cityName.toLowerCase().match(value.toLowerCase())) {
          this.searchData.push(item);
        }
      });
    }
  }

  selectedCity(value) {
    console.log(value);
    this.searchText = value.cityName;
    this.searchData = [];
  }

save(){
  const data = {
    projectTitle: this.projectTitle,
    projectDetails: this.projectDetails,
    controlledAccess: this.controlledAccess,
  };
  console.log('data://', data);

  // this.apiCall.post(data, '').subscribe(
  //   response => {
  //     console.log(response);
  //this.router.navigate()
  //   },
  //   error => this.errorMessage=<any>error
  // )
}

}
