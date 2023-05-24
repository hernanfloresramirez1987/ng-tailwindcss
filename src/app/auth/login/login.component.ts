import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginInterface } from '../models/login.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent implements OnDestroy {
  fg: FormGroup;
  dats!: LoginInterface;
  isLog: boolean = false;
  private authServ = inject(AuthService);
  private router = inject(Router);
  private userServiceSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder) {
    this.fg = this.formBuild();
    this.onChangeForm();
  }
  formBuild(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]
    });
  }
  onChangeForm(): void {
    this.fg.valueChanges
      .subscribe(() => {
        this.dats = {
          Username: this.fg.value.username,
          Password: this.fg.value.password,
          DeviceId: 'desde mi'
        }
    })
  }
  login() {
    if(this.fg.valid) {
      this.userServiceSubscription = this.authServ.login(this.dats)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['home'])
        //this.isLog = this.authServ.signalIsLogIn();
      });
    } else {
      this.fg.markAllAsTouched();
    }
  }


  ngOnDestroy(): void {
    this.userServiceSubscription?.unsubscribe();
  }
}
