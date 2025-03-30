import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { KnowledgeGardenService } from '../../../../services/knowledge-garden.service';
import { TagService } from '../../../../services/tag.service';
import { Subscription } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-knoledege-list',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    NgFor,
    MatCardModule,
    MatPaginatorModule,
  ],
  templateUrl: './knoledege-list.component.html',
  styleUrls: ['./knoledege-list.component.scss'],
})
export class KnoledegeListComponent implements OnInit, OnDestroy {
  knowledgeData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  Math = Math; // Expose Math object for use in the template
  Array = Array; // Expose Array object for use in the template

  private tagSubscription: Subscription | null = null;

  constructor(
    private knowledgeGardenService: KnowledgeGardenService,
    public tagService: TagService
  ) {
    this.knowledgeGardenService.triggerObservable.subscribe(() => {
      this.loadKnowledge();
    });
  }

  ngOnInit(): void {
    this.loadKnowledge();
    this.tagSubscription = this.tagService.selectedTagChanged.subscribe(() => {
      this.loadKnowledge();
    });
  }

  ngOnDestroy(): void {
    if (this.tagSubscription) {
      this.tagSubscription.unsubscribe();
    }
  }

  loadKnowledge(): void {
    const tags = this.tagService.getSelectedTag()
      ? [this.tagService.getSelectedTag()]
      : [];
    const filteredTags = tags.filter((tag): tag is string => tag !== null);

    this.knowledgeGardenService
      .fetchKnowledge(this.currentPage, this.pageSize, filteredTags)
      .subscribe({
        next: (res) => {
          console.log('Paginated knowledge data:', res);
          this.knowledgeData = res.data.records || [];
          this.totalRecords = res.data.total || 0;
        },
        error: (err) => {
          console.error('Error fetching paginated knowledge data:', err);
        },
      });
  }

  onPageChange(event: number | PageEvent): void {
    const newPage = typeof event === 'number' ? event : event.pageIndex + 1;
    if (
      newPage > 0 &&
      newPage <= Math.ceil(this.totalRecords / this.pageSize)
    ) {
      this.currentPage = newPage;
      this.loadKnowledge();
    }
  }
}
