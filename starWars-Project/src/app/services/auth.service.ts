import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { NgZone } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class AuthService {


constructor(private zone: NgZone) { }

getAuth(): Auth {
  return getAuth();
}

register(user: User){
  return this.zone.run(() =>
    createUserWithEmailAndPassword(this.getAuth(), user.email, user.password));
}

logIn(user:User){
  return this.zone.run(() => signInWithEmailAndPassword(this.getAuth(), user.email, user.password));
}

logInGoogle(){
    return this.zone.run(() => signInWithPopup(this.getAuth(), new GoogleAuthProvider()));
  }


logOut(){
  return this.zone.run(() => signOut(this.getAuth()));
}

isAuthenticated(): boolean {
  const user = this.getAuth().currentUser;
  return user !== null;
}

}

