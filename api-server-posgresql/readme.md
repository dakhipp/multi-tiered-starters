Create model and initial migration:
node_modules/.bin/sequelize model:create --name User --attributes "name:string, username:string, phone_number:string, email:string password:string"

Create empty migration file for custom work:
node_modules/.bin/sequelize migration:create --name add-birthday-to-user

Runs migrate file or files:
node_modules/.bin/sequelize db:migrate


NODE_ENV=test node_modules/.bin/sequelize db:migrate


# install postgres
brew install postgresql

# start postgres and allow it to run at boot time
pg_ctl -D /usr/local/var/postgres start && brew services start postgresql

# enter postgres terminal, create username, and give proper roles.
psql postgres -c "CREATE ROLE root WITH LOGIN PASSWORD 'toor'; ALTER ROLE root CREATEDB;"

# create needed mobilesoft db under correct username.
psql postgres -U root -c "CREATE DATABASE swagger_api;"