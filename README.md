<p align="center">
	<img src="https://caspermember.com/images/logo.png" width="400">
</p>

# Casper Association Member Portal

The Casper Association's member portal.

This is the frontend repo of the portal. To see the frontend repo, visit https://github.com/ledgerleapllc/CasperAssociationPortalBackend

## Prerequisites

 - NextJS/Vercel, and NodeJS version 14+ v16.6.2+
 - NPM 7.20.3+
 - Yarn 1.22.15+

You can find documentation on NextJS here https://github.com/vercel/next.js/

You can find documentation on NodeJS here https://github.com/nodejs/help

## Setup

First we need a server to use. Apache/Nginx

```bash
sudo apt -y install apache2
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod ssl
sudo apt-get update
```

Setup the repo according to our VHOST path. Note, the actual VHOST path in this case should be set to **/var/www/CasperAssociationPortalfrontend/out**

```bash
cd /var/www/
git clone https://github.com/ledgerleapllc/CasperAssociationPortalfrontend
cd CasperAssociationPortalfrontend
```

You will need to add the following code to your server configuration under the VHOST path.

```
RewriteEngine On
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]
```

Install packages and setup environment. You will need to modify **.env.production** variables to fit the server on which you're deploying.

```bash
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt install nodejs -y
curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
yarn build
yarn install
```

The above commands will build **out/** on site using the variables from your .env.production file.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
