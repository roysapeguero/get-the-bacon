from app.models import db, Task, environment, SCHEMA
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_tasks():
    task_1 = Task(
        user_id=1,
        list_id=1,
        name='Cook Potato Task',
        notes='Omg I have to get tdatetime(2023, 2, 28, 15, 30, 45, 123456)his done before its too late!',
        due='Tue Mar 7 2023 18:00:00',
        status='In Progress',
        created_at = datetime.now(),
        updated_at = datetime.now() )
    task_2 =  Task(
        user_id=1,
        list_id=2,
        name='Get Potato Task',
        notes='Omg I have to get this done NOWWWWW!',
        due='Fri Mar 10 2023 18:00:00',
        status='Not Started',
        created_at = datetime.now(),
        updated_at = datetime.now() )
    task_3 =  Task(
        user_id=2,
        list_id=1,
        name='Finish Project',
        notes='If I never start I\'ll never finish!',
        due='Sat Mar 11 2023 18:00:00',
        status='Done',
        created_at = datetime.now(),
        updated_at = datetime.now())

    db.session.add(task_1)
    db.session.add(task_2)
    db.session.add(task_3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")

    db.session.commit()
