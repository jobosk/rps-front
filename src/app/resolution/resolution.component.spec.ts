import 'jest-preset-angular/setup-jest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResolutionComponent } from './resolution.component';
import { OutcomeCodeEnum } from '../model/outcomeCodeEnum';

describe('ResolutionComponent', () => {

  let component: ResolutionComponent;
  let fixture: ComponentFixture<ResolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResolutionComponent
      ],
      providers: [
        ResolutionComponent,
        { provide: MatDialogRef, useValue: { close: () => { } } },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
      imports: [
        MatDialogModule,
        MatProgressSpinnerModule
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(ResolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep the loading flag to true for 1 second on startup', () => {
    jest.useFakeTimers();
    component.ngOnInit();
    expect(component.loading).toEqual(true);
    setTimeout(() => {
      expect(component.loading).toEqual(false);
    }, 1000);
    jest.runAllTimers();
  });

  it('should return specific responses when passing play results to humanizeResult', () => {
    expect(component.humanizeResult(OutcomeCodeEnum.USERWINS)).toEqual('You win!');
    expect(component.humanizeResult(OutcomeCodeEnum.MACHINEWINS)).toEqual('You lose...');
    expect(component.humanizeResult(OutcomeCodeEnum.TIE)).toEqual('It\'s a tie.');
  });

  it('should return specific responses when passing play results to getButtonMessage', () => {
    expect(component.getButtonMessage(OutcomeCodeEnum.USERWINS)).toEqual('Be gracious in victory');
    expect(component.getButtonMessage(OutcomeCodeEnum.MACHINEWINS)).toEqual('Accept your fate already');
    expect(component.getButtonMessage(OutcomeCodeEnum.TIE)).toEqual('You get one more chance');
  });

  it('should close the dialog when calling closeDialog', () => {
    const dialogSpy = jest.spyOn(component.dialogRef, 'close');
    component.closeDialog();
    expect(dialogSpy).toBeCalledTimes(1);
  });
});
