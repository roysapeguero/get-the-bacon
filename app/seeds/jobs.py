from app.models import db, Job, environment, SCHEMA
from datetime import datetime

# Adds a demo user, you can add other users here if you want


def seed_jobs():
    job_1 = Job(
        user_id=1,
        list_id=1,
        job_title='Software Engineer II, Mobile (IOS)',
        company_name='Google',
        company_image_url='https://media.wired.co.uk/photos/606da4ae938ecee6e930e9c3/master/w_1600%2Cc_limit/google-logo_2.jpg',
        job_location='New York, NY',
        status='Not Applied',
        benefits="Pay, lol",
        listing_url='https://newyorkcity-ny.geebo.com/jobs-online/view/id/1132971632-software-engineer-ii-mobile-/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic',
        job_description="""Minimum Qualifications: Bachelor's degree or equivalent practical experience. 1 year of experience with software development in one or more programming languages (e.g., Python, C, C++, Java, JavaScript). 1 year of experience with data structures or algorithms. """,
        salary=150000,
        job_notes='We are dedicated to making Google experiences centered around the user.',
        hooks='',
        extra_notes=''
    )
    job_2 = Job(
        user_id=2,
        list_id=2,
        job_title='Software Engineer Intern',
        company_name='Yahoo',
        company_image_url='https://www.lifewire.com/thmb/yx5oJUJ4fA1TQ0h0pl9FM7Kc4Fo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/yahoo-logo-2019-879b7bed612d4bbc97065dce2a0f2d73.png',
        job_location='Remote',
        status='Applied',
        benefits="Remote",
        listing_url='https://www.linkedin.com/jobs/search/?currentJobId=3385765786&distance=5&f_E=1%2C2%2C3&geoId=101738067&keywords=software%20engineer&location=Perth%20Amboy%2C%20New%20Jersey%2C%20United%20States',
        job_description="""What you will do: Contribute significant tested, high-quality, reusable code Build Web applications (Mobile and Desktop) using React.js, Javascript, HTML5 Navigate the serving stack from browser to API with ease across multiple technologies Test your code using Test Driven Development techniques, both unit and functional Partner with Product, Design, and other teams to build and implement elegant, delightful solutions Own project/features development with minimal supervision, learn and apply new technologies quickly. Plan and iterate on impactful features Maintain and improve existing code with a pride of ownership, including up-to-date documentation on processes and code Contribute beyond the level of a single engineer by advocating for good engineering practices and mentoring other engineers on your team Responsibilities: Build responsive and compelling Web applications, components Code using JavaScript, HTML, CSS, and AJAX Follow good coding, testing, and documenting best practices and adhere to existing standards Ensure quality of code by writing tests and doing code reviews Build reusable code and libraries. """,
        salary=135200,
        job_notes='At Yahoo, we know that diversity makes us stronger. We are committed to a collaborative, inclusive environment that encourages authenticity and fosters a sense of belonging',
        hooks='',
        extra_notes=''
    )

    db.session.add(job_1)
    db.session.add(job_2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_jobs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.jobs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM jobs")

    db.session.commit()
