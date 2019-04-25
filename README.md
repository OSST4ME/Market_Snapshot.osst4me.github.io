This project is designed to assist potential home buyers, home sellers, and real estate brokers keep up with current housing market trends throughout San Diego.  Just entering a zip code or city will bring up trends in pricing for single family homes as well as condominiums.

View the working site @ https://market-snapshot.herokuapp.com/

## Development Setup

```
# Install packages
npm install

# Initialize local database
mysql < models/schema.sql

# Create .env, update as needed
cp .env.example .env

# Run tests
npm test

# Start node application
npm start
```

