# Custom Domain Feature Guide

## Overview
The custom domain feature allows users to connect their own domains (like `example.com`) to their websites built on your platform. This provides a professional, branded experience for your users.

## How It Works

### 1. User Experience
1. User creates a website on your platform
2. User adds their custom domain in the dashboard
3. User configures DNS settings
4. User's website becomes accessible via their custom domain

### 2. Technical Flow
1. **Middleware Detection**: When someone visits a custom domain, the middleware detects it's not a subdomain of your main domain
2. **Route Rewriting**: The request is rewritten to `/custom-domain/[domain]`
3. **API Lookup**: The system looks up the website by custom domain
4. **Website Display**: The website is displayed using the same template system

## Implementation Details

### Frontend Components
- **CustomDomainManager**: Component for managing custom domains in the dashboard
- **Custom Domain Page**: Displays websites accessed via custom domains
- **API Routes**: Handle custom domain management

### Backend Components
- **Custom Domain API**: Endpoints for setting/removing custom domains
- **Domain Lookup**: Finds websites by custom domain
- **Validation**: Ensures domain uniqueness and format

### Database Schema
Websites now include a `customDomain` field:
```javascript
{
  data: {
    subdomain: "username",
    customDomain: "example.com", // New field
    // ... other website data
  }
}
```

## DNS Configuration

### For Users
Users need to add an A record pointing to your server:
```
Type: A
Name: @ (or their domain)
Value: [Your Server IP Address]
TTL: 300
```

### For Your Server
You need to:
1. Configure your server to accept requests for any domain
2. Ensure SSL certificates cover custom domains (wildcard or individual)
3. Set up proper DNS resolution

## Testing

### Local Testing
1. Add test domains to your hosts file:
   ```
   127.0.0.1 example.local
   127.0.0.1 test.local
   ```

2. Test the custom domain functionality:
   - Visit `http://example.local:3000`
   - Should show the website for that domain

### Production Testing
1. Set up a test domain
2. Configure DNS to point to your server
3. Test the full flow

## Security Considerations

1. **Domain Validation**: Validate domain format and prevent conflicts
2. **User Authorization**: Ensure users can only manage their own domains
3. **Rate Limiting**: Prevent abuse of domain management endpoints
4. **SSL**: Ensure HTTPS works for custom domains

## Usage Examples

### Adding a Custom Domain
```javascript
// User adds custom domain via dashboard
const response = await fetch('/api/websites/website-id/custom-domain', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ customDomain: 'example.com' })
});
```

### Accessing via Custom Domain
```
User visits: https://example.com
Middleware detects: custom domain
Rewrites to: /custom-domain/example.com
API looks up: website with customDomain: 'example.com'
Displays: user's website
```

## Benefits

1. **Professional Branding**: Users can use their own domains
2. **SEO Benefits**: Custom domains are better for SEO
3. **User Trust**: Users trust their own domains more
4. **Flexibility**: Users can switch domains or use multiple domains

## Future Enhancements

1. **Domain Verification**: Verify domain ownership before allowing use
2. **SSL Management**: Automatic SSL certificate provisioning
3. **Subdomain Support**: Allow users to use subdomains of their custom domains
4. **Domain Analytics**: Track traffic and performance for custom domains
5. **Bulk Domain Management**: Allow multiple domains per website

## Troubleshooting

### Common Issues
1. **DNS Not Propagated**: Wait for DNS propagation (up to 48 hours)
2. **SSL Issues**: Ensure SSL certificates cover custom domains
3. **Domain Conflicts**: Check for duplicate domain usage
4. **Server Configuration**: Ensure server accepts requests for any domain

### Debug Tools
- Use the debug page: `/debug-subdomain`
- Check middleware logs
- Test API endpoints directly
- Verify DNS resolution

## Integration with Existing Features

The custom domain feature works seamlessly with:
- **Subdomain System**: Both subdomains and custom domains work together
- **Website Templates**: Same template system for all domains
- **User Dashboard**: Integrated domain management
- **Publishing System**: Custom domains work with published websites
