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

  constructor(public fb: FormBuilder, private apiCall: ApiService){

  }

   chkwordRange(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      console.log(control.value.split(" ").length)
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
