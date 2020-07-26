export class MainService {
  proxyUrl = "https://cors-anywhere.herokuapp.com/";
  targetUrl = "https://elosolar.herokuapp.com/v1/"

  async login(username: string, password: string) {
    const body = JSON.stringify({ username, password });
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const requesOptions = {
      method: 'POST',
      headers,
      body
    };
    await fetch(this.proxyUrl + this.targetUrl + 'login', requesOptions)
    return 
  }
}