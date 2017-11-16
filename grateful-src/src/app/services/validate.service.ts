import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    console.log(user)
    if(user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined){
      return false
    }else{
      return true
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePost(post){
    console.log('validatePost hit', post)
    if (post.content != undefined){
      console.log('T validatePost hit')
      return true
    }else{
      console.log('F validatePost hit')
      return false
    }
  }
}
