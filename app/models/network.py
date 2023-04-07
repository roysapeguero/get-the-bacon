from .db import db, environment, SCHEMA, add_prefix_for_prod
# from flask_login import UserMixin
import datetime


class Network(db.Model):
    __tablename__ = 'networks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")))
    contact_position = db.Column(db.String(200), nullable=False)
    company_name = db.Column(db.String(200), nullable=False)
    first_name = db.Column(db.String(200), nullable=False)
    last_name = db.Column(db.String(200), nullable=False)
    contact_image_url = db.Column(db.String(200), nullable=False)
    contact_notes = db.Column(db.String(1500))
    job_location = db.Column(db.String(200))
    position_of_interest = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    users = db.relationship("User", back_populates = "networks")
    lists = db.relationship("List", back_populates = "networks", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'list_id': self.list_id,
            'contact_position': self.contact_position,
            'company_name': self.company_name,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'contact_image_url': self.contact_image_url,
            'job_location': self.job_location,
            'contact_notes': self.contact_notes,
            'position_of_interest': self.contact_notes,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
