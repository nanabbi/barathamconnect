# Bharathamatha Connect

Build a complete, fully functional, multi-page ERP portal for an NGO named "Bharathamatha Family Welfare Foundation". 
TECH STACK: React, Tailwind CSS, Shadcn UI, Lucide React (for icons), and Recharts (for dashboard charts).
OVERVIEW & BRANDING:
- Organization: Bharathamatha Family Welfare Foundation (ESTD: 1989)
- Founder & Secretary: Edaiyoor R.V. Manimaran
- HQ: 47, South Street, Thiruthuraipoondi, Thiruvarur District, Tamil Nadu - 614713.
- Primary Colors: Deep Trust Blue (#1e3a8a), Compassion Green (#10b981), and clean white/slate backgrounds.
- The UI should feel like a modern, enterprise-grade management dashboard. It must be responsive, featuring a left-side navigation sidebar and a top header with a user profile dropdown.
CORE SEED DATA (Hardcode this state into the app so it looks fully populated and production-ready):
1. Branches & Locations: 
   - Thiruthuraipoondi (HQ - Programs: Early Intervention, De-addiction Centre, Swadhar Shelter)
   - Thirukuvalai (Programs: Old Age Care Home)
   - Muthupettai (Programs: Community Based Rehabilitation)
   - Kottur (Programs: Disability Support)
2. Key Staff/Users:
   - Edaiyoor R.V. Manimaran (Founder & Secretary)
   - Mariakkannu (Chairman)
   - Vasanthakumari (Treasurer)
   - Abhijith M (System Administrator - Current User)
3. Donors List (Generate a table with this realistic mock data):
   - Ramesh Krishnan | +91-9876543210 | ramesh.k@email.com | ₹50,000 | Program: Old Age Care
   - Priya Natarajan | +91-8765432109 | priya.n@email.com | ₹25,000 | Program: Swadhar Shelter
   - TechCorp India Ltd | +91-7654321098 | csr@techcorp.in | ₹5,00,000 | Program: Disability Intervention
   - Meenakshi Sundaram | +91-6543210987 | meenakshi.s@email.com | ₹1,00,000 | Program: General Welfare
FEATURES & PAGES TO IMPLEMENT (Create a stateful sidebar to switch between these views):
1. Master Dashboard (Default View):
   - 4 KPI Cards: Total Beneficiaries (1,540), Active Donors (142), Active Branches (4), Funds Raised this Year (₹12,50,000).
   - A Bar Chart (using Recharts) showing "Beneficiaries by Program" (Old Age Care: 36, Swadhar Shelter: 150, Early Intervention: 500, De-addiction: 105).
   - A "Recent Activity" timeline feed (e.g., "New donation of ₹25,000 received", "Medical camp concluded at Muthupettai", "New volunteer registered").
2. Beneficiaries Module:
   - A data table listing beneficiaries with columns: ID, Name, Age, Branch, Enrolled Program, and Status (Active/Graduated).
   - Include a "Search Beneficiaries" text input and a "Filter by Branch" dropdown.
   - Include an "Add Beneficiary" button that opens a generic modal form (fields: Name, DOB, Branch, Program).
3. Donors & Finance Module:
   - A data table listing the donors provided in the seed data.
   - Columns: Donor Name, Phone, Email, Lifetime Contribution, Preferred Program, Action.
   - Action column should have a button: "Generate 80-G Receipt". When clicked, trigger a success toast notification saying "80-G Receipt generated successfully".
4. Branch & Staff Module:
   - A grid of cards, each representing a branch. 
   - Card details: Branch Name, Location icon, Active Programs as pill tags, and Total Beneficiaries.
   - A secondary section for "Staff Directory" listing the key staff members with their roles and generic contact placeholders.
INTERACTIVITY & UX REQUIREMENTS:
- Use smooth transitions and hover effects on all buttons, sidebar links, and table rows.
- Use Lucide React icons extensively for navigation and actions (e.g., LayoutDashboard, Users, MapPin, HeartHandshake, Settings, FileText).
- Please output ALL the necessary React code in a single cohesive, working prototype. Do not leave placeholders for component logic; write out the full mock data arrays and render the complete UI so it works flawlessly in the preview window immediately.
Yes, proceed — build the complete ERP portal with the sidebar shell, dashboard KPIs and chart, seeded data, and module views first.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://barathamconnect.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b4144b37-a89e-43d9-a6e8-77336423b501).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
