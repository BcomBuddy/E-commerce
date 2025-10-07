export interface UserData {
  uid: string;
  email: string;
  name: string;
  yearOfStudy: string;
  role: string;
  isAdmin: boolean;
  shellDomain?: string;
  microAppDomain?: string;
}

export class AuthService {
  private static readonly USER_KEY = 'user_data';

  static validateTokenFromShell(): UserData | null {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const isSSO = urlParams.get('sso') === 'true';

    if (!token || !isSSO) {
      return null;
    }

    try {
      const tokenData = JSON.parse(decodeURIComponent(token));
      
      if (!tokenData.uid || !tokenData.email) {
        return null;
      }

      if (tokenData.exp < Math.floor(Date.now() / 1000)) {
        return null;
      }

      const userData: UserData = {
        uid: tokenData.uid,
        email: tokenData.email,
        name: tokenData.name,
        yearOfStudy: tokenData.yearOfStudy,
        role: tokenData.role,
        isAdmin: tokenData.isAdmin,
        shellDomain: tokenData.shellDomain,
        microAppDomain: tokenData.microAppDomain
      };

      localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
      this.cleanUrl();
      
      return userData;
    } catch (error) {
      console.error('Error validating token:', error);
      return null;
    }
  }

  static getUserData(): UserData | null {
    const userData = localStorage.getItem(this.USER_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return this.getUserData() !== null;
  }

  static logout(): void {
    localStorage.removeItem(this.USER_KEY);
    
    const userData = this.getUserData();
    const shellDomain = userData?.shellDomain || 
                       new URLSearchParams(window.location.search).get('shell') || 
                       'https://bcombuddy.netlify.app';
    
    window.location.href = shellDomain;
  }

  private static cleanUrl(): void {
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    url.searchParams.delete('sso');
    url.searchParams.delete('shell');
    window.history.replaceState({}, document.title, url.toString());
  }
}
