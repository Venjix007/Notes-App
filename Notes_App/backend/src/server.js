import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  // Try multiple possible paths for static files
  const possibleStaticPaths = [
    path.join(__dirname, '../public'),  // Render deployment
    path.join(__dirname, '../../public'), // Local build
    path.join(__dirname, '../../frontend/dist'), // Direct frontend build
    path.join(__dirname, '../frontend/dist'),
    path.join(process.cwd(), 'frontend/dist'),
    path.join(process.cwd(), '../frontend/dist')
  ];

  let staticServed = false;
  
  for (const staticPath of possibleStaticPaths) {
    try {
      if (require('fs').existsSync(staticPath)) {
        console.log(`Serving static files from: ${staticPath}`);
        app.use(express.static(staticPath));
        staticServed = true;
        
        // Handle React routing, return all requests to React app
        app.get('*', (req, res) => {
          res.sendFile(path.join(staticPath, 'index.html'));
        });
        
        break;
      }
    } catch (error) {
      console.warn(`Error accessing path ${staticPath}:`, error.message);
      continue;
    }
  }
  
  if (!staticServed) {
    console.error('Could not find frontend build directory. Tried:', possibleStaticPaths);
  }
}


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
