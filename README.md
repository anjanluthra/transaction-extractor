# Transaction Extractor

A simple web app to convert banking app screenshots into CSV format for easy import into spreadsheets.

## Features

- 📸 Drag & drop or click to upload screenshots
- 🎨 Modern, animated UI with financial-tech aesthetic
- 📋 One-click copy to clipboard
- 📱 Fully responsive design
- 🚀 Zero dependencies - pure HTML/CSS/JS

## Quick Start

1. Open `index.html` in your browser
2. Upload your banking app screenshots
3. Click "Extract Transactions"
4. Copy the CSV output and paste into your Google Sheet

## Deploying to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy via Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - **IMPORTANT**: Add environment variable:
     - Key: `CLAUDE_API_KEY`
     - Value: `YOUR_API_KEY_HERE`
   - Click "Deploy"
   - Done! Your site will be live at `your-project-name.vercel.app`

### Option 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Set up environment variable:**
   Create a `.env` file:
   ```
   CLAUDE_API_KEY=YOUR_API_KEY_HERE
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
4. Follow the prompts, and your site will be deployed!

## How to Integrate Real OCR

Currently, the app uses mock data. To add real image processing:

### Option 1: Tesseract.js (Client-side)
```html
<script src='https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js'></script>
```

### Option 2: Claude API (Recommended for accuracy)
```javascript
async function processWithClaude(imageBase64) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'YOUR_API_KEY',
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{
                role: 'user',
                content: [
                    {
                        type: 'image',
                        source: {
                            type: 'base64',
                            media_type: 'image/jpeg',
                            data: imageBase64
                        }
                    },
                    {
                        type: 'text',
                        text: 'Extract all transactions from this banking screenshot and format as CSV: Date,Description,Amount (AED)'
                    }
                ]
            }]
        })
    });
    return await response.json();
}
```

### Option 3: Google Cloud Vision API

## Project Structure

```
transaction-extractor/
├── index.html          # Main app file (all-in-one)
├── README.md           # This file
└── vercel.json         # Optional Vercel configuration
```

## Customization

All styles are in the `<style>` tag. Key CSS variables:
- `--primary`: Main accent color (#00ff88)
- `--accent`: Secondary accent (#ff0055)
- `--dark`: Background color (#0a0e1a)

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge).

## License

MIT
