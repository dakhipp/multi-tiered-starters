Create model and initial migration:
node_modules/.bin/sequelize model:create --name User --attributes "name:string, username:string, phone_number:string, email:string password:string"

Create empty migration file for custom work:
node_modules/.bin/sequelize migration:create --name add-birthday-to-user

Runs migrate file or files:
node_modules/.bin/sequelize db:migrate
