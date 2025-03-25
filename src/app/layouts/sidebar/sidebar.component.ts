import { Component } from '@angular/core';
import { LayOutService } from '../../services/lay-out.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatListModule, RouterModule], // Add RouterModule here
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(public layoutService: LayOutService) {}
}
