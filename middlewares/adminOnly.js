module.exports = (req, res, next) => {
  if(req.session.user){
    if(req.session.user.role === 'admin'){
      next()
    }else{
      req.flash('error', 'Gagal, Anda bukan sebagai admin')
      res.redirect('/admin/dashboard')
    }
  }else{
    res.redirect('/admin/login')
  }
}