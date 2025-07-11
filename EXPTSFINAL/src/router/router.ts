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

const router = Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, '../../public'),
  });
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
router.get('/user/edit/:id', renderEditUserForm);
router.post('/user/edit/:id', handleEditUser);
router.post('/user/delete/:id', handleDeleteUser);

export default router;
