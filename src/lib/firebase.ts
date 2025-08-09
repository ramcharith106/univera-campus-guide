// Mock Firebase configuration and services
export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
}

export interface College {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  type: 'Engineering' | 'Medical' | 'Arts' | 'Commerce' | 'Law';
  rating: number;
  fees: number;
  avgPackage: number;
  highestPackage: number;
  placementPercentage: number;
  courses: string[];
  facilities: string[];
  recruiters: string[];
  campusArea: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  images: string[];
}

export interface PG {
  id: string;
  name: string;
  location: string;
  city: string;
  rent: number;
  type: 'Boys' | 'Girls' | 'Co-ed';
  facilities: string[];
  nearbyColleges: string[];
  contact: {
    phone: string;
    email: string;
  };
  images: string[];
  rating: number;
}

// Mock data
export const mockColleges: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Delhi',
    location: 'Hauz Khas, New Delhi',
    city: 'Delhi',
    state: 'Delhi',
    type: 'Engineering',
    rating: 4.8,
    fees: 250000,
    avgPackage: 1800000,
    highestPackage: 5500000,
    placementPercentage: 95,
    courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'],
    facilities: ['Library', 'Hostel', 'Sports Complex', 'Labs', 'Cafeteria'],
    recruiters: ['Microsoft', 'Google', 'Amazon', 'Goldman Sachs'],
    campusArea: '325 acres',
    contact: {
      phone: '+91-11-2659-1749',
      email: 'webmaster@admin.iitd.ac.in',
      website: 'https://home.iitd.ac.in'
    },
    images: ['/placeholder.svg']
  },
  {
    id: '2',
    name: 'VIT University Chennai',
    location: 'Vandalur-Kelambakkam Road, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Engineering',
    rating: 4.5,
    fees: 200000,
    avgPackage: 800000,
    highestPackage: 3500000,
    placementPercentage: 85,
    courses: ['Computer Science', 'Information Technology', 'Electronics', 'Biotechnology'],
    facilities: ['Library', 'Hostel', 'Sports Complex', 'Labs', 'Medical Center'],
    recruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'],
    campusArea: '300 acres',
    contact: {
      phone: '+91-44-3993-1555',
      email: 'admissions@vit.ac.in',
      website: 'https://vit.ac.in'
    },
    images: ['/placeholder.svg']
  }
];

export const mockPGs: PG[] = [
  {
    id: '1',
    name: 'Elite Boys PG',
    location: 'Near IIT Delhi',
    city: 'Delhi',
    rent: 12000,
    type: 'Boys',
    facilities: ['WiFi', 'AC', 'Laundry', 'Meals', 'Security'],
    nearbyColleges: ['IIT Delhi', 'JNU'],
    contact: {
      phone: '+91-9876543210',
      email: 'elite@pg.com'
    },
    images: ['/placeholder.svg'],
    rating: 4.2
  },
  {
    id: '2',
    name: 'Safe Haven Girls PG',
    location: 'Near VIT Chennai',
    city: 'Chennai',
    rent: 10000,
    type: 'Girls',
    facilities: ['WiFi', 'AC', 'Laundry', 'Meals', '24/7 Security'],
    nearbyColleges: ['VIT Chennai', 'Anna University'],
    contact: {
      phone: '+91-9876543211',
      email: 'safehaven@pg.com'
    },
    images: ['/placeholder.svg'],
    rating: 4.5
  }
];

// Mock Auth
class MockAuth {
  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  constructor() {
    // Auto-login for demo
    setTimeout(() => {
      this.currentUser = {
        uid: 'user123',
        email: 'demo@univera.com',
        displayName: 'Demo User',
        role: 'user'
      };
      this.notifyListeners();
    }, 1000);
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<{ user: User }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          uid: Math.random().toString(36),
          email,
          displayName: email.split('@')[0],
          role: email.includes('admin') ? 'admin' : 'user'
        };
        this.currentUser = user;
        this.notifyListeners();
        resolve({ user });
      }, 1000);
    });
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<{ user: User }> {
    return this.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentUser = null;
        this.notifyListeners();
        resolve();
      }, 500);
    });
  }

  onAuthStateChanged(callback: (user: User | null) => void) {
    this.listeners.push(callback);
    callback(this.currentUser);
    
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentUser));
  }
}

// Mock Firestore
class MockFirestore {
  async getColleges(): Promise<College[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve([...mockColleges]), 500);
    });
  }

  async getPGs(): Promise<PG[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve([...mockPGs]), 500);
    });
  }

  async addCollege(college: Omit<College, 'id'>): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        const id = Math.random().toString(36);
        mockColleges.push({ ...college, id });
        resolve(id);
      }, 500);
    });
  }

  async addPG(pg: Omit<PG, 'id'>): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        const id = Math.random().toString(36);
        mockPGs.push({ ...pg, id });
        resolve(id);
      }, 500);
    });
  }

  async updateCollege(id: string, updates: Partial<College>): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockColleges.findIndex(c => c.id === id);
        if (index !== -1) {
          mockColleges[index] = { ...mockColleges[index], ...updates };
        }
        resolve();
      }, 500);
    });
  }

  async deleteCollege(id: string): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockColleges.findIndex(c => c.id === id);
        if (index !== -1) {
          mockColleges.splice(index, 1);
        }
        resolve();
      }, 500);
    });
  }
}

export const auth = new MockAuth();
export const db = new MockFirestore();