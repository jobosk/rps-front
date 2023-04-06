import { Component } from '@angular/core';
import { PlayService } from '../play.service';
import { MatDialog } from '@angular/material/dialog';
import { ResolutionComponent } from '../resolution/resolution.component';
import { PlayResult } from '../model/playResult';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {

  enabled?: boolean;

  constructor(private service: PlayService, private dialog: MatDialog) {
  }

  openDialog(playResult: PlayResult): void {
    this.enabled = false;
    const dialogRef = this.dialog.open(ResolutionComponent, {
      data: playResult
    });
    dialogRef.afterClosed().subscribe(() => {
      this.enabled = true;
    });
  }

  afterMove = () => {
    this.service.revealPlay().subscribe(response => {
      this.openDialog(response);
    });
  }
}
