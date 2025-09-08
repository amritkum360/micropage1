# Vercel Custom Domain Integration Guide

This guide explains how to set up automatic custom domain management with Vercel for your micropage application.

## Overview

When users add custom domains through the frontend dashboard, they will now be automatically added to your Vercel project. This eliminates the need for manual domain management.

## Prerequisites

1. A Vercel account with a deployed project
2. Vercel API token
3. Your Vercel project ID

## Setup Instructions

### 1. Get Your Vercel API Token

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your profile picture → Settings
3. Go to "Tokens" tab
4. Click "Create Token"
5. Give it a name (e.g., "Micropage Domain Management")
6. Set expiration (recommended: 1 year)
7. Copy the generated token

### 2. Get Your Project ID

1. Go to your project in Vercel Dashboard
2. Go to Settings → General
3. Copy the "Project ID" from the project details

### 3. Configure Environment Variables

Add these variables to your `.env` file:

```env
# Vercel Configuration
VERCEL_API_TOKEN=your_vercel_api_token_here
VERCEL_PROJECT_ID=your_vercel_project_id_here
# VERCEL_TEAM_ID=your_vercel_team_id_here  # Optional, only if using team account
```

### 4. Deploy Your Changes

Make sure to deploy your updated backend with the new environment variables.

## How It Works

### Automatic Domain Addition

When a user adds a custom domain through the dashboard:

1. The domain is saved to your database
2. The domain is automatically added to your Vercel project
3. Vercel provides DNS configuration instructions
4. The user can configure their DNS settings

### Domain Verification

The system will:
- Check domain verification status
- Provide DNS configuration details
- Show verification progress in the dashboard

### Automatic Domain Removal

When a user removes a custom domain:
1. The domain is removed from your database
2. The domain is automatically removed from your Vercel project

## API Endpoints

The integration adds these new API endpoints:

### Check Vercel Configuration
```
GET /api/vercel/config
```

### Get All Vercel Domains
```
GET /api/vercel/domains
```

### Get Domain Status
```
GET /api/vercel/domains/:domain/status
```

### Manually Add Domain (Admin)
```
POST /api/vercel/domains
Body: { "domain": "example.com" }
```

### Manually Remove Domain (Admin)
```
DELETE /api/vercel/domains
Body: { "domain": "example.com" }
```

## Frontend Integration

The `VercelDomainStatus` component shows:
- Domain verification status
- DNS configuration instructions
- Verification progress
- Error messages if verification fails

## Error Handling

The system is designed to be resilient:
- If Vercel API fails, the domain is still saved to your database
- Users get clear error messages
- Manual retry options are available
- Logs are provided for debugging

## Testing

### Test Vercel Configuration
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/vercel/config
```

### Test Domain Addition
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"domain": "test.example.com"}' \
  http://localhost:5000/api/vercel/domains
```

## Troubleshooting

### Common Issues

1. **"Vercel service not configured"**
   - Check that `VERCEL_API_TOKEN` and `VERCEL_PROJECT_ID` are set
   - Verify the token has the correct permissions

2. **"Failed to add domain to Vercel"**
   - Check if the domain is already added to another Vercel project
   - Verify the domain format is correct
   - Check Vercel API rate limits

3. **Domain verification fails**
   - Ensure DNS records are correctly configured
   - Wait for DNS propagation (can take up to 48 hours)
   - Check domain provider settings

### Debug Commands

Check Vercel configuration:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/vercel/config
```

List all domains:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/vercel/domains
```

## Security Considerations

1. **API Token Security**
   - Store tokens securely in environment variables
   - Use different tokens for different environments
   - Rotate tokens regularly

2. **Rate Limiting**
   - Vercel API has rate limits
   - The system includes error handling for rate limits
   - Consider implementing retry logic for production

3. **Domain Validation**
   - The system validates domain format
   - Prevents duplicate domain assignments
   - Checks for existing domains

## Production Deployment

1. Set environment variables in your production environment
2. Test with a sample domain
3. Monitor logs for any issues
4. Set up alerts for Vercel API failures

## Support

If you encounter issues:
1. Check the logs for detailed error messages
2. Verify your Vercel configuration
3. Test with the debug endpoints
4. Check Vercel's API documentation for updates

## Future Enhancements

Potential improvements:
- Bulk domain management
- Domain transfer between projects
- Advanced DNS configuration
- Domain analytics integration
- Automated SSL certificate management
