

//prod.DBuser="registracije";
//prod.DBpass="jf83d.dfDF8s"




module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'dev':
            return {DBuser:"root",DBpass:""};

        case 'prod':
            return {DBuser:"registracije",DBpass:""};

        default:
            return  {DBuser:"root",DBpass:""};
    }
};