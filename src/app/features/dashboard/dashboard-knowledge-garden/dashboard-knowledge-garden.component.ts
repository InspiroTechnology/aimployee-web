import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeGardenService } from '../../../services/knowledge-garden.service';
import { NewFlowChatComponent } from '../../chat/new-flow-chat/new-flow-chat.component';
import { UploadService } from '../../../services/upload.service';
import { SidebarTagsComponent } from './sidebar-tags/sidebar-tags.component';
import { SingleFileUploadComponent } from '../../upload/single-file-upload/single-file-upload.component';
import { TagService } from '../../../services/tag.service';
import { KnoledegeListComponent } from './knoledege-list/knoledege-list.component';
import { KnowledgeChatComponent } from '../../chat/knowledge-chat/knowledge-chat.component';

@Component({
  selector: 'app-dashboard-knowledge-garden',
  standalone: true,
  imports: [
    CommonModule,
    NewFlowChatComponent,
    SidebarTagsComponent,
    SingleFileUploadComponent,
    KnoledegeListComponent,
    KnowledgeChatComponent
  ],
  templateUrl: './dashboard-knowledge-garden.component.html',
  styleUrls: ['./dashboard-knowledge-garden.component.scss'],
})
export class DashboardKnowledgeGardenComponent implements OnInit {
  

  constructor(
    private uploadService: UploadService, // Inject UploadService
    private tagService: TagService, // Inject TagService
    public knowledgeGardenService: KnowledgeGardenService
  ) {
    
  }

  ngOnInit(): void {
    
  }



  uploadFileThroughService(file: File): void {
    // Get tags from TagService
    const tags = this.tagService.getSelectedTag()
      ? [this.tagService.getSelectedTag()]
      : [];
    const storeOriginal = true; // Whether to store the original file

    this.uploadService
      .uploadFile(file, storeOriginal, tags.join(','))
      .subscribe({
        next: (response) => {
          console.log('File uploaded successfully:', response);
          this.knowledgeGardenService.triggerKnowledgeUpdate();
          
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
