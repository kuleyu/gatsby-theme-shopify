# Gatsby Theme Shopify
See the live [demo](url)
## Installation
To use this theme in your Gatsby sites, just follow these instructions:
1.  Install theme
  ```sh
    npm install @plukke/gatsby-theme-shopify
  ```
or
```sh
    yarn add @plukke/gatsby-theme-shopify
```
    
2.  Add the theme to your gatsby-config.js
    ```diff
    module.exports = {
        plugins: [
            { 
            resolve: 'gatsby-theme-shopify',
            options: {
              shopName: "graphql", // Required
              accessToken: 'dd4d4dc146542ba7763305d71d1b3d38',  // Required
              imagesPath: 'src/images', // Required
              contentPath: 'data', // Required
              email: '',
              socialMedia: {
                facebook: '',
                instagram: '',
                twitter: ''
              },
              apiData: {
                url: '',
                baseURL: '',
                auth: {
                  username: '',
                  password: ''
                }
              }
            }
          }
        ]
    }
    ```

3.  Create you data for each section of the pages, in the case of the header image it is necessary that you named "logo".
    ```sh
        data 
            - sections.json
                [
                    {
                		"id": "1",
                		"path": "/",
                		"title": "",
                		"description": ""
                    }
                ]
    ```
4.  Start the demo site.
    ```sh
    gatsby develop
    ```
# Features
    - Index products in alogolia for search
    - More Customaizable pages
    - Add pages dinamically
    
    The demo will start at http://localhost:8000

