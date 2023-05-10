import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('admin@abc.com', [Validators.required]),
    password: new FormControl('admin', [Validators.required]),
  });
  loading = false;

  constructor(private service: AuthService, private router: Router) { }

  onSubmit() {
    this.loading = true;
    const postedData = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    };
    this.service.loginUser(postedData).subscribe(
      (response) => {
        this.loading = false;
        localStorage.setItem('token', response.token);
        this.router.navigate(['/hire-requests'])
      },
    );
  }
}
