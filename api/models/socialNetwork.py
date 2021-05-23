from app.applications import database, serializer

class SocialNetwork(database.Model):
    url = database.Column(database.Text, nullable=False)
    name = database.Column(database.String(20), nullable=False)
    id_user = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class SocialNetworkSchema(serializer.Schema):
    class Meta:
            fields =  ('id','name','url','id_user')

socialNetwork_schema = SocialNetworkSchema()
socialNetworks_schema = SocialNetworkSchema(many=True)