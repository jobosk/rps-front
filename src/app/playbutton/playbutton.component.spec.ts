import 'jest-preset-angular/setup-jest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlaybuttonComponent } from './playbutton.component';
import { PlayService } from '../play.service';
import { MoveCodeEnum } from '../model/moveCodeEnum';
import { Observable, of } from 'rxjs';

describe('PlaybuttonComponent', () => {

  let component: PlaybuttonComponent;
  let fixture: ComponentFixture<PlaybuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaybuttonComponent],
      providers: [
        { provide: PlayService, useValue: { playMove: Observable<void> } },
        { provide: PlaybuttonComponent, useValue: { runAfterMove: () => { } } },
      ],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybuttonComponent);
    component = fixture.componentInstance;
    component.move = MoveCodeEnum.ROCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a call to playMove and execute afterMove afterwards when calling play', () => {
    const serviceSpy = jest.spyOn(component.service, 'playMove').mockReturnValue(of(undefined));
    const componentSpy = jest.spyOn(component, 'runAfterMove');
    component.play();
    expect(serviceSpy).toBeCalledTimes(1);
    expect(serviceSpy).toBeCalledWith(MoveCodeEnum.ROCK);
    expect(componentSpy).toBeCalledTimes(1);
  });
});
