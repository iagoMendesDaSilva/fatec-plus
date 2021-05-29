from app.applications import database, serializer

class Language(database.Model):
    level = database.Column(database.String(15), nullable=False)
    language = database.Column(database.String(100), nullable=False)
    id_user = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class LanguageSchema(serializer.SQLAlchemyAutoSchema):
    class Meta:
            model = Language

language_schema = LanguageSchema()
languages_schema = LanguageSchema(many=True)