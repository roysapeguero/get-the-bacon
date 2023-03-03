from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Credentials were incorrect.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Credentials were incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches, Length(min=1,max=12, message='Password must be between 1 and 12 characters long.')])
