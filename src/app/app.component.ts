import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ApiService } from 'src/service/api-service';


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
  }

  dataChanged(e) {
    if (e.split(' ').length > 150) {
      this.wordCountError = true;
    } else {
      this.wordCountError = false;
    }
  }

  dataChangedtextArea(e) {
    if (e.split(' ').length > 250) {
      this.detailCountError = true;
    } else {
      this.detailCountError = false;
    }
  }

  onChangeSwitch(e){
    this.controlledAccess = e;
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
