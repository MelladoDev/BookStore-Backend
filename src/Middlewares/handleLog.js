const handleLog = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  };
  
  export default handleLog;