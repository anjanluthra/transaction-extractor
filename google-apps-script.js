/**
 * Google Apps Script - Transaction Extractor Integration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click the Deploy button > New deployment
 * 5. Choose type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click Deploy
 * 9. Copy the Web App URL
 * 10. Paste it into your website's GOOGLE_SCRIPT_URL variable
 */

function doPost(e) {
  try {
    let transactions;
    
    // Log what we received for debugging
    Logger.log('Received request');
    Logger.log('postData type: ' + (e.postData ? e.postData.type : 'no postData'));
    Logger.log('parameter keys: ' + Object.keys(e.parameter || {}).join(', '));
    
    // Handle both JSON POST and form POST
    if (e.postData && e.postData.contents) {
      // Try to parse as JSON first
      try {
        const data = JSON.parse(e.postData.contents);
        if (data.data) {
          transactions = data.data;
        } else {
          transactions = data;
        }
      } catch (jsonError) {
        Logger.log('JSON parse error: ' + jsonError);
        // If JSON parse fails, check form parameters
        if (e.parameter && e.parameter.data) {
          transactions = JSON.parse(e.parameter.data);
        }
      }
    } else if (e.parameter && e.parameter.data) {
      // Handle form data
      transactions = JSON.parse(e.parameter.data);
    }
    
    if (!transactions || transactions.length === 0) {
      throw new Error('No transaction data found');
    }
    
    Logger.log('Number of transactions: ' + transactions.length);
    
    // Get the specific sheet by name
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log('Spreadsheet name: ' + spreadsheet.getName());
    
    const sheet = spreadsheet.getSheetByName('MASTER - All Transactions 2026');
    
    if (!sheet) {
      // Log all available sheet names for debugging
      const allSheets = spreadsheet.getSheets();
      const sheetNames = allSheets.map(s => s.getName()).join(', ');
      Logger.log('Available sheets: ' + sheetNames);
      throw new Error('Sheet "MASTER - All Transactions 2026" not found. Available sheets: ' + sheetNames);
    }
    
    Logger.log('Found sheet: ' + sheet.getName());
    Logger.log('Last row before append: ' + sheet.getLastRow());
    
    // Prepare rows to append
    const rows = transactions.map(transaction => {
      return [
        transaction.date,
        transaction.description,
        transaction.amount
      ];
    });
    
    Logger.log('Rows to append: ' + JSON.stringify(rows));
    
    // Append all rows at once (more efficient than one by one)
    if (rows.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 3).setValues(rows);
      Logger.log('Successfully appended ' + rows.length + ' rows');
      Logger.log('Last row after append: ' + sheet.getLastRow());
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        rowsAdded: rows.length,
        message: `Successfully added ${rows.length} transactions`
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    let transactions;
    
    // Log what we received
    Logger.log('Received POST request');
    
    // Try to get data from the request body
    if (e.postData && e.postData.contents) {
      const contents = e.postData.contents;
      Logger.log('Post data contents: ' + contents);
      
      // Parse the JSON
      const parsed = JSON.parse(contents);
      
      // The data might be nested in a "data" property or be the root
      transactions = parsed.data || parsed;
    }
    
    if (!transactions || transactions.length === 0) {
      throw new Error('No transaction data found');
    }
    
    Logger.log('Number of transactions: ' + transactions.length);
    
    // Get the specific sheet by name
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('MASTER - All Transactions 2026');
    
    if (!sheet) {
      const allSheets = spreadsheet.getSheets();
      const sheetNames = allSheets.map(s => s.getName()).join(', ');
      throw new Error('Sheet not found. Available: ' + sheetNames);
    }
    
    Logger.log('Found sheet: ' + sheet.getName());
    
    // Prepare rows to append
    const rows = transactions.map(transaction => {
      return [
        transaction.date,
        transaction.description,
        transaction.amount
      ];
    });
    
    // Append all rows at once
    if (rows.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 3).setValues(rows);
      Logger.log('Successfully appended ' + rows.length + ' rows');
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        rowsAdded: rows.length,
        message: `Successfully added ${rows.length} transactions`
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        data: [
          { date: '01 January 2026', description: 'Test Transaction', amount: '-100' }
        ]
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
