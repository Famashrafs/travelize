const express = require('express');
const cors = require('cors');
const app = express();

// Use CORS to allow requests from your frontend
app.use(cors());

// Other middlewares
app.use(express.json());

app.post('/api/signup', (req, res) => {
  // Handle the sign-up logic here
  res.json({ message: 'User registered successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
