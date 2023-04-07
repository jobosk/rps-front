import 'jest-preset-angular/setup-jest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlayResult } from '../model/playResult';
import { Observable, of, lastValueFrom } from 'rxjs';
import { PlayComponent } from './play.component';
import { PlaybuttonComponent } from '../playbutton/playbutton.component';
import { MoveCodeEnum } from '../model/moveCodeEnum';
import { OutcomeCodeEnum } from '../model/outcomeCodeEnum';
import { PlayService } from '../play.service';

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
      ],
      imports: [
        MatDialogModule,
        HttpClientTestingModule
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a unique ID', () => {
    expect(component.userId).not.toBeUndefined();
    expect(component.userId).not.toBeNull();
    expect(component.userId).not.toBe(null);
    expect(component.userId).not.toEqual(null);
    //expect(component.userId.toString()).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    expect(component.userId.toString()).toMatch(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/i);
  });

  it('should open a dialog when calling openDialog and keep the enabled flag to false during its lifetime', async () => {
    const dialogSpy = jest.spyOn(component.dialog, 'open');
    let dialogRef = component.openDialog(playResult);
    expect(component.enabled).toEqual(false);
    expect(dialogSpy).toBeCalledTimes(1);
    dialogRef.close();
    await lastValueFrom(dialogRef.afterClosed());
    expect(component.enabled).toEqual(true);
  });

  it('should make a call to revealPlay and open a dialog with the response when calling afterMove', () => {
    const serviceSpy = jest.spyOn(component.service, 'revealPlay').mockReturnValue(of(playResult));
    const componentSpy = jest.spyOn(component, 'openDialog');
    component.afterMove();
    expect(serviceSpy).toBeCalledTimes(1);
    expect(serviceSpy).toBeCalledWith(component.userId);
    expect(componentSpy).toBeCalledTimes(1);
  });
});
