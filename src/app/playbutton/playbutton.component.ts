import { Component, Input } from '@angular/core';
import { PlayService } from '../play.service';
import { MoveCodeEnum } from '../model/moveCodeEnum';

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

  constructor(private service: PlayService) {
  }

  play(): void {
    this.service.playMove(this.move)
      .subscribe(() => {
        if (this.afterMove) {
          this.afterMove();
        }
      });
  }
}
