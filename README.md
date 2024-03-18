# nest-pro
Node APIs with NEST framework

# official documentation
https://docs.nestjs.com/

# installation of NEST cli
npm i -g @nestjs/cli
nest --version

# initilazation of nest project
nest new project-name

# lint config if not 
npm init @eslint/config

# to create a module
nest g module module-name

# to create a controller
nest g controller path-to-controller --no-spec

# to create a service
nest g service path-to-service --no-spec

# for pg setupt install
npm i/add pg typeorm @nestjs/typeorm

# for authorization
npm i @nestjs/jwt @nestjs/passport passport passport-jwt
