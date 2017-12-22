import {Component, OnInit} from '@angular/core';
import {StorageService} from '../storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.storageService.startFirebaseLogin('#firebaseui-auth-container');
  }

}
