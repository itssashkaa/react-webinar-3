import StoreModule from "../module"

class Profile extends StoreModule {

  initState() {
    return {
      profileName: '',
      email: '',
      phone: '',
      wait: false
    }
  }

  getUserData () {
    this.setState({
      ...this.getState(),
      wait: true
    })
    fetch('/api/v1/users/self?fields=*',{
      method: 'GET',
      headers: {
        'X-Token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => {
      console.log('resp', json);
      if(!json.error){
        this.setState({
          ...this.getState(),
          profileName: json.result.profile.name,
          email: json.result.email,
          phone: json.result.profile.phone,      
        })
      } else if(json.error.code === "Forbidden") { 
        this.logout();
        throw new Error (json.error.message);
      }
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
  }
}
  
  export default Profile;