import { Component } from '@angular/core';
import { LayOutService } from '../../services/lay-out.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list'; // Import MatListModule

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'], // Fixed typo here
})
export class SidebarComponent {
  constructor(public layoutService: LayOutService) {}
}
