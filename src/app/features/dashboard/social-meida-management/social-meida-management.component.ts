import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-social-meida-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule
  ],
  templateUrl: './social-meida-management.component.html',
  styleUrls: ['./social-meida-management.component.scss'],
})
export class SocialMeidaManagementComponent {
  // 导航链接，可以是字符串或对象
  links = ['单次发帖', '自动批量发帖'];
  // 当前选中的 link
  activeLink = this.links[0];

  // 选择平台
  selectedPlatforms = {
    fb: false,
    wx: false,
    xhs: false,
    ins: false,
  };

  currentStyle = 1;
  previewList: Array<{ type: 'image' | 'video'; src: string }> = [];

  // 用于在 drag over 时给卡片添加高亮样式
  isDragOver = false;

  selectStyle(style: number) {
    this.currentStyle = style;
  }

  /**
   * 点击 input[type="file"] 选择文件
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    console.log('选择的文件：', input.files);
    const files = Array.from(input.files);
    this.handleFiles(files);
    input.value = ''; // 清空 input，防止重复选择同一文件
  }

  /**
   * 拖拽进入：阻止默认事件 + 给卡片加高亮
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  /**
   * 拖拽离开：移除高亮
   */
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  /**
   * 在目标区域放下文件时：解析文件并处理
   */
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const files = Array.from(event.dataTransfer.files);
      this.handleFiles(files);
    }
  }

  // 用于绑定输入框的提示词内容
  promptText = '';

  // 点击发送按钮时触发
  sendPrompt() {
    console.log('发送的提示词：', this.promptText);
    // 在这里加入实际逻辑，如调用接口等
  }

  /**
   * 统一处理文件列表（点击 & 拖拽共用）
   */
  private handleFiles(files: File[]) {
    files.forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      // 如果不是图片或视频，可根据需求决定是否跳过
      if (!isImage && !isVideo) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const src = e.target.result as string;
        console.log('读取完成，src：', src);
        this.previewList.push({
          type: isImage ? 'image' : 'video',
          src,
        });
      };
      reader.readAsDataURL(file);
    });
  }

  // 仅返回已上传图片，并截取前三张
  get previewImages() {
    return this.previewList.filter((item) => item.type === 'image').slice(0, 3);
  }
}
