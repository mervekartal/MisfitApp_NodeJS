
//login olmuş kullanıcılar, url'den login ya da register sayfasına ulaşmak istediklerinde ana sayfaya yönlendirilir.

module.exports = (req,res,next) => {
    if(req.session.userID){
        return res.redirect('/')
    }
    next()
}


