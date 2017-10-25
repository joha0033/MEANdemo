import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    console.log(this.name)
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    //required fields
    if(!this.validateService.validateRegister(user)){
      console.log('fill it bro.')
      this.flashMessage.show('Fill it all out... please', {cssClass: 'alert-danger', timeout: 3000})
      return false
    }
    if(!this.validateService.validateEmail(user.email)){
      console.log('valid email, bro.')
      this.flashMessage.show('Valid email... please', {cssClass: 'alert-danger', timeout: 3000})
      return false
    }
  }
}
