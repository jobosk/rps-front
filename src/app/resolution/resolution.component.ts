import { Component, Inject } from '@angular/core';
import { OutcomeCodeEnum } from '../model/outcomeCodeEnum';
import { PlayResult } from '../model/playResult';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-resolution',
  templateUrl: './resolution.component.html',
  styleUrls: ['./resolution.component.css']
})
export class ResolutionComponent {

  result?: PlayResult;

  constructor(public dialogRef: MatDialogRef<ResolutionComponent>, @Inject(MAT_DIALOG_DATA) public _result: PlayResult) {
    this.result = _result;
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

  getButtonMessage(result: string) {
    if (result === OutcomeCodeEnum.USERWINS) {
      return 'Be gracious in victory';
    }
    if (result === OutcomeCodeEnum.MACHINEWINS) {
      return 'Accept your fate already';
    }
    return 'You get one more chance';
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
