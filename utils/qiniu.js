const qiniu = require('qiniu')
const qiniuConf = require('../config/qiniu')
const mac = new qiniu.auth.digest.Mac(qiniuConf.AK, qiniuConf.SK)
const putPolicy = new qiniu.rs.PutPolicy(qiniuConf.options)
const uploadToken = putPolicy.uploadToken(mac)
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2
const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()

const uploadToQiniu = async (key, file) => {
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        reject(respErr)
      }
      if (respInfo.statusCode === 200) {
        resolve(respBody)
      } else {
        reject(respInfo)
      }
    })
  })
}

// test
