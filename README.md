# Get The Bacon

`Get The Bacon` is a `Remember The Milk` inspired web application. It provides a platform for users to declutter their minds and optimize productivity. Get The Bacon hopes to be a job seeker's personal cheatbook, more features are comming soon!

## Tech Stack
---
### Frameworks, Platforms and Libraries:
- Python
- Flask
- SQLAlchemy
- Node.js
- JavaScript
- React
- Redux
- HTML
- CSS

### Database:
- PostgreSQL

### Hosting:
- Render

## 🚀 Local Installation
1. Clone the repository

HTTPS:
```bash
git clone https://github.com/roysapeguero/get-the-bacon.git
```
SSH:
```bash
git clone git@github.com:roysapeguero/get-the-bacon.git
```

2. Install the dependencies
```bash
pipenv install -r requirements.txt
```

3. Create a .env file based on the example with proper settings for your development environment
```bash
SECRET_KEY= <your secret key>
DATABASE_URL=sqlite:///dev.db
SCHEMA=flask_schema
```

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

```bash
pipenv shell
```

```bash
flask db upgrade
```

```bash
flask seed all
```

```bash
flask run
```

5. Open a separate terminal and change into the react-app directory

```bash
cd react-app
```

6. Install the dependencies
```bash
npm install
```

7. Start the application
```bash
npm start
```

5. Navigate to the application in your browser

## Contact Information
---
- [LinkedIn](https://www.linkedin.com/in/roysapeguero/)
- <roysapeguero@outlook.com>

[1]:https://getthebacon.onrender.com/
