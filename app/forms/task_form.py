from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):
    user_id = IntegerField('user_id')
    list_id = IntegerField('list_id')
    name = StringField('name', validators=[DataRequired(), Length(min=1,max=200, message='Task names must be between 1 and 200 characters long.')])
    notes = TextAreaField('notes', validators=[DataRequired(), Length(max=2000, message='Notes must be less than 2000 characters long.')])
    due = StringField('due')
    status = StringField('status')
