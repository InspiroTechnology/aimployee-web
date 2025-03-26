import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-single-file-upload',
  standalone: true,
  imports: [
    FileUploadModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './single-file-upload.component.html',
  styleUrls: ['./single-file-upload.component.scss'],
})
export class SingleFileUploadComponent {
  @Output() uploadFile = new EventEmitter<File>(); // Emit file to parent component
  @ViewChild('singleFileInput') singleFileInput!: ElementRef;

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;

  constructor() {
    this.uploader = new FileUploader({
      url: '',
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: any) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date(),
          });
        });
      },
    });

    this.hasBaseDropZoneOver = false;
    this.response = '';
  }



  // Actions for the table
  uploadItem(item: any): void {
    const file = item._file; // Access the file object
    // this.uploadFile.emit(file); // Emit the file to the parent
    console.log('Uploading file:', file);
  }

  triggerFileInput(): void {
    this.singleFileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
      this.uploadItem({ _file: file }); // Call uploadItem with the selected file
    }
  }

  onFileDropped(files: File[]): void {
    if (files && files.length > 0) {
      const file = files[0];
      console.log('Dropped file:', file);
      this.uploadItem({ _file: file }); // Call uploadItem with the dropped file
    }
  }
}
