# How to Add Claude API Key

To make the transaction extractor actually read your banking screenshots, you need a Claude API key.

## Step 1: Get a Claude API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Go to "API Keys" in the left sidebar
4. Click "Create Key"
5. Give it a name (e.g., "Transaction Extractor")
6. Copy the API key (it starts with `sk-ant-...`)

## Step 2: Add the API Key to Your Website

1. Open `index.html` in your text editor
2. Find this line (around line 481):
   ```javascript
   'x-api-key': 'YOUR_CLAUDE_API_KEY_HERE',
   ```
3. Replace `YOUR_CLAUDE_API_KEY_HERE` with your actual API key:
   ```javascript
   'x-api-key': 'sk-ant-api03-...',
   ```
4. Save the file

## Step 3: Test It!

1. Open the updated `index.html` in your browser
2. Upload a real banking screenshot
3. Click "Extract Transactions"
4. Wait a few seconds while Claude reads the image
5. Your actual transactions should appear in the table!

## Pricing

Claude API charges per image processed:
- **Claude Sonnet 4**: ~$0.01-0.05 per banking screenshot
- Much cheaper than manual data entry!
- You only pay for what you use

## Security Notes

⚠️ **IMPORTANT**: Your API key gives access to your Claude account.

**For personal use (current setup):**
- Your API key is in the HTML file
- Anyone who sees your HTML file can see your key
- This is OK for personal use on your computer
- **DON'T** share the HTML file with others

**For deployment (Vercel/production):**
- You should move the API key to a backend server
- Or use environment variables
- This keeps your key private

For now, just use it locally on your computer and you'll be fine!

## Troubleshooting

**"API key not found" error:**
- Make sure you replaced `YOUR_CLAUDE_API_KEY_HERE` with your actual key
- Make sure the key has no extra spaces or quotes

**"Rate limit exceeded" error:**
- You're processing too many images too fast
- Wait a minute and try again
- Or upgrade your API plan

**Images not processing:**
- Check browser console (F12) for errors
- Make sure the API key is correct
- Make sure you have credits in your Claude account

## Next Steps

Once you've added your API key, the website will:
1. Actually read your banking screenshots
2. Extract real transaction data
3. Format it properly
4. Push it to your Google Sheet

No more mock data - it will be 100% real! 🎉
