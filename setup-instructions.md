# Google Sheets Automation Setup Guide

This guide will help you set up automatic pushing of transactions from your website to Google Sheets.

## Step 1: Set Up Your Google Sheet

1. Open your Google Sheet (or create a new one)
2. Make sure your sheet has headers in the first row:
   - Column A: **Date**
   - Column B: **Description**
   - Column C: **Amount (AED)**

## Step 2: Create the Apps Script

1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. You'll see a code editor with some default code
3. **Delete all the default code**
4. Copy the entire contents of `google-apps-script.js` 
5. Paste it into the Apps Script editor
6. Click the **Save** icon (💾) and give your project a name (e.g., "Transaction Importer")

## Step 3: Deploy as Web App

1. Click the **Deploy** button (top right) > **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Transaction Importer API" (or any name you like)
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. You may need to authorize the app:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** if you see a warning
   - Click **Go to [Your Project Name] (unsafe)**
   - Click **Allow**
7. Copy the **Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```

## Step 4: Configure Your Website

1. Open `index.html` in your code editor
2. Find this line (around line 475):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your Web app URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
   ```
4. Save the file

## Step 5: Test It!

1. Open your website
2. Upload some screenshots
3. Click "Extract Transactions"
4. Click "Push to Google Sheets"
5. Check your Google Sheet - the transactions should appear!

## Troubleshooting

### "Access denied" error
- Make sure you set "Who has access" to **Anyone** in the deployment settings
- Try redeploying the script

### Nothing happens when clicking "Push to Google Sheets"
- Check the browser console (F12) for errors
- Make sure the Web app URL is correctly pasted
- Verify the URL doesn't have any extra spaces or quotes

### Data not appearing in sheet
- Check if your sheet has the correct headers in row 1
- Try the test function in Apps Script:
  1. In Apps Script editor, select `testScript` from the function dropdown
  2. Click Run
  3. Check if a test row appears in your sheet

### Need to update the script later
- Make changes in the Apps Script editor
- Click **Deploy** > **Manage deployments**
- Click the edit icon (pencil) on your deployment
- Update the version to "New version"
- Click **Deploy**
- The URL stays the same, no need to update your website

## Security Notes

- The Web app URL is public, but only allows posting data
- No one can read your sheet data through this URL
- If you need to revoke access, go to **Deploy** > **Manage deployments** > **Archive**
- Consider adding a simple API key check if you're concerned about unauthorized use

## How It Works

1. Your website sends transaction data as JSON to the Apps Script
2. Apps Script receives the data via `doPost()` function
3. Script appends the rows to your Google Sheet
4. Returns a success/error message

The script batches all transactions in a single write operation for efficiency.
