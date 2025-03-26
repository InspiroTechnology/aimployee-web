import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-tags',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-tags.component.html',
  styleUrls: ['./sidebar-tags.component.scss']
})
export class SidebarTagsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
