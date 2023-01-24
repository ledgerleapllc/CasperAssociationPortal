<p align="center">
	<img src="https://docs.casperlabs.io/icon/Casper_Wordmark_Red_RGB.png" width="400">
</p>

# Casper Association Portal WebApp

The Casper Association's member portal.

This is the frontend repo of the portal. To see the frontend repo, visit https://github.com/ledgerleapllc/CasperAssociationPortalBackend

## Prerequisites

 - Vue3/Vite v3.0.1+
 - NodeJS version v18+
 - NPM 7.20.3+
 - Yarn 1.22.15+
 - Git Version 2+

You can find documentation on Vue3 here https://vuejs.org/guide/introduction.html

You can find documentation on NodeJS here https://github.com/nodejs/help

Frontend tooling documentation for Vite can be found here https://vitejs.dev/guide/

## Setup

Testing done on AWS EC2 medium instance running Ubuntu 20.

Always a good idea to update fresh servers.

```bash
sudo apt-get update
```

### Apache
```bash
sudo apt -y install apache2
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod ssl
sudo apt-get update
```

### Nodejs
```bash
curl -sL https://deb.nodesource.com/setup_18.x | sudo bash -
sudo apt install nodejs -y
```

### Yarn
```bash
curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
```

## Setup vhosts

**Note:** Using example drectory **/var/www/CasperAssociationPortal/** to point Apache servers.

Updated frontend vhost
```
<VirtualHost *:80>
    ServerName members.casper.network
    DocumentRoot /var/www/CasperAssociationPortal/dist

    <Directory /var/www/CasperAssociationPortal/dist>
        Options -MultiViews
        AllowOverride All
        Require all granted
    </Directory>

    <Directory /var/www/CasperAssociationPortal/dist/>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteCond %{REQUEST_FILENAME} !-l
        RewriteRule . /index.html [L]
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

### ENV
```bash
cp .env.example .env
```

Edit the variables inside .env to your specs.

## Build
```bash
yarn install
yarn build
```

### Testing

Instead of building to production, you can opt to spin up a development app instance using:

```bash
yarn dev
```

This mode will push real time code updates to the browser. Defaults to localhost, port 5174.
