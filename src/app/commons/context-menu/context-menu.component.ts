import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NoMistakeComponent } from '../no-mistake/no-mistake.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/app.reducers';
import { openDeleteDialog, openModifyForm } from 'src/app/expenseTracker/expense.actions';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {
  
  private readonly _matDialogRef: MatDialogRef<ContextMenuComponent>;
  private readonly triggerElementRef: ElementRef;
  private readonly id: number;

  constructor(private store: Store<AppState>,
    private router: Router,
    _matDialogRef: MatDialogRef<ContextMenuComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: { trigger: ElementRef, id: number },
    private noMistakeDialog: MatDialog) {
      this._matDialogRef = _matDialogRef;
      this.triggerElementRef = dialogData.trigger;
      this.id = dialogData.id;
 }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${rect.left - 140}px`, top: `${rect.bottom - 72}px` };
    matDialogConfig.width = '140px';
    matDialogConfig.height = '72px';
    matDialogConfig.panelClass = 'custom-dialog-container';
    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this._matDialogRef.updatePosition(matDialogConfig.position);
    this._matDialogRef.addPanelClass(matDialogConfig.panelClass);
  }

  onDelete() {
    this.store.dispatch(openDeleteDialog({id: this.id}));
    this._matDialogRef.close();
    const dialogRef = this.noMistakeDialog.open(NoMistakeComponent, {
      maxWidth: '350px',
      data: {id: this.id}
    });
  }

  onEdit() {
    this._matDialogRef.close();
    this.store.dispatch(openModifyForm({id: this.id}));
    this.router.navigate(['/expense']);
  }

}
