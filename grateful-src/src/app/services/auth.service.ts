import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    //dev
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    // pro
    //  return this.http.post('/users/register', user, {headers: headers})
      .map(res => res.json())
  }


  authenticateUser(user){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // dev
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    // pro
    // return this.http.post('/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile(){

    let headers = new Headers();
    this.loadToken()
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json');
    // dev
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  getPosts(userName){
    let headers = new Headers();
    this.loadToken()
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json');
    let URL = 'http://localhost:3000/posts/' + userName
    // dev
    return this.http.get(URL, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }

  createPost(post){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/create', post, {headers: headers})
      .map(function(res){
        return res.json();
      })
  }

  deletePost(post){
    return this.http.delete('http://localhost:3000/posts/'+ post)
      .map(function(res){
        return res.json();
      })
  }

  loadToken(){
    const token = localStorage.getItem('id_token')
    this.authToken = token
  }

  loggedIn(){
    return tokenNotExpired('id_token')
  }

  logout(){
    console.log('logout hit?')
    this.authToken = null
    this.user = null
    localStorage.clear()
  }
}
