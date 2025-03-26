import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagService } from '../../../../services/tag.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar-tags',
  standalone: true,
  imports: [CommonModule,MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './sidebar-tags.component.html',
  styleUrls: ['./sidebar-tags.component.scss'],
})
export class SidebarTagsComponent implements OnInit {
  tags: string[] = [];
  selectedTag: string | null = null; // Track the selected tag

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.fetchTags();
  }

  private fetchTags(): void {
    const fileId = 'example-file-id'; // Replace with actual file ID logic
    this.tagService.getSuggestedTags(fileId).subscribe((tags) => {
      this.tags = tags;
    });
  }

  selectTag(tag: string): void {
    this.selectedTag = tag; // Update the selected tag
    console.log('Selected tag:', tag);
    
  }
}
