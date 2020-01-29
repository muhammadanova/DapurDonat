module.exports = (req, res, next) => {
  if(req.session.user){
    if(req.session.user.role === 'admin'){
      next()
    }else{
      req.flash('error', 'Gagal, Anda bukan sebagai admin')
      res.redirect('/contact/list')
    }
  }else{
    res.redirect('/login')
  }
}