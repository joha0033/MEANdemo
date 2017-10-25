import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
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

  constructor(private validateService: ValidateService) { }

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
      return false
    }
    if(!this.validateService.validateEmail(user.email)){
      console.log('valid email, bro.')
      return false
    }
  }
}
