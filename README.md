# Campaign Management Application

Manage campaigns, line items, and invoices seamlessly in this powerful application.

[Visit the live application](https://campaign-management-kiki.vercel.app/)  
**Note:** The backend is hosted on Render (free tier), so the first request may incur a delay (~50 seconds). Please be patient.

---

## How to Run the Projects

This full-stack application consists of separate frontend and backend projects:

- **Frontend**: Developed using [Vite](https://vitejs.dev/) + TypeScript.
- **Backend**: Developed using [Ruby on Rails](https://rubyonrails.org/) (API-only).

### Project Structure

```
campaign-management/
├── frontend/  # Frontend project
├── backend/   # Backend project
```

---

## Prerequisites

Ensure the following tools are installed before running the project:

- **Ruby**: `3.2.x` or newer (specific to backend requirements)
- **Rails**: `8.x.x` (tested with version `8.0.0`)
- **Node.js**: `16.x` or newer (tested with version `22.11.0`)
- **npm**: Included with Node.js; ensure it’s updated.

---

## Setup and Launch

### 1. Clone the Repository

```bash
git clone https://github.com/ChiFangChen/campaign-management.git
cd campaign-management
```

### 2. Backend Setup

Navigate to the `backend` folder and run:

```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails s
```

### 3. Frontend Setup

Navigate to the `frontend` folder and run:

```bash
cd ../frontend
npm install
npm run dev
```

Access the application at `http://localhost:5173`.

---

## Features

### Core Features

- **Data Model Implementation**: Comprehensive backend data model with sample data seeding
- **View Management**:
  - Detailed list and individual views for campaigns, line items, and invoices
  - Intuitive field layouts and column organization
- **Invoice Management**: Flexible adjustment capabilities for invoice modifications

### Additional Enhancements

- Sorting and filtering on list views with subtotal rows respecting filters.
- Export functionality for invoices in **CSV** and **XLS** formats.

### Advanced Features

- Integration with external services (e.g., cloud exports).
- SEO optimization using **React Helmet Async**.
- Reporting module with interactive charts for booked vs actual data.
- Frontend pagination with virtualized rendering for long lists.
- Internationalization for multilingual support.
- setting preference for language and themes
- Splitting code to reduce the main file size

---

## Technical Architecture

### Frontend Stack

The frontend architecture leverages modern React patterns and tools for optimal performance and developer experience:

#### Core Framework & Build Tools

- **Vite + React + TypeScript**: Modern build tooling with type safety
- **React Router DOM**: Client-side routing with code splitting

#### UI/UX Layer

- **Styling**: Tailwind CSS + Styled Components
  - Atomic CSS for rapid development
  - Component-specific styling when needed
- **Component Libraries**:
  - shadcn/ui: Accessible, customizable components
  - Lucide: Scalable vector icons
  - Recharts: Responsive data visualization

#### Data Management & Performance

- **API Integration**: Axios + React Query
  - Efficient data fetching and caching
  - Automatic background updates
- **State Management**: Recoil
  - Lightweight global state handling
  - Atom-based state management
- **Performance Optimizations**:
  - React Virtual for efficient list rendering
  - Dynamic code splitting
  - Optimized bundle size

#### Developer Experience

- **Form Handling**: React Hook Form + Yup
- **Table Management**: React Table
- **Internationalization**: React-i18next
- **SEO**: React Helmet Async
- **Testing**: Vitest + UI Testing + Coverage reporting

### Backend Architecture

Ruby on Rails API-only implementation focusing on:

- RESTful API design principles
- CORS security configuration
- Comprehensive data seeding

---

## Design Decisions & Trade-offs

### Architecture Choices

1. **API-Only Backend**

   - Focused on data delivery and business logic
   - Clean separation of concerns
   - Optimized for frontend consumption

2. **Modern Frontend Stack**

   - Vite for rapid development
   - TypeScript for enhanced reliability
   - Component-based architecture for reusability

3. **Performance Optimizations**

   - Virtual scrolling for large datasets
   - Efficient state management
   - Strategic code splitting
   - React Query for smart caching

4. **Developer Experience**
   - Comprehensive testing setup
   - Type safety throughout
   - Modern tooling integration

### Future Enhancements

- Enhance test coverage
- Implement WebSocket for real-time updates
- Integrate more sophisticated reporting features

---

## Challenges and Learnings

- **Backend Development**: As a frontend developer, learning Ruby on Rails was a significant challenge but provided valuable insights into full-stack engineering.
- **Testing**: I wrote a few basic frontend tests using **Vitest** to validate component behavior. While limited, this demonstrates my initial efforts in testing.

---

## Conclusion

This project highlights my ability to adapt and learn new technologies while delivering a cohesive and functional application. It bridges frontend and backend practices to demonstrate a well-rounded skill set.
