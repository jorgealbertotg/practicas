import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'plus-sidebar-superior',
  templateUrl: './plus-sidebar-superior.component.html',
  styleUrls: ['./plus-sidebar-superior.component.css']
})
export class PlusSidebarSuperiorComponent implements OnInit {
  @Input() italic: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() subtitleBold: string;
  @Input() messageButton: string;
  @Input() numeroBolita: string;

  constructor() { }

  ngOnInit(): void {
  }

}
