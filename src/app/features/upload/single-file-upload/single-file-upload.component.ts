import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  ],  templateUrl: './single-file-upload.component.html',
  styleUrls: ['./single-file-upload.component.scss']
})
export class SingleFileUploadComponent {
  @Output() uploadFile = new EventEmitter<File>(); // Emit file to parent component
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  // hasAnotherDropZoneOver: boolean;
  response: string;



  constructor() {
    this.uploader = new FileUploader({
      url: 'https://evening-anchorage-3159.herokuapp.com/api/',
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
    // this.hasAnotherDropZoneOver = false;

    this.response = '';

 
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  // Actions for the table
  uploadItem(item: any): void {
    // console.log('Uploading item:', item);
    const file = item._file; // Access the file object
    this.uploadFile.emit(file); // Emit the file to the parent
  }


}
