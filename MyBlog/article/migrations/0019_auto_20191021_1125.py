# Generated by Django 2.2.6 on 2019-10-21 03:25

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0018_auto_20191019_1258'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articlepost',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2019, 10, 21, 3, 25, 4, 870490, tzinfo=utc)),
        ),
    ]
