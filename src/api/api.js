import request from '../utils/request'

export const upload = (formData) => request.post('/api/upload',formData , {
    headers:{
        'Content-Type': 'multipart/form-data',
    }
})
