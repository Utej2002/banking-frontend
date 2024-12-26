import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-customer-auth',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './customer-auth.component.html',
  styleUrl: './customer-auth.component.css'
})
export class CustomerAuthComponent {
 
  view: 'login' | 'register' | 'forgot-username' | 'reset-password' = 'login';
 
  loginData = { username: '', password: '' };
  registerData = { username: '', email: '', accountNo: '', authPin: '', loginPassword: '', transactionPassword: '' };
  forgotUsernameData = { authPin: '' };
  resetPasswordData = { authPin: '', newPassword: '' };
 
  constructor(private authService: AuthService, private router: Router) {}
 
  setView(view: 'login' | 'register' | 'forgot-username' | 'reset-password') {
    this.view = view;
  }
 
  onLogin() {
    this.authService.login(this.loginData).subscribe(
      (response: string) => {
        alert(response);
        localStorage.setItem('username', this.loginData.username); // Store username
        this.router.navigate(['/details']);
      },
      error => {
        this.handleError(error);
      }
    );
  }
 
  onRegister() {
    this.authService.register(this.registerData).subscribe(
      (response: string) => {
        alert(response);
        this.setView('login');
      },
      error => {
        this.handleError(error);
      }
    );
  }
 
  onForgotUsername() {
    this.authService.forgotUsername(this.forgotUsernameData).subscribe(
      (response: string) => {
        alert(response);
        this.setView('login');
      },
      error => {
        this.handleError(error);
      }
    );
  }
 
  onResetPassword() {
    this.authService.resetLoginPassword(this.resetPasswordData).subscribe(
      (response: string) => {
        alert(response);
        this.setView('login');
      },
      error => {
        this.handleError(error);
      }
    );
  }
 
  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && typeof error.error === 'string') {
      errorMessage = error.error;
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.status && error.statusText) {
      errorMessage = `Error ${error.status}: ${error.statusText}`;
    }
    alert(errorMessage);
  }
}
 
 