# 🚀 START HERE - SFPMS Quick Start Guide

## ⚡ Fastest Way to Get Started

### Step 1: Navigate to Backend Directory
```bash
cd C:\SFPMS\sfpms-backend
```

### Step 2: Start Laravel Server
```bash
php artisan serve
```

### Step 3: Open Browser
Navigate to: **http://localhost:8000**

### Step 4: Login
Use these credentials:
- **Email**: `admin@sfpms.edu`
- **Password**: `admin123`

## ✅ That's It!

Your application is **already compiled and ready to use!**

---

## 🔄 If You Make Changes to Frontend Code

### For Development (Auto-Reload)

**Terminal 1 - Asset Watcher:**
```bash
cd C:\SFPMS\sfpms-backend
npm run watch
```

**Terminal 2 - Laravel Server:**
```bash
cd C:\SFPMS\sfpms-backend
php artisan serve
```

Now any changes to JavaScript or CSS files will automatically recompile!

---

## 📚 Need More Information?

- **Complete Setup Guide**: `FRONTEND_SETUP.md`
- **Architecture Guide**: `README_FRONTEND.md`
- **Migration Details**: `INTEGRATION_COMPLETE.md`
- **Success Report**: `MIGRATION_SUCCESS.md`
- **Backend Setup**: `BACKEND_SETUP.md`

---

## 🧪 Test Accounts

| Role    | Email                              | Password   | Access Level |
|---------|-----------------------------------|------------|--------------|
| Admin   | admin@sfpms.edu                   | admin123   | Full System  |
| Faculty | john.smith@sfpms.edu              | faculty123 | Faculty Portal |
| Student | alice.williams@student.sfpms.edu  | student123 | Student Portal |

---

## 🎯 What You Can Do

### As Admin
- ✅ Manage all users
- ✅ View dashboard with statistics
- ✅ Access all management sections
- ✅ Generate reports
- ✅ View audit logs

### As Faculty
- ✅ View student lists
- ✅ Manage courses
- ✅ Track attendance
- ✅ Enter grades

### As Student
- ✅ View grades
- ✅ Check schedule
- ✅ View courses
- ✅ Track attendance

---

## ⚠️ Troubleshooting

### Issue: "Page not found"
**Solution**: Make sure Laravel server is running with `php artisan serve`

### Issue: "Cannot connect to API"
**Solution**: Check that `.env` has `MIX_API_BASE_URL=http://localhost:8000/api`

### Issue: "Assets not loading"
**Solution**: Run `npm run dev` to compile assets

### Issue: "Login not working"
**Solution**: 
1. Verify database is migrated: `php artisan migrate`
2. Seed test users: `php artisan db:seed`
3. Check JWT secret is set: `php artisan jwt:secret`

---

## 🎉 You're All Set!

Your frontend is **fully integrated** into Laravel and **ready to use!**

**Run this command and open your browser:**
```bash
php artisan serve
```

---

**Need help? Check the documentation files or review the code in `resources/js/`**

