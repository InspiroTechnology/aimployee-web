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
  knowledgeData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private knowledgeGardenService: KnowledgeGardenService) {}

  ngOnInit(): void {
    this.loadKnowledge();
  }

  loadKnowledge(): void {
    this.knowledgeGardenService
      .getPaginatedKnowledge(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          console.log('Paginated knowledge data:', data);
          this.knowledgeData = data.items || []; // Assuming `data.items` contains the knowledge list
        },
        error: (err) => {
          console.error('Error fetching paginated knowledge data:', err);
        },
      });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadKnowledge();
  }
}
