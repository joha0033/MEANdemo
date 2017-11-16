import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  gratefulPost: String;
  content: String;
  // gratefulPost: Object


  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ){ }

  ngOnInit() {
  }


  onGratefulSubmit(){
    console.log('hit the onGratefulSubmit ')
    console.log(this.gratefulPost)

    const post = {
      content: this.gratefulPost
    }

    //required field/length for post
    if(!this.validateService.validatePost(post)){
      this.flashMessage.show('grateful for your efforts, but fill the input field', {cssClass: 'alert-danger', timeout: 3000})
      console.log('post>', post)
      console.log('fill field')
      return false
    }

    //register post with user
    this.authService.userPost(post).subscribe(data => {
      console.log('data>',data)
      if(data.success){
        this.flashMessage.show('grateful for your efforts, thank you for your post', {cssClass: 'alert-success', timeout: 3000})
        this.router.navigate(['/profile'])
      }else{
        this.flashMessage.show('grateful for your efforts, but something went wrong', {cssClass: 'alert-danger', timeout: 3000})

      }
    })

  }
}
