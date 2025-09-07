# Production Deployment Guide for Multi-Tenant System

## 1. DNS Configuration

### Option A: Wildcard DNS (Recommended)
Add this DNS record to your domain provider:

```
Type: A
Name: *.jirocash.com
Value: [Your Server IP Address]
TTL: 300
```

This will automatically handle all subdomains like:
- `dramrit.jirocash.com`
- `demo.jirocash.com`
- `test.jirocash.com`

### Option B: Individual Subdomains
If you prefer individual records:

```
Type: A
Name: dramrit.jirocash.com
Value: [Your Server IP Address]
TTL: 300

Type: A
Name: demo.jirocash.com
Value: [Your Server IP Address]
TTL: 300
```

## 2. Environment Variables

Create a `.env.local` file in your production environment:

```env
# Database
MONGODB_URI=mongodb://your-production-db-url

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Server Configuration
PORT=5000
NODE_ENV=production

# Frontend API URL (Update this for production)
NEXT_PUBLIC_API_URL=https://api.jirocash.com/api
```

## 3. Backend Deployment

1. Deploy your backend to your server
2. Ensure it's running on port 5000 (or update the port)
3. Make sure the backend is accessible at `https://api.jirocash.com`

## 4. Frontend Deployment

1. Deploy your Next.js app to your hosting provider
2. Ensure the environment variables are set correctly
3. Make sure the app is accessible at `https://jirocash.com`

## 5. SSL Certificate

Ensure you have SSL certificates for:
- `jirocash.com`
- `*.jirocash.com` (wildcard certificate)

## 6. Testing

### Test URLs:
- `https://jirocash.com` - Main site
- `https://dramrit.jirocash.com` - Subdomain site
- `https://jirocash.com/debug-subdomain` - Debug page

### Debug Steps:
1. Visit `https://jirocash.com/debug-subdomain` to check environment
2. Check browser console for middleware logs
3. Test API endpoints directly
4. Verify DNS resolution with `nslookup dramrit.jirocash.com`

## 7. Common Issues

### Issue: Subdomain shows main site
**Solution:** Check DNS configuration and ensure wildcard DNS is set up

### Issue: 500 error on subdomain
**Solution:** Check backend server is running and accessible

### Issue: API connection failed
**Solution:** Verify `NEXT_PUBLIC_API_URL` is set correctly

### Issue: Website not found
**Solution:** Ensure website is published in production database

## 8. Monitoring

Monitor these endpoints:
- `https://api.jirocash.com/api/websites/subdomain/dramrit`
- `https://jirocash.com/api/websites/subdomain/dramrit`

## 9. Database

Ensure your production database has:
- Published websites with correct subdomain values
- `isPublished: true` for websites that should be accessible

## 10. Performance

Consider:
- CDN for static assets
- Database connection pooling
- Caching for frequently accessed websites
