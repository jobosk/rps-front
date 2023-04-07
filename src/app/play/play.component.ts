import { Component } from '@angular/core';
import { PlayService } from '../play.service';
import { UUID } from 'angular2-uuid';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResolutionComponent } from '../resolution/resolution.component';
import { PlayResult } from '../model/playResult';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {

  enabled?: boolean;
  userId: string;

  constructor(public service: PlayService, public dialog: MatDialog) {
    this.userId = UUID.UUID();
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

  afterMove = () => {
    this.service.revealPlay(this.userId).subscribe(response => {
      this.openDialog(response);
    });
  }
}
