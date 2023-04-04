import { Component } from '@angular/core';
import { PlayService } from '../play.service';
import { MoveCodeEnum } from '../model/moveCodeEnum';
import { PlayResult } from '../model/playResult';
import { OutcomeCodeEnum } from '../model/outcomeCodeEnum';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {

  result?: PlayResult;

  constructor(private service: PlayService) {
  }

  playRock(): void {
    this.service.playMove(MoveCodeEnum.ROCK).subscribe(response => {
      this.service.revealPlay().subscribe(response => {
        this.result = response;
      });
    });
  }

  playPaper(): void {
    this.service.playMove(MoveCodeEnum.PAPER).subscribe(response => {
      this.service.revealPlay().subscribe(response => {
        this.result = response;
      });
    });
  }

  playScissors(): void {
    this.service.playMove(MoveCodeEnum.SCISSORS).subscribe(response => {
      this.service.revealPlay().subscribe(response => {
        this.result = response;
      });
    });
  }

  humanizeResult(result: string): string {
    if (result === OutcomeCodeEnum.USERWINS) {
      return 'You win!';
    }
    if (result === OutcomeCodeEnum.MACHINEWINS) {
      return 'You lose...';
    }
    return 'It\'s a tie.';
  }
}
