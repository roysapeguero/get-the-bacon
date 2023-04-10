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
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    company_name = db.Column(db.String(100), nullable=False)
    # contact_image_url = db.Column(db.String(200), nullable=False)
    contact_notes = db.Column(db.String(1500))
    company_location = db.Column(db.String(100))
    linkedin = db.Column(db.String(100))
    github = db.Column(db.String(100))
    number = db.Column(db.String(100))
    email = db.Column(db.String(100))
    site = db.Column(db.String(100))
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
            'first_name': self.first_name,
            'last_name': self.last_name,
            'position': self.position,
            'company_name': self.company_name,
            # 'contact_image_url': self.contact_image_url,
            'company_location': self.company_location,
            'contact_notes': self.contact_notes,
            'linkedin': self.linkedin,
            'github': self.github,
            'number': self.number,
            'email': self.email,
            'site': self.site,
            'position_of_interest': self.position_of_interest,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
