import StoreModule from "../module"

class User extends StoreModule {

  initState() {
    return {
      token: null,
      isAuth: null,
      name: '',
      errors: [],
      wait: false
    }
  }

  clearErrors () {
    this.setState({
      ...this.getState(),
      errors: []
    })
  }

  initUser () {
    this.setState({
      ...this.getState(),
      wait: true
    })
    const token = localStorage.getItem('token')
    if (token) {
      fetch('/api/v1/users/self?fields=*',{
        method: "GET",
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          ...this.getState(),
          isAuth: true,
          token: token,
          name: json.result.profile.name,
        })
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        this.setState({
          ...this.getState(),
          wait: false
        })
      })
    } else {
      this.setState({
        ...this.getState(),
        wait: false,
        token: '',
        isAuth: false
      })
    }
  }
  
  
  login (user) {
    this.setState({
      ...this.getState(),
      wait: true
    })
    fetch('/api/v1/users/sign', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
    })
    .then((resp) => resp.json())
    .then((json => {
      if(!json.error) {
        localStorage.setItem('token', json.result.token)
        this.setState({
          ...this.getState(),
          name: json.result.user.profile.name,
          token: json.result.token,
          isAuth: true,
          errors: []
        })
      } else {
        console.log(json);
        this.setState({
          ...this.getState(),
          errors: [...json.error.data.issues]
        })
      }
    }))
    .catch(error => {
      console.log(error)
    })
    .finally (() => {
      this.setState({
        ...this.getState(),
        wait: false
      })
    })
  }

  logout () {
    fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    })
    .then (resp => resp.json())
    .then (json => {
      if(json.result) {
        this.setState({
          ...this.getState(),
          token: '',
          isAuth: false,
          name: '',
          error: '',
          wait: false
        })
        localStorage.removeItem('token')
      }
    })
    .catch(error => {
      console.error(error)
    })
  }
}
  
  export default User;