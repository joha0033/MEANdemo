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
  isEditting: Boolean;
  getPosts: Array<{content: String}>;
  gratefulPost: String;



  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ){ }

  ngOnInit() {
    this.gratefulGet()
  }

  gratefulGet(){
    let author = JSON.parse(localStorage.getItem('user'))
    // let author = {
    //   name: 'michael',
    //   post: 'jack'
    // }
    this.authService.getPosts(author.name).subscribe(posts =>{
      this.getPosts = posts.posts
    }, err => {
      console.log(err)
      return false
    })
  }


  onGratefulSubmit(){
    let author = JSON.parse(localStorage.getItem('user'))
    const post = {
      author: author.name,
      content: this.gratefulPost
    }


    //required field/length for post
    if(!this.validateService.validatePost(post)){
      this.flashMessage.show('grateful for your efforts, but fill the input field', {cssClass: 'alert-danger', timeout: 3000})
      return false
    }

    //register post with user
    this.authService.createPost(post).subscribe(data => {
      console.log('data>',data)
      this.gratefulGet()
      if(data.success){
        this.flashMessage.show('grateful for your efforts, thank you for your post', {cssClass: 'alert-success', timeout: 3000})
      }else{
        this.flashMessage.show('grateful for your efforts, but something went wrong', {cssClass: 'alert-danger', timeout: 3000})
      }
    })
    this.gratefulPost = ''
  }

  onEdit(postId){
    //coming soon!
  }

  onDelete(postId){
    this.authService.deletePost(postId).subscribe(data => {
      console.log(data)
      if(data.success){
        this.gratefulGet()
        this.flashMessage.show('grateful for your efforts, your post is deleted', {cssClass: 'alert-danger', timeout: 3000})
      }else{
        this.flashMessage.show('grateful for your efforts, your post is deleted', {cssClass: 'alert-danger', timeout: 3000})
        this.gratefulGet()
      }
    })
  }
}
