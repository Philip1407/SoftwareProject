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
    (username,password,done)=>{
        try{
            User.findOne({'username':username}, (err,user) =>{
                if(user)
                    return done(null,false,{message: 'Username has already taken'})
                else{
                    bcrypt.hash(password,BCRYPT_SALTS_ROUND).then(async(hashedPass) =>{
                        let newuser = new User({
                            username,
                            password: hashedPass
                            })
                        await newuser.save()
                        done(null, newuser)
                    })
                }
            })
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
    (username,password,done)=>{
        try{
            User.findOne({'username': username},(err,user)=>{
            if(err) return done(err,false,null)
            if(!user)
                return done(null,false,{message: 'No user'})
            else{
                bcrypt.compare(password, user.password).then(result=>{
                    console.log(password, user.password, result)
                    if(!result)
                        return done(null,false,{message: 'Wrong password'})
                    else{
                        console.log(user)
                        done(null, user)
                    }
                })
            }})
        }
        catch(err){
            done(err)
        }
    }
))

passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWTSecret,
        passReqToCallback: true
      },
      (req, jwtPayload, done)=> {
        //find the user in db if needed
        try {
          User.findById(jwtPayload.id,user=>{
            if (user) {
                req.user = user;
                return done(null, user);
            }
            return done(null, false);
            })
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