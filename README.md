# Registration Form - Netlify Deployment

A responsive registration form built with HTML, CSS, and JavaScript, configured for Netlify deployment.

## Features

- Responsive design with Bootstrap 5
- Form validation with custom JavaScript
- Password strength indicator
- Netlify form handling
- Mobile-friendly interface

## Deployment Steps

1. **Push to Git Repository**
   - Create a new repository on GitHub/GitLab
   - Push your code to the repository

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Deploy settings:
     - Build command: (leave empty)
     - Publish directory: `.` (root directory)
   - Click "Deploy site"

3. **Form Configuration**
   - Your form is already configured with `data-netlify="true"`
   - Netlify will automatically detect and process form submissions
   - Check the "Forms" tab in your Netlify dashboard

## File Structure

- `index.html` - Main HTML file (entry point)
- `styles.css` - Custom CSS styles
- `script.js` - JavaScript functionality
- `netlify.toml` - Netlify configuration
- `_redirects` - URL redirects
- `_headers` - Security headers

## Troubleshooting

- Ensure `index.html` is in the root directory
- Check that all files are committed to your repository
- Verify form submissions in Netlify dashboard
- Check browser console for JavaScript errors

