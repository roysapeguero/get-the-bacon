from .db import db, environment, SCHEMA, add_prefix_for_prod
# from flask_login import UserMixin
import datetime


class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(200), nullable=False)
    notes = db.Column(db.String(2000))
    status = db.Column(db.String)
    # due = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    users = db.relationship("User", back_populates = "lists")
    jobs = db.relationship("Job", back_populates = "lists")
    tasks = db.relationship("Task", back_populates = "lists", cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'notes': self.notes,
            # 'due': self.due,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'tasks': {task.id: task.to_dict() for task in self.tasks}
            # 'user': self.user.to_dict()
        }
