import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import "dotenv/config";

const PORT = 8080;
const apiBaseURL = process.env.API_PROXY_URL;
 
const app = express();

app.get("/", (req, res, next) => {
  if (req.header("Referer")) {
    next();
  } else {
    res.redirect("/iframe-parent.html");
  }
});

// Logging
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode}`);
  });
  next();
});

// Set up reverse proxy for backend
app.use('/api', createProxyMiddleware({
  target: apiBaseURL,
  changeOrigin: true,
  secure : ! process.env.API_PROXY_INSECURE
}));

// Serve static files of frontend
app.use(express.static(path.join(__dirname, '../server/public')));


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
