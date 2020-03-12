// import {Component, OnInit} from '@angular/core';
// import {StorageService} from '../storage/storage.service';

import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {StorageService} from '../shared/storage/storage.service';

interface LoginViewModel {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public errorMessage: string;
  form: FormGroup;

  constructor(private storageService: StorageService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.storageService.watchAuthChanges()
      .subscribe((user) => {
        if (user) {
          this.router.navigate(['/sheets']);
        }
      });

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(event): void {
    this.errorMessage = null;
    event.preventDefault();
    const loginValue = this.form.value as LoginViewModel;

    this.storageService.login(loginValue.username, loginValue.password)
      .then((response) => {
        this.router.navigate(['/sheets']);
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }
}
