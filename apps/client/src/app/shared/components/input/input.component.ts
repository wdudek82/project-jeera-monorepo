import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label = '';
  @Input() control: FormControl | null = null;
  @Input() controlName = '';

  constructor() { }

  ngOnInit(): void {
  }
}
