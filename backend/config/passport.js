const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const JWTSecret = 'jwt-secret'
const bcrypt = require('bcryptjs')

const BCRYPT_SALTS_ROUND = 10

const User = require('../models/user')

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false
    },
    async(username,password,done)=>{
        try{
            let user = await User.find(`username = '${username}'`)
            //console.log(user && user.length)
            if(user && user.length){
                return done(null,false,{message: 'Username has already taken'})
            }else{
                bcrypt.hash(password,BCRYPT_SALTS_ROUND).then(async(hashedPass) =>{
                    let newuser = {
                        username,
                        password: hashedPass
                        }
                    console.log(newuser)
                    await User.create(newuser)
                    done(null, newuser)
                })
            }
        }
        catch(err){
            done(err)
        }
    }
))

passport.use('signin',new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false
    },
    async(username,password,done)=>{
        try{
            let user = await User.find(`username = '${username}'`)
            if(!(user && user.length)){
                return done(null,false,{message: 'No user'})
            }else{
                bcrypt.compare(password,user[0].password).then(result=>{
                    if(!result)
                        return done(null,false,{message: 'Wrong password'})
                    else{
                        console.log(user[0])
                        done(null, user[0])
                    }
                })
            }
        }
        catch(err){
            done(err)
        }
    }
    /*(username,password,done)=>{
        console.log(username,password)
        try{
            User.find(`username = '${username}'`)
            .then(user=>{
                if(user == null){
                    return done(null,false,{message: 'Username has already taken'})
                }else{
                    bcrypt.compare(password,user.password).then(response =>{
                        if(!response)
                            return done(null,false,{message: 'Password do not match'})
                        return done(null, user)
                    })
                }
            })
        }
        catch(err){
            done(err)
        }
    }*/
))

passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWTSecret,
        passReqToCallback: true
      },
      async function(req, jwtPayload, done) {
        //find the user in db if needed
        try {
          const user = await User.find(`id= ${jwtPayload.id}`);
          if (user) {
            req.user = user;
            return done(null, user);
          }
          return done(null, false);
        } catch (err) {
          return console.log(err);
        }
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


module.exports = passport

