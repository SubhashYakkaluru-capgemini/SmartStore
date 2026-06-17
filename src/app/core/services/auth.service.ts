import { inject, Injectable, signal } from '@angular/core';
import { User, UserRole } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUser = signal<User | null>(null);
  private readonly isAuthenticated = signal(false);
  private readonly storageKey = 'smartstore_user';

  readonly user$ = this.currentUser.asReadonly();
  readonly isAuthenticated$ = this.isAuthenticated.asReadonly();

  constructor() {
    this.restoreSession();
  }

  private restoreSession(): void {
    const storedUser = localStorage.getItem(this.storageKey);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch {
        this.logout();
      }
    }
  }

  login(name: string, email: string, role: UserRole): User {
    const user: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      role,
      createdAt: new Date(),
    };
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    return user;
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem(this.storageKey);
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  isSalesperson(): boolean {
    return this.currentUser()?.role === 'sales';
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser()?.role === role;
  }
}
