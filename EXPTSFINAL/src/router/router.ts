import { Router } from 'express';
import {
  renderCreateForm,
  handleCreateMajor,
  renderMajorList,
  renderEditForm,
  handleEditMajor,
  handleDeleteMajor
} from '../controllers/major.controller';
import {
  renderCreateUserForm,
  handleCreateUser,
  renderUserList,
  renderEditUserForm,
  handleEditUser,
  handleDeleteUser
} from '../controllers/user.controller';
import main from '../controllers/main';
import path from 'path';
import * as auth from '../controllers/auth.controller';
import { requireLogin } from '../middlewares/auth';
import { renderRanking } from '../controllers/ranking.controller';
import { handleSaveScore } from '../controllers/game.controller';
import { renderChangePassword, handleChangePassword } from '../controllers/user.controller';
import { renderEditProfile, handleEditProfile } from '../controllers/user.controller';


const router = Router();

router.get('/welcome', requireLogin, (req, res) => {
  res.render('auth/welcome');
});

router.get('/', requireLogin, (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../../public') });
});

router.get('/home', main.index);
router.get('/about', main.about);
router.get('/lorem/:count', main.loremRoute);
router.get('/hb1', main.hb1);
router.get('/hb2', main.hb2);
router.get('/hb3', main.hb3);
router.get('/hb4', main.hb4);

router.get('/major/create', renderCreateForm);
router.post('/major/create', handleCreateMajor);
router.get('/major', renderMajorList);
router.get('/major/edit/:id', renderEditForm);
router.post('/major/edit/:id', handleEditMajor);
router.post('/major/delete/:id', handleDeleteMajor);


router.get('/user', renderUserList);
router.get('/user/create', renderCreateUserForm);
router.post('/user/create', handleCreateUser);
router.get('/user/edit-profile', renderEditProfile);
router.post('/user/edit-profile', handleEditProfile);
router.post('/user/delete/:id', handleDeleteUser);

router.get('/login', auth.renderLogin);
router.post('/login', auth.handleLogin);
router.get('/logout', auth.logout);

router.post('/game-session', handleSaveScore);
router.get('/ranking', renderRanking);


router.get('/user/change-password', renderChangePassword);
router.post('/user/change-password', handleChangePassword);


router.get('/user/edit-profile', renderEditProfile);
router.post('/user/edit-profile', handleEditProfile);


export default router;
