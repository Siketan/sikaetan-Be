const { Router, } = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../../docs/swagger.json');
const router = Router();
const {cekNik, cekNiP} = require("../controllers/cekNik")
const akun = require('./akun');
const auth = require('../../midleware/auth');
const dataTani = require('./dataTani');
const InfoTani = require('./InfoTani');
const tokoTani = require('./tokoTani');
const liveChat = require('./liveChat');
const dataPenyuluh = require('./dataPenyuluh');
const select = require('./select');
const allUsers = require('./allUsers');
const chart = require('./chart');
const laporanTanam = require('./laporanTanam');
const chatt = require('./chatt')

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDocument));

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is running',
  });
});
router.post('/cek-nik', auth, cekNik);
router.post('/cek-nip', auth, cekNiP);

router.use('/auth', akun);
router.use('/', dataTani);
router.use('/', InfoTani);
router.use('/', tokoTani);
router.use('/', liveChat);
router.use('/', dataPenyuluh);
router.use('/', select);
router.use('/', allUsers);
router.use('/', chart);
router.use('/', chatt);
router.use('/', laporanTanam);

module.exports = router;