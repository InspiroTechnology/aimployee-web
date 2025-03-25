import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-hero-section.component.html',
  styleUrls: ['./dashboard-hero-section.component.scss'],
})
export class DashboardHeroSectionComponent implements OnInit {
  @Input() slogans: string[] = []; // Accept slogans dynamically
  @Input() header: string = ''; // Accept header text dynamically
  @Input() containerStyle: { [key: string]: string } = {}; // Accept inline styles for positioning
  @Input() alignment: 'start' | 'center' | 'end' = 'center'; // Accept alignment input from parent

  constructor() {}

  ngOnInit(): void {
    // console.log(this.slogans);
    // console.log(this.header);
    // console.log(this.containerStyle);
    // console.log(this.alignment);
  }
}
