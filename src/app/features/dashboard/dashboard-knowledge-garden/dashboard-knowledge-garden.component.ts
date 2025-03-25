import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeGardenService } from '../../../services/knowledge-garden.service';
import { NewFlowChatComponent } from '../../chat/new-flow-chat/new-flow-chat.component';
import { UploadPageComponent } from '../../upload/upload-page/upload-page.component';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-dashboard-knowledge-garden',
  standalone: true,
  imports: [CommonModule, NewFlowChatComponent, UploadPageComponent],
  templateUrl: './dashboard-knowledge-garden.component.html',
  styleUrls: ['./dashboard-knowledge-garden.component.scss'],
})
export class DashboardKnowledgeGardenComponent implements OnInit {
  knowledgeData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  Math = Math; // Expose Math object for use in the template

  constructor(
    private knowledgeGardenService: KnowledgeGardenService,
    private uploadService: UploadService // Inject UploadService
  ) {}

  ngOnInit(): void {
    this.loadKnowledge();
  }

  loadKnowledge(): void {
    this.knowledgeGardenService
      .getPaginatedKnowledge(this.currentPage, this.pageSize)
      .subscribe({
        next: (res) => {
          console.log('Paginated knowledge data:', res);
          this.knowledgeData = res.data.records || []; // Assuming `data.records` contains the knowledge list
          console.log(this.knowledgeData);

          this.totalRecords = res.data.total || 0; // Total number of records
          console.log(this.totalRecords);
        },
        error: (err) => {
          console.error('Error fetching paginated knowledge data:', err);
        },
      });
  }

  onPageChange(newPage: number): void {
    if (
      newPage > 0 &&
      newPage <= Math.ceil(this.totalRecords / this.pageSize)
    ) {
      this.currentPage = newPage;
      this.loadKnowledge();
    }
  }

  uploadFileThroughService(file: File): void {
    // console.log('Uploading file:', file);
    
    this.uploadService.uploadFile(file).subscribe({
      next: (response) => {
        console.log('File uploaded successfully:', response);
      },
      error: (error) => {
        console.error('Error uploading file:', error);
      },
    });
  }

  // downloadFile(fileUrl: string): void {
  //   const link = document.createElement('a');
  //   link.href = fileUrl;
  //   link.target = '_blank';
  //   link.download = ''; // Optional: Set a default filename if needed
  //   link.click();
  // }
}
