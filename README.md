
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

<br/>

## Page Views

### Splash Page
<img width="1433" alt="Screen Shot 2023-03-10 at 7 41 57 AM" src="https://user-images.githubusercontent.com/110946315/224319362-c1c335b8-122c-4770-87b8-3f60055a8fe9.png">

### Signup
<img width="1440" alt="Screen Shot 2023-03-10 at 7 42 13 AM" src="https://user-images.githubusercontent.com/110946315/224319374-617d5da9-d3b2-45d2-b6fc-359b1884a672.png">

### Login
<img width="1437" alt="Screen Shot 2023-03-10 at 7 42 30 AM" src="https://user-images.githubusercontent.com/110946315/224319376-bbf03afe-341f-484e-8be5-7d5a34c07677.png">

### Home Page
<img width="1438" alt="Screen Shot 2023-03-10 at 7 43 14 AM" src="https://user-images.githubusercontent.com/110946315/224319379-76e7a0aa-b31e-4b9e-8775-27feebc99998.png">

### Create/Edit Lists
<img width="1439" alt="Screen Shot 2023-03-10 at 7 47 20 AM" src="https://user-images.githubusercontent.com/110946315/224320144-5f5161d0-f534-4965-b908-eb2312baf086.png">
<img width="1433" alt="Screen Shot 2023-03-10 at 7 47 58 AM" src="https://user-images.githubusercontent.com/110946315/224320151-00ccdf4d-1db4-41ca-b5a2-0c6a71946beb.png">

### Create/Edit Tasks
<img width="1438" alt="Screen Shot 2023-03-10 at 7 47 42 AM" src="https://user-images.githubusercontent.com/110946315/224320148-f69ac1ab-cc4f-4ae3-9de2-a46bd8570029.png">
<img width="1438" alt="Screen Shot 2023-03-10 at 7 48 27 AM" src="https://user-images.githubusercontent.com/110946315/224320155-67a78f5a-046a-49f0-8dd8-5376af88791d.png">




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
