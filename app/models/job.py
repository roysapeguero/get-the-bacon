from .db import db, environment, SCHEMA, add_prefix_for_prod
# from flask_login import UserMixin
import datetime


class Job(db.Model):
    __tablename__ = 'jobs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")))
    job_title = db.Column(db.String(200), nullable=False)
    company_name = db.Column(db.String(200), nullable=False)
    company_image_url = db.Column(db.String(200), nullable=False)
    job_location = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(200), nullable=False)
    benefits = db.Column(db.String(200))
    listing_url = db.Column(db.String(200))
    job_description = db.Column(db.String(1500))
    job_notes = db.Column(db.String(1500))
    hooks = db.Column(db.String(1500))
    extra_notes = db.Column(db.String(1500))
    salary = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    users = db.relationship("User", back_populates = "jobs")
    lists = db.relationship("List", back_populates = "jobs")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'list_id': self.list_id,
            'job_title': self.job_title,
            'company_name': self.company_name,
            'company_image_url': self.company_image_url,
            'job_location': self.job_location,
            'benefits': self.benefits,
            'listing_url': self.listing_url,
            'job_description': self.job_description,
            'job_notes': self.job_notes,
            'hooks': self.hooks,
            'extra_notes': self.extra_notes,
            'salary': self.salary,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'user': self.user.to_dict()

        }
