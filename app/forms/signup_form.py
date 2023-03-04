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


def check_password_length(form, field):
    password = field.data
    if len(password) < 6 or len(password) > 12:
        raise ValidationError("Password must be between 6 and 12 characters long.")

def check_is_email(form, field):
    email = field.data
    if not '@' in email:
        raise ValidationError("Please enter a valid email.")

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message="Please enter username"), username_exists, Length(min=5,max=25, message='Usernames must be between 5 and 25 characters long.')])
    email = StringField('email', validators=[DataRequired(message="Please enter email"), user_exists, check_is_email])
    password = StringField('password', validators=[DataRequired(message="Please enter password"), check_password_length])
    first_name = StringField('first name', validators=[DataRequired(message="Please enter first name"), Length(min=2,max=25, message='First name must be between 2 and 25 characters long.')])
    last_name = StringField('last name', validators=[DataRequired(message="Please enter last name"), Length(min=2,max=25, message='Last name must be between 2 and 25 characters long.')])
