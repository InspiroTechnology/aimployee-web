import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeGardenService } from '../../../services/knowledge-garden.service';

@Component({
  selector: 'app-dashboard-knowledge-garden',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-knowledge-garden.component.html',
  styleUrls: ['./dashboard-knowledge-garden.component.scss'],
})
export class DashboardKnowledgeGardenComponent implements OnInit {
  constructor(private knowledgeGardenService: KnowledgeGardenService) {}

  ngOnInit(): void {
    this.knowledgeGardenService.getKnowledgeByUserId(3).subscribe({
      next: (data) => {
        console.log('Knowledge data:', data);
      },
      error: (err) => {
        console.error('Error fetching knowledge data:', err);
      },
    });
  }
}
