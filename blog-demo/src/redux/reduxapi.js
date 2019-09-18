export function setUserInfo(userInfo){
    localStorage.setItem('user',userInfo.user );
    localStorage.setItem('avatar',userInfo.avatar );
    localStorage.setItem('articleNumL',userInfo.articleNumL );
    localStorage.setItem('commentNum',userInfo.commentNum );
    localStorage.setItem('id',userInfo.id );
    localStorage.setItem('role',userInfo.role );
    localStorage.setItem('token',userInfo.token );
    // this.props.dispatch
    // return {
    //     type:'SET_USER'
    // }
}

export function logout(){
    localStorage.clear()
}

export function getUserInfo(){
    let userinfo = {
        user:localStorage.getItem('user' ),
        avatar:localStorage.getItem('avatar' ),
        articleNumL:localStorage.getItem('articleNumL' ),
        commentNum:localStorage.getItem('commentNum'),
        id:localStorage.getItem('id'),
        role:localStorage.getItem('role'),
        token:localStorage.getItem('token')
    }
    return userinfo
}