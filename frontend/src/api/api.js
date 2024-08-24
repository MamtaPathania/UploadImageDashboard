// const baseUrl='http://88.99.5.236:4080'
// const baseUrl='http://localhost:4080'
const baseUrl=''



const LoginApi=`${baseUrl}/login`;
export {LoginApi}

const ImageUpload=`${baseUrl}/image-uploader`;
export {ImageUpload}

const fetchCategory=`${baseUrl}/getupload-img/category`
export {fetchCategory}

const updateData=`${baseUrl}/update-image`
export {updateData}

const deleteDataById=`${baseUrl}/delete`
export {deleteDataById}