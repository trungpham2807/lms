/* 
to use cookie auth system -> have both client and server running on same domain
-> (dev mode): proxy client running on 3000, server running: 8000 
http-proxy-middleware

(production): use same domain
*/

// const express = require('express');
// const {createProxyMiddleware} = require('http-proxy-middleware')
// const dev = process.env.NODE_ENV !== "production"; 