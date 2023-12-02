// axios
import axios from 'axios'

const domain = 'http://api.metalk.online'

export default axios.create({
    domain,
    baseURL: domain,
    headers: {
      'accept-language': 'fa-IR',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTBhMzJlMzgzYjU0MTYyMGQzMzBlNyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk5ODg1NzIzLCJleHAiOjE3MDI0Nzc3MjN9.FpqV87jVMzxfQ_vCPqAjcHRBfkGRzCDlh19TCjkpXs4'
    },
})