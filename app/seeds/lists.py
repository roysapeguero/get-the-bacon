from app.models import db, List, environment, SCHEMA
from datetime import datetime

def seed_lists():
    list_1 = List(
        user_id=1,
        name='Potato list',
        notes='Some tasks',
        due='Tue Mar 7 2023 18:00:00',
        status='In Progress',
        created_at = datetime.now(),
        updated_at = datetime.now())
    list_2 =  List(
        user_id=1,
        name='Grocery list',
        notes='Must eat somethin',
        due='Fri Mar 10 2023 18:00:00',
        status='Not Started',
        created_at = datetime.now(),
        updated_at = datetime.now() )
    list_3 =  List(
        user_id=2,
        name='Finish Project',
        notes='If I never start I\'ll never finish!',
        due='Sat Mar 11 2023 18:00:00',
        status='Done',
        created_at = datetime.now(),
        updated_at = datetime.now())

    db.session.add(list_1)
    db.session.add(list_2)
    db.session.add(list_3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM lists")

    db.session.commit()
