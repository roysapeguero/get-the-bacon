from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Lition', profile_image_url='https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Marn', profile_image_url='https://cdn.pixabay.com/photo/2023/01/10/07/12/cat-7709087__340.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Bob', profile_image_url='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
