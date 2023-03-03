from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message="Please enter username"), username_exists, Length(min=1,max=50, message='Usernames must be between 1 and 50 characters long.')])
    email = StringField('email', validators=[DataRequired(message="Please enter email"), user_exists])
    password = StringField('password', validators=[DataRequired(message="Please enter password"), Length(min=1,max=12, message='Password must be between 1 and 12 characters long.')])
    first_name = StringField('first name', validators=[DataRequired(message="Please enter first name"), Length(min=1,max=50, message='First name must be between 1 and 50 characters long.')])
    last_name = StringField('last name', validators=[DataRequired(message="Please enter last name"), Length(min=1,max=50, message='Last name must be between 1 and 50 characters long.')])
