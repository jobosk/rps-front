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

  loading = false;
  result?: PlayResult;

  constructor(private service: PlayService) {
  }

  afterMove = () => {
    this.service.revealPlay().subscribe(response => {
      this.loading = true;
      setTimeout(() => {
        this.loading = false
        this.result = response;
      }, 1000);
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
