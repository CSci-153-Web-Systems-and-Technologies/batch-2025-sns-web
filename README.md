# SNS (Scores Notification System)

A comprehensive web application designed for teachers to manage student records, organize classes, and securely release exam results via email notifications. Built with **Next.js 16**, **Supabase**, and **Tailwind CSS**.

## 🚀 Features

-   **Teacher Authentication:** Secure login system for authorized faculty.
-   **Dashboard:** Real-time overview of recent exams, quick actions, and system stats.
-   **Student Management:** Add, edit, and manage student profiles. Includes bulk import functionality.
-   **Class Management:** Create classes and enroll students.
-   **Result Processing:** Input scores and release exam results.
-   **Automated Emails:** Students receive branded email notifications with their results immediately upon release.
-   **Responsive Design:** Modern UI built with Tailwind CSS v4, optimized for desktop and tablet.

## 🛠️ Tech Stack

-   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & `tailwindcss-animate`
-   **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Auth)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Email:** [Nodemailer](https://nodemailer.com/) & [React Email](https://react.email/)
-   **UI Components:** Custom components built on Radix UI primitives.

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   npm, yarn, pnpm, or bun

## 📦 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/batch-2025-sns-web.git](https://github.com/your-username/batch-2025-sns-web.git)
    cd batch-2025-sns-web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your Supabase and Email credentials:

    ```env
    # Supabase Configuration
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    
    # (Optional) Service Role for Admin tasks if needed
    # SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

    # Email Configuration (Nodemailer)
    SMTP_HOST=smtp.example.com
    SMTP_PORT=587
    SMTP_USER=your_email@example.com
    SMTP_PASS=your_email_password
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project Structure

```text
├── app/                  # Next.js App Router pages and layouts
│   ├── dashboard/        # Protected dashboard routes (Students, Classes, Exams)
│   ├── forgot-password/  # Forgot password page
│   ├── login/            # Login page
│   └── globals.css       # Global styles and Tailwind directives
├── components/           # Reusable UI components
│   ├── auth/             # Login forms and buttons
│   ├── classes/          # Class management components
│   ├── dashboard/        # Widgets and sidebar
│   ├── emails/           # Email templates
│   ├── results/          # Result processing logic
│   ├── students/         # Student forms and tables
│   └── ui/               # Generic UI elements (Buttons, Inputs, Dialogs)
├── lib/                  # Utility functions (cn, etc.)
├── public/               # Static assets
└── utils/                # Supabase client/server utilities
