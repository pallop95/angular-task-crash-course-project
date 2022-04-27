import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  data = {
    name: '',
    animal: '',
  };

  constructor() { }

  ngOnInit(): void {
  }

  onNoClick() {
    console.log('onNoClick');
  }
}
