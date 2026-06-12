src/app/
│
├── core/                         # Global singleton services
│   ├── services/
│   │    ├── auth.service.ts
│   │    ├── api.service.ts
│   │    ├── notification.service.ts
│   │    └── storage.service.ts
│   │
│   ├── guards/
│   │    └── auth.guard.ts
│   │
│   ├── interceptors/
│   │    └── http.interceptor.ts
│   │
│   └── models/                   # Data models (interfaces)
│        ├── user.model.ts
│        ├── product.model.ts
│        ├── sale.model.ts
│        └── order.model.ts
│
├── shared/                       # Reusable UI components
│   ├── components/
│   │    ├── header/
│   │    ├── sidebar/
│   │    ├── graph/              ✅ reusable (your component)
│   │    ├── table/
│   │    └── alert/
│   │
│   ├── pipes/
│   └── directives/
│
├── features/                    # Business modules
│
│   ├── auth/
│   │    ├── login.component.ts
│   │    ├── auth.store.ts
│   │    └── auth.routes.ts
│
│   ├── dashboard/
│   │    ├── dashboard.component.ts
│   │    ├── dashboard.store.ts
│   │    └── dashboard.service.ts
│
│   ├── employees/               ✅ Employee Management
│   │    ├── employees.component.ts
│   │    ├── add-employee.component.ts
│   │    ├── employees.store.ts
│   │    └── employees.service.ts
│
│   ├── inventory/               ✅ Product Management
│   │    ├── inventory.component.ts
│   │    ├── product-form.component.ts
│   │    ├── inventory.store.ts
│   │    └── inventory.service.ts
│
│   ├── sales/
│   │    ├── sales.component.ts
│   │    ├── billing.component.ts
│   │    ├── sales.store.ts
│   │    └── sales.service.ts
│
│   ├── orders/                  ✅ Reorder
│   │    ├── reorder.component.ts
│   │    └── orders.service.ts
│
│   ├── alerts/                  ✅ Low stock alerts
│   │    ├── alerts.component.ts
│   │    └── alerts.service.ts
│
│   ├── analytics/
│   │    ├── analytics.component.ts
│   │    └── analytics.service.ts
│
│   └── transactions/
│        ├── transactions.component.ts
│        └── transactions.service.ts
│
├── app.routes.ts                # Central routing
├── app.component.ts             # Root layout
└── main.ts