import { Component } from '@angular/core';
import { PlayService } from '../play.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResolutionComponent } from '../resolution/resolution.component';
import { PlayResult } from '../model/playResult';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {

  enabled?: boolean;

  constructor(public service: PlayService, public spinner: NgxSpinnerService, public dialog: MatDialog) {
  }

  afterMove = () => {
    this.service.revealPlay().subscribe(response => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.openDialog(response);
      }, 1000);
    });
  }

  openDialog(playResult: PlayResult): MatDialogRef<ResolutionComponent, any> {
    this.enabled = false;
    const dialogRef = this.dialog.open(ResolutionComponent, {
      data: playResult
    });
    dialogRef.afterClosed().subscribe(() => {
      this.enabled = true;
    });
    return dialogRef;
  }
}
