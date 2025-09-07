# 🚀 Dynamic Subdomain Routing Setup

## Overview
This setup enables dynamic subdomain routing for jirocash.com where each subdomain displays a personalized page.

**Examples:**
- `amrit.jirocash.com` → Shows "Amrit"
- `rahul.jirocash.com` → Shows "Rahul"
- `john.jirocash.com` → Shows "John"

## 🛠️ Implementation Details

### 1. Middleware (`middleware.js`)
- Detects subdomain from the host header
- Routes subdomain requests to `/subdomain` page
- Supports both production (`*.jirocash.com`) and development (`*.localhost`)

### 2. Subdomain Page (`src/app/subdomain/page.js`)
- Displays the subdomain name in a beautiful UI
- Uses Next.js App Router with client-side rendering
- Responsive design with gradient background

### 3. Next.js Config (`next.config.js`)
- Configured for wildcard domain support
- Image optimization for subdomain uploads

## 🧪 Local Development Testing

### Step 1: Update Hosts File
Add these entries to your `hosts` file:

**Windows:** `C:\Windows\System32\drivers\etc\hosts`
**Mac/Linux:** `/etc/hosts`

```
127.0.0.1 amrit.localhost
127.0.0.1 rahul.localhost
127.0.0.1 john.localhost
127.0.0.1 sarah.localhost
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Test Subdomains
Open these URLs in your browser:
- `http://amrit.localhost:3000`
- `http://rahul.localhost:3000`
- `http://john.localhost:3000`

## 🌐 Production Deployment

### DNS Setup
1. Login to your domain provider (GoDaddy, Namecheap, Cloudflare, etc.)
2. Add a wildcard A record:
   ```
   Type: A
   Name: *
   Value: <your-server-ip>
   TTL: 300 (or default)
   ```

### Vercel Deployment
1. Add domain `jirocash.com` to your Vercel project
2. Add wildcard domain `*.jirocash.com`
3. Deploy your app

### Custom Server Deployment
1. Set up your server (VPS, AWS, etc.)
2. Point wildcard DNS to your server IP
3. Deploy Next.js app using PM2 or Docker
4. Configure reverse proxy (Nginx) if needed

## 🎯 Testing Production URLs
After deployment, test these URLs:
- `https://amrit.jirocash.com`
- `https://rahul.jirocash.com`
- `https://john.jirocash.com`
- `https://jirocash.com` (main site)

## 🔧 Customization

### Modify Subdomain Page
Edit `src/app/subdomain/page.js` to:
- Add user data fetching
- Customize the UI design
- Add authentication
- Include user-specific content

### Add Database Integration
```javascript
// Example: Fetch user data based on subdomain
const userData = await fetchUserBySubdomain(name);
```

### Add Authentication
```javascript
// Example: Check if user exists
if (!userData) {
  return <div>User not found</div>;
}
```

## 🐛 Troubleshooting

### Common Issues:
1. **Subdomain not working locally**: Check hosts file entries
2. **DNS not resolving**: Wait for DNS propagation (up to 48 hours)
3. **Middleware not triggering**: Check matcher configuration
4. **Page not loading**: Verify Next.js app is running

### Debug Steps:
1. Check browser network tab for requests
2. Verify middleware logs in terminal
3. Test with `curl` command:
   ```bash
   curl -H "Host: amrit.jirocash.com" http://localhost:3000
   ```

## 📝 Next Steps

1. **User Management**: Integrate with your user database
2. **Custom Pages**: Create personalized user pages
3. **Authentication**: Add login/logout functionality
4. **Analytics**: Track subdomain usage
5. **SEO**: Add meta tags for each subdomain

## 🎉 Success!
Your dynamic subdomain routing is now ready! Each subdomain will display a personalized page with the user's name.
