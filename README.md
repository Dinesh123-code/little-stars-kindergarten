# Little Stars Kindergarten Website

> **Internship Task Submission: Kindergarten Website Development**  
> **Technology Stack:** PHP + MySQL + HTML5 + CSS3 + JavaScript + Bootstrap/Tailwind  

---

## 🌟 Project Overview

**Little Stars Kindergarten** is a comprehensive, responsive web application and online admission enquiry portal tailored for early childhood educational institutions. The platform includes a public portal showcasing programs, activities, facilities, photo galleries, and an online admission enquiry system, coupled with a secured administrative control panel.

---

## 📁 Project Folder Structure

```
little_stars_kindergarten/
│
├── config/
│   └── db.php                     # PDO Database connection & global constants
│
├── database/
│   └── little_stars_db.sql        # Complete MySQL database export & seed data
│
├── includes/
│   ├── header.php                 # Reusable site navigation and branding
│   └── footer.php                 # Reusable footer & contact info
│
├── admin/
│   ├── login.php                  # Secure admin authentication & session start
│   ├── logout.php                 # Session termination & logout handler
│   ├── dashboard.php              # Analytics summary & quick action cards
│   ├── programs.php               # Programs CRUD (Add, View, Edit, Delete)
│   ├── admissions.php             # Admission enquiries review & status management
│   └── contacts.php               # Contact enquiries inbox & deletion
│
├── index.php                      # Home page with all required 11 sections
├── about.php                      # About Us, Vision, Mission, Leadership & Team
├── programs.php                   # Dynamic classes loaded from MySQL (Play Group, Nursery, LKG, UKG)
├── activities.php                 # Learning activities & daily schedule routine
├── facilities.php                 # Campus facilities & child safety highlights
├── gallery.php                    # Filterable photo gallery
├── admissions.php                 # Online Admission Enquiry Form with server-side validation
├── contact.php                    # Contact form with database persistence & campus map
└── README.md                      # Setup and installation documentation
```

---

## ⚙️ Installation & Setup Instructions

### Prerequisites
* **Local Web Server:** [XAMPP](https://www.apachefriends.org/), [WAMP](https://www.wampserver.com/), or LAMP stack with:
  * PHP 7.4 or PHP 8.0+
  * MySQL 5.7+ / MariaDB 10.3+
  * Apache Web Server with `mod_rewrite` enabled

---

### Step 1: Clone or Copy Source Code
1. Download or extract the project folder into your web server's root directory:
   * **For XAMPP on Windows:** `C:/xampp/htdocs/little_stars_kindergarten/`
   * **For WAMP on Windows:** `C:/wamp64/www/little_stars_kindergarten/`
   * **For Linux (LAMP):** `/var/www/html/little_stars_kindergarten/`

---

### Step 2: Import the MySQL Database
1. Start **Apache** and **MySQL** services from your XAMPP/WAMP Control Panel.
2. Open your web browser and navigate to `http://localhost/phpmyadmin/`.
3. Click on the **"Databases"** tab and create a new database named:
   ```sql
   little_stars_db
   ```
   *(Collation: `utf8mb4_unicode_ci`)*
4. Select the newly created `little_stars_db` database in the left sidebar.
5. Click on the **"Import"** tab at the top.
6. Click **"Choose File"** and browse to:
   ```
   database/little_stars_db.sql
   ```
7. Click the **"Go"** or **"Import"** button at the bottom.
8. Verify that all 4 tables are created:
   * `admin_users`
   * `programs`
   * `admission_enquiries`
   * `contact_enquiries`

---

### Step 3: Configure Database Connection
Open `config/db.php` in your text editor and ensure the database credentials match your local MySQL settings:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');      // Default username in XAMPP
define('DB_PASS', '');          // Default password in XAMPP (blank)
define('DB_NAME', 'little_stars_db');
```

---

### Step 4: Run the Application
1. Open your browser and visit:
   ```
   http://localhost/little_stars_kindergarten/
   ```
2. Access the Administrator Portal at:
   ```
   http://localhost/little_stars_kindergarten/admin/login.php
   ```

---

## 🔐 Default Admin Credentials

| Credential | Value |
|---|---|
| **Username** | `admin` |
| **Password** | `admin123` |
| **Role** | Super Administrator |

*(Passwords are verified securely using PHP `password_verify` with BCRYPT hashing)*

---

## 🗄️ Database Tables Schema

### 1. `admin_users`
* `id` (INT, Primary Key, Auto Increment)
* `username` (VARCHAR(50), Unique)
* `password_hash` (VARCHAR(255))
* `name` (VARCHAR(100))
* `email` (VARCHAR(100))
* `role` (VARCHAR(30))
* `created_at` (TIMESTAMP)

### 2. `programs`
* `id` (INT, Primary Key, Auto Increment)
* `name` (VARCHAR(100))
* `slug` (VARCHAR(100), Unique)
* `age_group` (VARCHAR(50))
* `timings` (VARCHAR(100))
* `student_ratio` (VARCHAR(50))
* `description` (TEXT)
* `activities` (TEXT)
* `image_url` (VARCHAR(500))
* `is_active` (TINYINT(1))
* `created_at` (TIMESTAMP)
* `updated_at` (TIMESTAMP)

### 3. `admission_enquiries`
* `id` (INT, Primary Key, Auto Increment)
* `reference_no` (VARCHAR(30), Unique)
* `child_name` (VARCHAR(100))
* `parent_name` (VARCHAR(100))
* `phone` (VARCHAR(25))
* `email` (VARCHAR(100))
* `dob` (DATE)
* `applying_class` (VARCHAR(50))
* `message` (TEXT)
* `status` (ENUM: Pending, Contacted, Admitted, Rejected)
* `created_at` (TIMESTAMP)

### 4. `contact_enquiries`
* `id` (INT, Primary Key, Auto Increment)
* `name` (VARCHAR(100))
* `email` (VARCHAR(100))
* `phone` (VARCHAR(25))
* `message` (TEXT)
* `is_read` (TINYINT(1))
* `created_at` (TIMESTAMP)

---

## 🛡️ Security & Best Practices
* **PDO Prepared Statements:** Every database query uses parameter binding (`$stmt->prepare()` and `$stmt->execute()`) to eliminate SQL Injection risks.
* **Input Sanitization:** Server-side `htmlspecialchars()`, `trim()`, and `filter_var()` validation.
* **Session Security:** Native PHP Sessions with authentication guards on all `/admin/*` routes.
* **Form Validation:** Both browser-level client checks and robust server-side PHP regex/empty validation.
