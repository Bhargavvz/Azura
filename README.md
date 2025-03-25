# AZURA 2025 Registration System

A registration and event management system for AZURA 2025 event.

## Features

- User-friendly registration form
- Technical and Non-Technical event listings
- Payment integration via payment links
- Email notifications for registrations
- Responsive design for all devices

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Vercel account (for deployment)
- SMTP email credentials

### Local Development

1. Clone the repository
```bash
git clone https://github.com/yourusername/azura-2025.git
cd azura-2025
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
   - Copy `.env.local.example` to `.env.local`
   - Update the Supabase credentials and SMTP settings

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Email Configuration

This project uses Nodemailer to send email notifications. To set it up:

1. Create a `.env.local` file with your SMTP credentials:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

2. For Gmail users:
   - Enable 2-Step Verification on your Google account
   - Generate an App Password at [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Use this App Password as the `SMTP_PASS` value

3. Other email providers:
   - Update the SMTP settings according to your email provider's requirements

### Deployment to Vercel

1. Push your changes to a GitHub repository

2. Connect your repository to Vercel:
   - Go to [Vercel Dashboard](https://vercel.com)
   - Import your repository
   - Configure the project settings

3. Add environment variables in the Vercel project settings:
   - Add all the variables from your `.env.local` file

4. Deploy the project

## Database Schema

The application uses Supabase as the database. The main table schema is:

### Registrations Table

| Column           | Type      | Description                        |
|------------------|-----------|------------------------------------|
| id               | uuid      | Primary key                        |
| created_at       | timestamp | Creation timestamp                 |
| name             | text      | Participant name                   |
| email            | text      | Participant email                  |
| phone            | text      | Contact number                     |
| college          | text      | College/University name            |
| rollNumber       | text      | Roll/Registration number           |
| section          | text      | Class/Section                      |
| department       | text      | Department                         |
| year             | text      | Year of study                      |
| event            | text      | Selected event                     |
| teamMembers      | array     | Team members (if applicable)       |
| isCsiMember      | boolean   | CSI membership status              |
| registration_fee | integer   | Registration fee amount            |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License. 