# AlmizaN v2.1 - AI-Powered Cost Analysis & Pricing Platform

AlmizaN v2.1 is a sophisticated web-based financial simulation and consulting platform designed to empower businesses with precise cost analysis, profit forecasting, and strategic decision-making capabilities. Featuring an elegant balance/scale logo and AI-powered insights, this application provides an intuitive interface for comprehensive data entry, instant financial calculations, and intelligent recommendations, making it an invaluable tool for optimizing business operations.

## Key Features

### 🏭 **Integrated Cost Calculation System**
A robust system for meticulously calculating product costs, encompassing every aspect of the supply chain and operational overhead.

### 📊 **Comprehensive Data Entry**
- **Raw Materials**: Detailed input fields for all raw material costs.
- **Packaging**: Capture expenses related to product packaging.
- **Shipping**: Account for inbound and outbound shipping costs.
- **Marketing**: Track marketing and advertising expenditures.
- **Labor**: Input labor costs, including wages and benefits.
- **Operations**: Include various operational expenses.

### ⚡ **Instant Calculations**
Real-time calculation of critical financial metrics:
- **Profit**: Determine net profit based on sales and costs.
- **Margin**: Analyze profit margins for individual products or overall operations.
- **Breakeven Points**: Identify the sales volume required to cover all costs.

### 💱 **Multi-Currency Support**
Seamlessly switch between Saudi Riyal (SAR), Egyptian Pound (EGP), and United States Dollar (USD) for flexible financial analysis.

### 🤖 **Gemini AI Integration**
Leverage Google's Gemini AI for intelligent recommendations and insights, helping users optimize pricing strategies and cost structures.

### 📈 **Interactive Charts**
Visualize financial data with dynamic and easy-to-understand charts, providing clear insights into cost breakdowns, profit trends, and more.

### 🎯 **Advanced Pricing Strategies**
Analyze competitors and determine optimal pricing strategies based on market conditions and costs.

### 📋 **Comprehensive AI Recommendations**
AI-powered recommendations that incorporate data from all tabs for informed decision-making.

### 🎨 **Modern User Interface**
Elegant and responsive design compatible with all devices, with full Arabic language support.

## Setup Instructions

To get AlmizaN v2.1 up and running on your local development environment or a production web server, follow these steps.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher (LTS recommended).
- **npm** (Node Package Manager): Usually comes bundled with Node.js.
- **Git**: For cloning the repository.
- **Web Server Environment**:
  - **Development**: Vite's built-in development server (handled by `npm run dev`).
  - **Production**: A LAMP stack (Linux, Apache, MySQL, PHP) or similar web server capable of serving static files and handling URL rewrites.

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd almizan
   ```
   *(Replace `[repository-url]` with the actual URL of your Git repository)*

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000/almizan/` (or a similar address provided in your terminal).

### Building for Production

To create a production-ready build of the application, which generates optimized static files in the `dist/` directory:

1. **Run the build command**:
   ```bash
   npm run build
   ```
   This will create a `dist/` directory in your project root, containing `index.html`, JavaScript bundles, and other static assets.

## Deployment to a Production Web Server (LAMP Stack Example)

This section outlines how to deploy the built application to a LAMP server.

### 1. Server Configuration (Apache)

For Single Page Applications (SPAs) like AlmizaN, you need to configure your web server to redirect all requests to `index.html` so that client-side routing can take over.

- **Create `.htaccess` file**:
  Inside your `dist/` directory, ensure there is a `.htaccess` file with the following content:
  ```apache
  Options -MultiViews
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ index.html [QSA,L]
  ```
  This file ensures that if a requested file or directory doesn't exist, Apache serves `index.html`, allowing your React application's router to handle the URL.

- **Enable `mod_rewrite`**:
  Ensure the `mod_rewrite` Apache module is enabled on your server. On Ubuntu/Debian, you can enable it with:
  ```bash
  sudo a2enmod rewrite
  sudo systemctl restart apache2
  ```
  On other systems, consult your Apache documentation.

- **Allow `.htaccess` overrides**:
  In your Apache virtual host configuration or `apache2.conf`, ensure that `AllowOverride All` is set for the directory where you will deploy your application. For example:
  ```apache
  <Directory /var/www/html/almizan>
      Options Indexes FollowSymLinks
      AllowOverride All
      Require all granted
  </Directory>
  ```
  Remember to restart Apache after making changes to its configuration.

### 2. Uploading Files

1. **Locate the `dist` directory**: After running `npm run build`, your production-ready files are in the `dist/` directory.
2. **Create target directory on server**: On your LAMP server, create a directory for your application within your web server's document root (e.g., `/var/www/html/almizan/`).
3. **Upload contents**: Copy **all** the contents of your local `dist/` directory (including `index.html`, the `assets/` folder, and the `.htaccess` file) to the target directory on your server (`/var/www/html/almizan/`).

  - **Using SCP (Secure Copy Protocol)**:
    ```bash
    scp -r dist/* user@your_server_ip:/var/www/html/almizan/
    ```
    *(Replace `user`, `your_server_ip`, and the path as appropriate)*

  - **Using FTP/SFTP**: Use an FTP/SFTP client (e.g., FileZilla) to connect to your server and drag-and-drop the contents of `dist/` into `/var/www/html/almizan/`.

### 3. Accessing the Application

Once deployed, your AlmizaN application should be accessible via your server's domain or IP address, followed by the application's path:

`http://your_domain_or_ip/almizan/`

## Project Structure

```
.
├── public/
├── src/
│   ├── App.tsx                    # Main application component
│   ├── components/                # UI components
│   │   ├── Header.tsx            # Application header with logo and navigation
│   │   ├── TabNavigation.tsx     # Tab navigation bar
│   │   ├── ProductTab.tsx        # Product information tab
│   │   ├── CostAnalysisTab.tsx   # Cost analysis tab
│   │   ├── EScalePricingTab.tsx  # Pricing strategy tab
│   │   ├── AIRecommendationsTab.tsx # AI recommendations tab
│   │   ├── Footer.tsx            # Application footer
│   │   └── ...                   # Other components
│   ├── context/                   # Global state management
│   ├── hooks/                     # Custom hooks
│   ├── services/                  # API and AI services
│   └── utils/                     # Helper utilities
├── index.html                     # Main HTML page
├── index.tsx                      # React entry point
├── package.json                   # Project configuration and dependencies
├── vite.config.ts                 # Vite configuration
└── README.md                      # This file
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.

## Support

For technical support or inquiries, please contact the Alwkala Digital Agency team via their website [alwkala.com](https://alwkala.com).

## Version History

- **v2.1** (Current): Comprehensive data integration, enhanced AI recommendations, improved UI
- **v2.0**: Initial release with core cost analysis and pricing features