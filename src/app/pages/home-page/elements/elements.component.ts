import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit {
  elements1 = [
    {
      title: 'Amount',
      icon: 'bi-coin',
      color: 'pink',
      value:'',
    },
    {
      title: 'Game',
      icon: 'bi-controller',
      color: 'pink',
      value:'',
    }, {
      title: 'User',
      icon: 'bi-person',
      color: 'pink',
      value:'',
    }, 
    {
      title: 'Post',
      icon: 'bi-book',
      color: 'pink',
      value:'',
    },

  ]
  elements2 = [
    {
      title: 'Link',
      icon: 'bi-coin',
      color: 'pink',
      value:'',
    },
    {
      title: 'Post',
      icon: 'bi-controller',
      color: 'pink',
      value:'',
    }, {
      title: 'Wating',
      icon: 'bi-person',
      color: 'pink',
      value:'',
    }, 
    {
      title: 'Post',
      icon: 'bi-book',
      color: 'pink',
      value:'',
    },

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
