import { Component, Input } from '@angular/core';
import { PlayService } from '../play.service';

@Component({
  selector: 'app-playbutton',
  templateUrl: './playbutton.component.html',
  styleUrls: ['./playbutton.component.css']
})
export class PlaybuttonComponent {

  @Input()
  move!: string;

  @Input()
  iconFilePath?: string;

  @Input()
  afterMove?: Function;

  @Input()
  enabled?: boolean;

  constructor(public service: PlayService) {
  }

  play(): void {
    if (this.move) {
      this.service.playMove(this.move)
        .subscribe(() => this.runAfterMove());
    }
  }

  runAfterMove(): void {
    if (this.afterMove) {
      this.afterMove();
    }
  }
}
