"""empty message

Revision ID: e36db0c5c93b
Revises: 1df9a5e103d9
Create Date: 2023-05-21 18:22:26.433908

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e36db0c5c93b'
down_revision = '1df9a5e103d9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('provider_profile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=200), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.Column('has_certificate', sa.Boolean(), nullable=True),
    sa.Column('experience', sa.Integer(), nullable=False),
    sa.Column('service_radius', sa.Integer(), nullable=False),
    sa.Column('average_rating', sa.Float(), nullable=True),
    sa.Column('ratings_counter', sa.Integer(), nullable=False),
    sa.Column('avatar_image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('name')
    )
    op.create_table('user_profile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=200), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.Column('must_have_certificate', sa.Boolean(), nullable=False),
    sa.Column('required_experience', sa.Integer(), nullable=False),
    sa.Column('required_rating', sa.Float(), nullable=True),
    sa.Column('avatar_image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('name')
    )
    op.create_table('address',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('is_main', sa.Boolean(), nullable=True),
    sa.Column('street', sa.String(length=100), nullable=True),
    sa.Column('apartment', sa.String(length=100), nullable=True),
    sa.Column('city', sa.String(length=100), nullable=True),
    sa.Column('state', sa.String(length=100), nullable=True),
    sa.Column('postal_code', sa.String(length=100), nullable=True),
    sa.Column('country', sa.String(length=100), nullable=True),
    sa.Column('latitude', sa.Float(), nullable=False),
    sa.Column('longitude', sa.Float(), nullable=False),
    sa.Column('provider_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['provider_id'], ['provider_profile.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user_profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('exclusion',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('provider_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['provider_id'], ['provider_profile.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user_profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('notification',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type_of_notification', sa.Integer(), nullable=True),
    sa.Column('status', sa.Integer(), nullable=True),
    sa.Column('publishing_date_time', sa.DateTime(), nullable=False),
    sa.Column('message', sa.String(length=100), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('provider_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['provider_id'], ['provider_profile.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user_profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('provider_availability',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('provider_id', sa.Integer(), nullable=True),
    sa.Column('day', sa.String(length=100), nullable=False),
    sa.Column('time_slot', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['provider_id'], ['provider_profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('service_provided',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('provider_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['provider_id'], ['provider_profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('service_description',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category', sa.String(length=100), nullable=True),
    sa.Column('service', sa.String(length=100), nullable=True),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('unit', sa.String(length=100), nullable=True),
    sa.Column('duration', sa.Integer(), nullable=True),
    sa.Column('personnel', sa.Integer(), nullable=True),
    sa.Column('included', sa.String(length=100), nullable=True),
    sa.Column('price', sa.Float(), nullable=True),
    sa.Column('service_provided', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['service_provided'], ['service_provided.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('service_request',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('status', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('time', sa.Time(), nullable=True),
    sa.Column('recurrence', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.Column('service_description_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('provider_id', sa.Integer(), nullable=True),
    sa.Column('address_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['address_id'], ['address.id'], ),
    sa.ForeignKeyConstraint(['provider_id'], ['provider_profile.id'], ),
    sa.ForeignKeyConstraint(['service_description_id'], ['service_description.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user_profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('service_request')
    op.drop_table('service_description')
    op.drop_table('service_provided')
    op.drop_table('provider_availability')
    op.drop_table('notification')
    op.drop_table('exclusion')
    op.drop_table('address')
    op.drop_table('user_profile')
    op.drop_table('provider_profile')
    # ### end Alembic commands ###
