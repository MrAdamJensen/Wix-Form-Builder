# Generated by Django 3.0.3 on 2020-03-04 05:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FormInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('form_name', models.CharField(max_length=100)),
                ('num_submissions', models.IntegerField()),
                ('submit_page', models.CharField(max_length=100)),
                ('submissions_page', models.CharField(max_length=100)),
                ('schema', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='FormSubmission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('submission', models.TextField()),
                ('submission_form', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='form_builder.FormInfo')),
            ],
        ),
    ]
