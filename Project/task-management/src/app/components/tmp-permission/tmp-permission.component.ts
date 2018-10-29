import { Component, Input } from '@angular/core';
import { PermissionService, Permission } from '../../imports';

@Component({
  selector: 'app-tmp-permission',
  templateUrl: './tmp-permission.component.html',
  styleUrls: ['./tmp-permission.component.css']
})
export class TmpPermissionComponent {

  //----------------PROPERTIRS-------------------

  @Input()
  permission: Permission;

  //----------------CONSTRUCTOR------------------

  constructor(private permissionService: PermissionService) { }

  //----------------METHODS-------------------

  deletePermission() {
    this.permissionService.deletePemission(this.permission.permissonId).subscribe(
      (deleted: boolean) => {
        if (deleted)
          this.permissionService.deletePermissionSubject.next(this.permission);
      },
      err => {
        console.log(err);
      }
    );
  }
}
