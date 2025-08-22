// Google Apps Script code to handle form submissions
// This should be deployed as a web app in Google Apps Script

function doPost(e) {
  try {
    // Get the active spreadsheet (make sure to replace with your spreadsheet ID)
    const SPREADSHEET_ID = '1QRoR7-YTxgOSNV5HeXJbd7LBjrZz404ctyiiHzvrBfQ'; // Replace with your actual spreadsheet ID
    const SHEET_NAME = 'orders'; // Name of the sheet tab
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      const headers = [
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Tour Name',
        'Group Size',
        'Preferred Date',
        'Total Cost',
        'Discount Applied',
        'Price Per Person',
        'Message',
        'Status'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#2d5016');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(12);
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Format timestamp
    const timestamp = new Date(data.timestamp);
    const formattedTimestamp = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    
    // Prepare row data
    const rowData = [
      formattedTimestamp,
      data.name || '',
      data.email || '',
      data.phone || 'Not provided',
      data.tourName || '',
      data.groupSize || 'Not specified',
      data.preferredDate || 'Not specified',
      data.totalCost || 'Not calculated',
      data.discount || 'No discount',
      data.pricePerPerson || 'Unknown',
      data.message || 'No additional message',
      'New' // Status column
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, rowData.length);
    
    // Send email notification (optional)
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Booking inquiry submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to submit booking inquiry: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(data) {
  try {
    // Email settings - replace with your actual email
    const NOTIFICATION_EMAIL = 'info@peakpedals.lk'; // Replace with your email
    const SUBJECT = `New Booking Inquiry - ${data.tourName}`;
    
    // Create email body
    const emailBody = `
New booking inquiry received for Peak Pedals!

Tour Details:
- Tour: ${data.tourName}
- Group Size: ${data.groupSize}
- Preferred Date: ${data.preferredDate}
- Total Cost: ${data.totalCost}
- Discount: ${data.discount}

Customer Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}

Message:
${data.message}

Submitted at: ${new Date(data.timestamp).toLocaleString()}

Please respond to the customer within 24 hours.
    `;
    
    // Send email
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: SUBJECT,
      body: emailBody
    });
    
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

// Test function to verify the script works
function testScript() {
  const testData = {
    timestamp: new Date().toISOString(),
    name: 'Test User',
    email: 'test@example.com',
    phone: '+94 77 123 4567',
    tourName: 'Idalgashinna',
    groupSize: '2 people',
    preferredDate: '2024-02-15',
    totalCost: '$190',
    discount: '5%',
    pricePerPerson: '$95',
    message: 'This is a test booking inquiry'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}