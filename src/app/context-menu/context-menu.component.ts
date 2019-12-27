import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {
  
  private readonly _matDialogRef: MatDialogRef<ContextMenuComponent>;
  private readonly triggerElementRef: ElementRef;

  constructor(_matDialogRef: MatDialogRef<ContextMenuComponent>,
    @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef }) {
      this._matDialogRef = _matDialogRef;
      this.triggerElementRef = data.trigger;
 }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${rect.left - 130}px`, top: `${rect.bottom - 72}px` };
    matDialogConfig.width = '130px';
    matDialogConfig.height = '72px';
    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this._matDialogRef.updatePosition(matDialogConfig.position);
  }

}
