# Google Sheets Integration Setup Guide

## Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Peak Pedals Booking Inquiries"
4. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789JKL/edit`
   - The ID is: `1ABC123DEF456GHI789JKL`

## Step 2: Set up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the code from `google-apps-script.js`
4. Update the following variables in the script:
   - `SPREADSHEET_ID`: Replace with your actual spreadsheet ID
   - `NOTIFICATION_EMAIL`: Replace with your email address

## Step 3: Deploy the Script as a Web App

1. In Google Apps Script, click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following settings:
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Copy the web app URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

## Step 4: Update the React Code

1. In `src/pages/TourDetails.tsx`, find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
2. Replace `YOUR_SCRIPT_ID` with your actual script ID from step 3

## Step 5: Test the Integration

1. Submit a test booking inquiry through your website
2. Check your Google Sheet to see if the data appears
3. Check your email for the notification

## Data Structure

The Google Sheet will contain the following columns:
- Timestamp
- Name
- Email
- Phone
- Tour Name
- Group Size
- Preferred Date
- Total Cost
- Discount Applied
- Price Per Person
- Message
- Status

## Troubleshooting

### Common Issues:

1. **CORS Errors**: The script uses `mode: 'no-cors'` which is required for Google Apps Script
2. **Permission Errors**: Make sure the script has permission to access your spreadsheet
3. **Email Not Sending**: Check that the notification email address is correct

### Testing the Script:

You can test the Google Apps Script directly:
1. In the script editor, run the `testScript()` function
2. Check if test data appears in your spreadsheet
3. Verify email notifications are working

## Security Notes

- The web app is set to "Anyone" access, but it only accepts POST requests with specific data
- Consider adding additional validation in the script if needed
- The spreadsheet should be private and only accessible to authorized users

## Customization

You can customize:
- Email notification content
- Spreadsheet column structure
- Data validation rules
- Automatic responses to customers