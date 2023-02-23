from .db import db, environment, SCHEMA, add_prefix_for_prod
# from flask_login import UserMixin
import datetime


class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")))
    name = db.Column(db.String(200), nullable=False)
    notes = db.Column(db.String(2000))
    due = db.Column(db.String)
    status = db.Column(db.Enum('Not Started', 'In Progress', 'Done'), default='Not started',  nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    users = db.relationship("User", back_populates = "tasks")
    lists = db.relationship("List", back_populates = "tasks")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'list_id': self.list_id,
            'name': self.name,
            'notes': self.notes,
            'due': self.due,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'user': self.user.to_dict()

        }
