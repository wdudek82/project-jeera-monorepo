import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.component.html',
})
export class DialogOverviewExample {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExample>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
