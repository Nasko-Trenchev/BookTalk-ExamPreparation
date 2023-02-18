const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authControler');
const bookController = require('./controllers/bookController');
const {isAuthenticated}  = require('./middlewares/authMiddleware')

router.get('/', homeController.getHomePage)

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/logout', authController.getLogout);

router.get('/create', isAuthenticated, bookController.getCreate);
router.post('/create', isAuthenticated, bookController.postCreate);
router.get('/catalog', bookController.getCatalog);

router.get('/details/:id', bookController.getDetails);

router.get('/wish/:id', bookController.wishToRead);
router.get('/delete/:id', bookController.getDelete);
router.get('/edit/:id', isAuthenticated, bookController.getEdit);
router.post('/edit/:id', isAuthenticated, bookController.postEdit);

router.get("/profile", isAuthenticated, bookController.getProfile)

//TODO: Routes

module.exports = router;