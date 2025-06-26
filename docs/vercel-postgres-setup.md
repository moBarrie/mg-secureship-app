# Vercel Blob Storage Setup Guide

## 1. Create a Vercel Blob Store

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to the "Storage" tab
4. Click "Create"
5. Select "Blob" (file storage)
6. Choose a name like "global-atlantic-express-blob"
7. Click "Create"

## 2. Connect Blob to Your Project

After creating the Blob store:

1. In the Blob store dashboard, click "Connect Project"
2. Select your project from the dropdown
3. Click "Connect Project"
4. Vercel will automatically add the required environment variables

## 3. Your Environment Variables

Vercel automatically adds these environment variables to your project:

- `BLOB_READ_WRITE_TOKEN`

## 4. Update Your Local Environment

Create or update your `.env.local` file. You can get the token from your Vercel Blob dashboard:

```bash
# Vercel Blob Storage (get this from your Vercel Blob dashboard)
BLOB_READ_WRITE_TOKEN="your-blob-token-here"

# Email Configuration (keep your existing values)
EMAIL_FROM="your-email@gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
```

## 5. Deploy to Vercel

The environment variables are automatically configured, so just redeploy your application.

## 6. Data Storage Structure

The application will store shipments in Blob using JSON files:

- File: `shipments/${trackingId}.json` (e.g., `shipments/GAE123456789.json`)
- Content: JSON object with shipment data including:

  - `id`, `trackingId`, `senderName`, `senderEmail`, `senderPhone`
  - `senderAddress`, `receiverName`, `receiverEmail`, `receiverPhone`
  - `receiverAddress`, `parcelDescription`, `parcelWeight`, `parcelValue`
  - `status`, `createdAt`, `updatedAt`

- File: `shipments/index.json` - List of all tracking IDs for admin dashboard

## Benefits of Vercel Blob

1. **Native Integration**: Built into Vercel, no external providers needed
2. **Simple**: Easy file-based storage for JSON data
3. **Serverless**: Automatically scales with your application
4. **Reliable**: Backed by Vercel's infrastructure
5. **Free Tier**: Generous free tier included with Vercel
6. **Fast**: Optimized for Vercel's edge network

## Troubleshooting

If you encounter issues:

1. Verify your Blob store is created in Vercel dashboard
2. Check that the `BLOB_READ_WRITE_TOKEN` environment variable is set
3. Ensure your project is connected to the Blob store
4. Check the function logs in Vercel for specific error messages
5. Test locally with the token from your Blob dashboard
