from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    # first_name = db.Column(db.String(50))
    # last_name = db.Column(db.String(50))
    # profile_image_url = db.Column(db.String(200))
    hashed_password = db.Column(db.String(255), nullable=False)

    tasks = db.relationship("Task", back_populates = "users")
    lists = db.relationship("List", back_populates = "users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            # 'first_name': self.first_name,
            # 'last_name': self.last_name,
            # 'profile_image_url': self.profile_image_url,
            "tasks": {task.id:task.to_dict() for task in self.tasks},
            "lists": {list.id:list.to_dict() for list in self.lists}
        }
