import 'jest-preset-angular/setup-jest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlayResult } from '../model/playResult';
import { Observable, of, lastValueFrom } from 'rxjs';
import { PlayComponent } from './play.component';
import { PlaybuttonComponent } from '../playbutton/playbutton.component';
import { MoveCodeEnum } from '../model/moveCodeEnum';
import { OutcomeCodeEnum } from '../model/outcomeCodeEnum';
import { PlayService } from '../play.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PlayComponent', () => {

  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;

  const playResult: PlayResult = {
    moveByUser: MoveCodeEnum.PAPER
    , moveByMachine: MoveCodeEnum.ROCK
    , outcome: OutcomeCodeEnum.MACHINEWINS
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PlayComponent,
        PlaybuttonComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: { open: () => { } } },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: PlayService, useValue: { revealPlay: Observable<PlayResult> } },
        { provide: PlayComponent, useValue: { openDialog: () => { } } },
        { provide: NgxSpinnerService },
      ],
      imports: [
        MatDialogModule,
        HttpClientTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner for 1 second and open a dialog with the result when response for reveal is received after playing a move', () => {
    const serviceSpy = jest.spyOn(component.service, 'revealPlay').mockReturnValue(of(playResult));
    const spinnerOpenSpy = jest.spyOn(component.spinner, 'show');
    const spinnerCloseSpy = jest.spyOn(component.spinner, 'hide');
    const componentSpy = jest.spyOn(component, 'openDialog');
    jest.useFakeTimers();
    component.afterMove();
    expect(serviceSpy).toBeCalledTimes(1);
    expect(spinnerOpenSpy).toBeCalledTimes(1);
    setTimeout(() => {
      expect(spinnerCloseSpy).toBeCalledTimes(1);
      expect(componentSpy).toBeCalledTimes(1);
    }, 1000);
    jest.runAllTimers();
  });

  it('should open a dialog when calling openDialog and keep the enabled flag to false during its lifetime', () => {
    const dialogSpy = jest.spyOn(component.dialog, 'open');
    let dialogRef = component.openDialog(playResult);
    expect(component.enabled).toEqual(false);
    expect(dialogSpy).toBeCalledTimes(1);
    dialogRef.close();
    lastValueFrom(dialogRef.afterClosed()).then(() => {
      expect(component.enabled).toEqual(true);
    });
  });
});
