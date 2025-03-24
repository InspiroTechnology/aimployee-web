import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-page',
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
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.scss',
  encapsulation: ViewEncapsulation.None, // Disable encapsulation
})
export class UploadPageComponent {
  @Output() uploadFile = new EventEmitter<File>(); // Emit file to parent component
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  // hasAnotherDropZoneOver: boolean;
  response: string;

  // Define columns for the Material table
  displayedColumns: string[] = [
    'name',
    'size',
    'progress',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

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

    // this.uploader.response.subscribe((res) => (this.response = res));
    // Update the data source whenever the queue changes
    this.uploader.onAfterAddingFile = () => {
      this.dataSource.data = this.uploader.queue;
    };
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

  cancelItem(item: any): void {
    item.cancel();
  }

  removeItem(item: any): void {
    item.remove();
    this.dataSource.data = this.uploader.queue; // Update data source
  }

  // public fileOverAnother(e: any): void {
  //   this.hasAnotherDropZoneOver = e;
  // }
}
