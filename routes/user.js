
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
    message = '';
    if(req.method == "POST"){
       var post  = req.body;
       var username= post.user_name;
       var pass= post.password;
       var fname= post.first_name;
       var lname= post.last_name;
       var email= post.email_add;
 
       var sql = "INSERT INTO `reactnode_users`(`name`,`username`,`email`,`password`) VALUES ('" + fname +' '+lname+ "','" + username + "','" + email + "','" + pass + "')";
 
       var query = db.query(sql, function(err, result) {
 
          message = "Succesfully! Your user account has been created.";
          res.render('signup.ejs',{message: message});
       });
 
    } else {
       res.render('signup');
    }
 };
  
 //-----------------------------------------------login page call------------------------------------------------------
 exports.login = function(req, res){
    var message = '';
    var sess = req.session; 
 
    if(req.method == "POST"){
       var post  = req.body;
       var name= post.user_name;
       var pass= post.password;
      
       var sql="SELECT id, name, username FROM `reactnode_users` WHERE `username`='"+name+"' and password = '"+pass+"'";                           
       db.query(sql, function(err, results){      
          if(results.length){
             req.session.userId = results[0].id;
             req.session.user = results[0];
             console.log(results[0].id);
             res.redirect('/home/dashboard');
          }
          else{
             message = 'Wrong Credentials.';
             res.render('index.ejs',{message: message});
          }
                  
       });
    } else {
       res.render('index.ejs',{message: message});
    }
            
 };

 //-----------------------------------------------dashboard page functionality----------------------------------------------
            
 exports.dashboard = function(req, res, next){
            
    var user =  req.session.user,
    userId = req.session.userId;
    console.log('user_Id: '+userId);
    if(userId == null){
       res.redirect("/login");
       return;
    }
 
    var sql="SELECT * FROM `reactnode_users` WHERE `id`='"+userId+"'";
              
    db.query(sql, function(err, result){  
       res.render('dashboard.ejs',{data:result});
    });
    

 };

  //-----------------------------------------------filterbydate page functionality----------------------------------------------
            
  exports.filterbydate = function(req, res, next){
            
    var user =  req.session.user,
    userId = req.session.userId;
    console.log('user_Id: '+userId);
    if(userId == null){
       res.redirect("/login");
       return;
    }
 
    var sql="SELECT * FROM `reactnode_users` WHERE `id`='"+userId+"'";
              
    db.query(sql, function(err, result){  
       res.render('filterbydate.ejs',{data:result});
    });
    
 };
 
 //------------------------------------logout functionality----------------------------------------------
 exports.logout=function(req,res){
    req.session.destroy(function(err) {
       res.redirect("/login");
    })
 };
 //--------------------------------render user details after login--------------------------------
 exports.profile = function(req, res){
 
    var userId = req.session.userId;
    if(userId == null){
       res.redirect("/login");
       return;
    }
 
    var sql="SELECT * FROM `reactnode_users` WHERE `id`='"+userId+"'";          
    db.query(sql, function(err, result){  
       res.render('profile.ejs',{data:result});
    });
 };
 //---------------------------------edit users details after login----------------------------------
 exports.editprofile=function(req,res){
    var userId = req.session.userId;
    if(userId == null){
       res.redirect("/login");
       return;
    }
 
    var sql="SELECT * FROM `reactnode_users` WHERE `id`='"+userId+"'";
    db.query(sql, function(err, results){
       res.render('edit_profile.ejs',{data:results});
    });
 };
 

 //---------------------------------------------filtertranascationsbydate page call------------------------------------------------------
exports.transactionsfilterbydate = function(req, res){
       var user =  req.session.user,
    userId = req.session.userId;
    console.log('user_Id: '+userId);
    if(userId == null){
        res.redirect("/login");
        return;
    }
    var sql="SELECT * FROM `reactnode_users` WHERE `id`='"+userId+"'";
                
    db.query(sql, function(err, result){  
    res.render('transactionsfilterbydate.ejs',{data:result});
    });
 };