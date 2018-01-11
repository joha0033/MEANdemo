import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ValidateService } from '../../services/validate.service'
import {FlashMessagesService} from 'angular2-flash-messages'
import { AuthService } from '../../services/auth.service'
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ValidateService, FlashMessagesService, AuthService],
      declarations: [ DashboardComponent ],
      imports: [ FormsModule, HttpModule, RouterTestingModule],
    })
    .compileComponents();
    const data = {
      name: 'donni',
      gratefulPost: 'do do do '
    }
    localStorage.setItem('user', data.name)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    localStorage.getItem('user')
    expect(component).toBeTruthy();
  });
});
