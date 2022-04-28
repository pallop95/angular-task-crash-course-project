import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  // data = {
  //   name: '',
  //   animal: '',
  // };
  // users = []
  selectedIds = new FormControl();

  @Output() submitClicked = new EventEmitter<any>();

  // constructor(public dialogRef: MatDialogRef<DialogComponent>){}

  // saveMessage() {
  //   this.submitClicked.emit('Your data');
  // }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {}

  // onNoClick() {
  //   console.log('onNoClick');
  // }

  saveMessage() {
    this.submitClicked.emit(this.selectedIds.value);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
