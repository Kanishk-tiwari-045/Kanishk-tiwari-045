# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free tier available)

## Steps to Deploy

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub account
4. Select your portfolio repository

### 3. Configure Build Settings
Vercel should auto-detect Gatsby, but verify these settings:
- **Framework Preset**: Gatsby
- **Build Command**: `npm run build` (should be auto-detected)
- **Output Directory**: `public` (should be auto-detected)

### 4. Add Environment Variables
In Vercel dashboard, go to your project settings and add:
- **Name**: `GITHUB_TOKEN`
- **Value**: Your GitHub Personal Access Token (from `.env` file)

### 5. Deploy
Click "Deploy" and wait for the build to complete.

## Environment Variables Required
- `GITHUB_TOKEN`: GitHub Personal Access Token for fetching repository data

## Custom Domain (Optional)
1. Go to project settings in Vercel
2. Add your custom domain in the "Domains" section
3. Configure DNS records as instructed

## Troubleshooting
- If build fails, check the build logs in Vercel dashboard
- Ensure all dependencies are listed in `package.json`
- Make sure the GitHub token has the correct permissions

## Live URL
After successful deployment, Vercel will provide a URL like: `your-project.vercel.app`