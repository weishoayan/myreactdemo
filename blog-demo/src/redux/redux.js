import { setUserInfo , getUserInfo , logout} from './reduxapi'




export default  function User(state={data:{},loading:false},action){
    switch (action.type) {
        case 'SET_USER':
            console.log('SET_USER')
            setUserInfo(action.userInfo)
            // state = {data:action.userInfo,loading:action.userInfo.user ? true : false}
            return {data:action.userInfo,loading:action.userInfo.user ? true : false}
        case 'GET_USER':
            return 'state2'
        case 'LOGIN_OUT':
            logout()
            let userinfo2 = getUserInfo()
            return {
                data:userinfo2,
                loading:userinfo2.user ? true : false,
            }
        default :
            console.log('moren')
            let userinfo = getUserInfo()
            return {
                data:userinfo,
                loading:userinfo.user ? true : false,
                num:0
            }
    }
}


