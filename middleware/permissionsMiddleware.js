delete require.cache[require.resolve('../config/permissions')];
const permissions = require('../config/permissions');


const checkPermission = (action) => {
  return (req, res, next) => {

       console.log('User from token:', req.user); 

    const { role } = req.user;  

   

    const userPermissions = permissions[role];
console.log('Available Permissions:', userPermissions);

    if (userPermissions && userPermissions[action]) {
       

      console.log('Permission granted for action:', action);
      return next(); 
    } else {
      console.log('Permission Denied for action:', action);
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
  };
};

module.exports = checkPermission;
