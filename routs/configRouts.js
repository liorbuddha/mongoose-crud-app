//import outer page router
const routerIndex = require('./index')

exports.routInit = (app)=> {
    //use outer page router
    app.use("/", routerIndex);

    app.get("/users", (req, res) => {
      res.json({ msg: "msg users" });
    });
}