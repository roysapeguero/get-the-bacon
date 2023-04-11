from app.models import db, Network, environment, SCHEMA
from datetime import datetime

# Adds a demo user, you can add other users here if you want


def seed_contacts():
    contact_1 = Network(
        user_id=1,
        # list_id=4,
        first_name='Laura',
        last_name='Banks',
        position='Hiring Manager',
        company_name='Google',
        company_location='New York, NY',
        contact_notes='We talked April 1st, they were looking to hire a UX Designer and said to check in 2 weeks',
        linkedin="N/a",
        github="N/a",
        number="N/a",
        email="N/a",
        site="https://www.google.com",
        position_of_interest='Full Stack Developer'
    )
    contact_2 = Network(
        user_id=1,
        # list_id=4,
        first_name='Holly',
        last_name='Smalls',
        position='Hiring Manager',
        company_name='Yahoo!',
        company_location='Sunnyvale, California',
        contact_notes='They were looking to hire a Full Stack Dev but I did\'t have enough experience so they said to check in next month',
        linkedin="N/a",
        github="N/a",
        number="N/a",
        email="N/a",
        site="https://www.yahoo.com",
        position_of_interest='Frontend Developer'
    )
    contact_3 = Network(
        user_id=1,
        # list_id=4,
        first_name='Hector',
        last_name='Lebron',
        position='Hiring Manager',
        company_name='YouTube',
        company_location='New York, NY',
        contact_notes='They mentioned their dog Tucky was having surgery so remember to ask about how that went! Said they might have an internship coming up in the summer :3',
        linkedin="N/a",
        github="N/a",
        number="N/a",
        email="N/a",
        site="https://www.youtube.com",
        position_of_interest='Backend Developer'
    )


    db.session.add(contact_1)
    db.session.add(contact_2)
    db.session.add(contact_3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_contacts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.networks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM networks")

    db.session.commit()
