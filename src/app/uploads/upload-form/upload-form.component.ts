import { Component, OnInit } from '@angular/core';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  selectedFile: File;
  currentUpload: Upload;

  constructor(private upSvc: UploadService) { }

  ngOnInit() {
  }

  detectFile(event) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    let file = this.selectedFile;
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
  }

}
