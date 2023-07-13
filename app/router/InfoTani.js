const router = require('express').Router();
const auth = require('../../midleware/auth');
const upload = require('../../midleware/uploader');
const {
  infoTani,
  tambahInfoTani,
  eventTani,
  tambahEventTani,
  deleteInfoTani,
  deleteEventTani,
  infoTaniById,
  eventTaniById,
  updateEventTani,
  updateInfoTani
} = require('../controllers/InfoTani');

router.post('/event-tani/add', auth, upload.single('fotoKegiatan') ,tambahEventTani);
router.post('/info-tani/add', auth,upload.single('fotoBerita'), tambahInfoTani);
router.get('/info-tani', auth, infoTani);
router.get('/event-tani', auth, eventTani);
router.get('/event-tani/:id', auth, eventTaniById);
router.get('/info-tani/:id', auth, infoTaniById);
router.delete('/info-tani/:id', auth, deleteInfoTani);
router.delete('/event-tani/:id', auth, deleteEventTani);
router.put('/info-tani/:id', auth,upload.single('fotoBeritaBaru'), updateInfoTani);
router.put('/event-tani/:id', auth, updateEventTani);

module.exports = router;