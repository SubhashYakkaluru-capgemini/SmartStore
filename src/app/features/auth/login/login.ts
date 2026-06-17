import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  name = signal('');
  email = signal('');
  selectedRole = signal<UserRole | ''>('');

  // ✅ Name validation (required + min length)
  isNameValid(): boolean {
    const name = this.name().trim();
    return name.length >= 3;
  }

  // ✅ Email validation (regex)
  isEmailValid(): boolean {
    const email = this.email().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleLogin(): void {
    const name = this.name();
    const email = this.email();
    const role = this.selectedRole() as UserRole;

    if (!this.isFormValid()) {
      return;
    }

    this.authService.login(name, email, role);
    this.router.navigate(['/dashboard']);
  }

  isFormValid(): boolean {
    return this.isNameValid() && this.isEmailValid() && !!this.selectedRole();
  }
}
