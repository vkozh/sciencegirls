import { Component, OnInit } from '@angular/core';
import { creators } from './creators';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.css']
})
export class CreatorsComponent implements OnInit {

  creators = creators;

  constructor() { }

  ngOnInit(): void {
  }

}
