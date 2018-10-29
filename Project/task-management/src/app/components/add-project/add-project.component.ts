import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { asEnumerable } from 'linq-es2015';
import { DialogService } from 'ng2-bootstrap-modal';
import {
  ProjectService, CustomerService, UserService, DepartmentService,
  Project, Customer, User, Department, DepartmentHours, Permission,
  stringValidatorArr, numberValidatorArr,DateValidatorArr,
  ConfirmComponent,
  Global
} from '../../imports';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  //----------------PROPERTIRS-------------------

  projectFormGroup: FormGroup;
  project: Project;

  customers: Customer[];
  teamLeaders: User[];
  departments: Department[];
  extraWorkers: User[];
  selectedWorkers: User[];

  //allow access 'Object' type via interpolation
  objectHolder: typeof Object = Object;

  //----------------CONSTRUCTOR------------------

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogService: DialogService,
    private projectService: ProjectService,
    private customerService: CustomerService,
    private userService: UserService,
    private departmentService: DepartmentService,
  ) { }

  //----------------METHODS-------------------

  async ngOnInit() {
    this.getAllCustomers();
    this.getAllTeamLeaders();
    this.departments = await this.departmentService.getAllDepartments();
    this.initFormGroup();
  }

  initFormGroup() {
    this.projectFormGroup = this.formBuilder.group({
      projectName: ['', stringValidatorArr('project name', 2, 15, /^[A-Za-z]+$/)],
      customerId: ['', stringValidatorArr('customer')],
      teamLeaderId: ['', stringValidatorArr('team leader')],
      totalHours: this.formBuilder.array(
        this.getDepartmentControls()
      ),
      startDate: ['', DateValidatorArr(null)],
      endDate: ['', stringValidatorArr('end date')],
    });
   // todo date validations
    // this.endDate.setValidators(DateValidator(this.startDate));
    // this.endDate.updateValueAndValidity();
  }
  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllTeamLeaders() {
    this.userService.getAllTeamLeaders().subscribe(
      (teamLeaders: User[]) => {
        this.teamLeaders = teamLeaders;
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments().then(
      (departments: Department[]) => {
        this.departments = departments;
        this.initFormGroup();
      },
      err => {
        console.log(err);
      }
    );
  }

  getDepartmentControls(): FormControl[] {
    let formControlArr: FormControl[] = [];
    this.departments.forEach(department => {
      let formControl: FormControl = new FormControl(null, numberValidatorArr(department.departmentName, 0));
      formControlArr.push(formControl);
    });
    return formControlArr;
  }

  getTotalHours() {
    return asEnumerable((<FormArray>this.totalHours).controls).Sum(x => (<FormControl>x).value);
  }

  onTeamLeaderChange() {
    this.getExtraWorkers();
    this.userService.resetPermissionSubject.next();
  }

  getExtraWorkers() {
    this.userService.getAllUsers().subscribe(
      (workers: User[]) => {
        this.extraWorkers = workers.filter(worker => worker.teamLeaderId != null && worker.teamLeaderId != this.teamLeaderId.value);
      },
      err => {
        console.log(err);
      }
    );
  }

  getSelectedWorkers(workers: User[]) {
    this.selectedWorkers = workers;
  }

  onSubmit() {
    this.project = this.projectFormGroup.value;
    this.project.managerId = JSON.parse(localStorage.getItem(Global.USER)).userId;
    this.project.totalHours = this.getTotalHours();
    //init departmentsHours array
    this.project.departmentsHours = [];
    let i: number = 0;
    (<FormArray>this.totalHours).controls.forEach(departmentHour => {
      let departmentHours: DepartmentHours = new DepartmentHours(0, 0, this.departments[i].departmentId, departmentHour.value);
      this.project.departmentsHours.push(departmentHours);
      i++;
    });
    //init permissions array if exsits
    if (this.selectedWorkers) {
      this.project.permissions = [];
      this.selectedWorkers.forEach(worker => {
        let permission: Permission = new Permission(0, worker.userId, 0, true);
        this.project.permissions.push(permission);
      })
    }
    this.addProject();
  }

  addProject() {
    this.projectService.addProject(this.project).subscribe(
      (created: boolean) => {
        if (created) {
          this.showConfirm();
        }
      },
      err => console.log(err));
  }

  showConfirm() {
    this.dialogService.addDialog(ConfirmComponent, {
      title: '',
      msg: `${this.project.projectName} added succsesully`,
      autoClosing: true
    }).subscribe(() => {
      this.router.navigate(['taskManagement/manager/userManagement']);
    });
  }

  //----------------GETTERS-------------------

  //getters of the form group controls

  get projectName() {
    return this.projectFormGroup.controls['projectName'];
  }

  get customerId() {
    return this.projectFormGroup.controls['customerId'];
  }

  get teamLeaderId() {
    return this.projectFormGroup.controls['teamLeaderId'];
  }

  get totalHours() {
    return this.projectFormGroup.controls['totalHours'];
  }

  get startDate() {
    return this.projectFormGroup.controls['startDate'];
  }

  get endDate() {
    return this.projectFormGroup.controls['endDate'];
  }

}
