# webserver
A simple webserver with virtualhost support written in JavaScript (NodeJS)



## How to install?

First of all, check if NodeJS is installed. Then put the server.js file in any directory of your choice. In the examples underneath it is placed inside a file called `server` and `/var/www`. Then type `node c:/server/server.js` for Windows or `node /var/www/server.js` for Linux and the webserver should be running.

___

## How to use?

### Initialization

Because this server only works with virtual hosts, you have to create one. This is as simple as creating a directory in the same one as **server.js** with the name of your domain. So if you are using it just on your local machine, call the virtual host `localhost`, otherwise you will get forwarded to the 404 page. If you have a domain like **example.com** call the virtual host/directory **example.com** so you will get something like `c:/server/example.com` or `/var/www/example.com`. Don't forget to do the same thing when you have a **www.** subdomain like **www.example.com**. In a future release this may get fixed, so you only have to make one virtual host for **www** and **example.com**.


### Custom 404 Page

For a custom 404 page, just create an html file called 404.html inside the root directory of the server application.
If you don't want to call your error 404 page 404.html, you can change it by changing the value of the variable `fof` in line **7**



