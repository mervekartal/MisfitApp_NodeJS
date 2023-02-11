//kontrol yapabilmesi için; önce rolleri parametre olarak alıp sonrasında req res next parametrelerini alması gerekir.
module.exports = (roles) => {
    return (req,res,next) => {
        const userRole = req.body.role
        if(roles.includes(userRole)){ //roller ilgili user'ın rolünü içeriyor mu
            next()
        } else{
            return res.status(401).send('You can not do it :(')
        }
    }
}