import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class Employees {
  private readonly employeeService = inject(EmployeeService);
  private readonly authService = inject(AuthService);

  readonly employees = this.employeeService.employees$;
  readonly employeeCount = this.employeeService.employeeCount;

  showForm = signal(false);
  editingId = signal<string | null>(null);
  formData = signal({
    name: '',
    email: '',
    department: '',
    salary: 0,
  });

  isFormValid = computed(() => {
    const form = this.formData();
    return form.name && form.email && form.department && form.salary > 0;
  });

  isAdmin = computed(() => this.authService.isAdmin());

  saveEmployee(): void {
    if (!this.isFormValid()) return;

    const data = this.formData();
    if (this.editingId()) {
      this.employeeService.updateEmployee(this.editingId()!, {
        name: data.name,
        email: data.email,
        department: data.department,
        salary: data.salary,
      } as any);
    } else {
      this.employeeService.addEmployee({
        name: data.name,
        email: data.email,
        department: data.department,
        salary: data.salary,
      } as any);
    }

    this.resetForm();
  }

  editEmployee(id: string): void {
    const employee = this.employeeService.getEmployee(id);
    if (!employee) return;

    this.formData.set({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      salary: employee.salary,
    });
    this.editingId.set(id);
    this.showForm.set(true);
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
    }
  }

  toggleForm(): void {
    this.showForm.update(v => !v);
    if (!this.showForm()) {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.formData.set({
      name: '',
      email: '',
      department: '',
      salary: 0,
    });
    this.editingId.set(null);
    this.showForm.set(false);
  }
}
