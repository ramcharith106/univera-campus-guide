import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Users, 
  TrendingUp, 
  Building, 
  Phone, 
  Mail,
  ChevronRight,
  Heart,
  Eye
} from "lucide-react";
import Header from "@/components/Header";
import ChatBot from "@/components/ChatBot";

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  rating: number;
  reviews: number;
  type: string;
  avgPackage: string;
  highestPackage: string;
  placementRate: number;
  courses: string[];
  fees: string;
  established: number;
  image: string;
  featured: boolean;
}

const Colleges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // Mock data - would come from database
  const colleges: College[] = [
    {
      id: "1",
      name: "Indian Institute of Technology - Bombay",
      location: "Mumbai",
      state: "Maharashtra",
      rating: 4.8,
      reviews: 1250,
      type: "Government",
      avgPackage: "₹20.3 LPA",
      highestPackage: "₹1.8 CPA",
      placementRate: 95,
      courses: ["Computer Science", "Mechanical", "Electrical", "Chemical"],
      fees: "₹2.5 LPA",
      established: 1958,
      image: "/placeholder.svg",
      featured: true,
    },
    {
      id: "2",
      name: "Vellore Institute of Technology",
      location: "Vellore",
      state: "Tamil Nadu",
      rating: 4.3,
      reviews: 890,
      type: "Private",
      avgPackage: "₹7.5 LPA",
      highestPackage: "₹75 LPA",
      placementRate: 88,
      courses: ["Computer Science", "IT", "ECE", "Mechanical"],
      fees: "₹1.98 LPA",
      established: 1984,
      image: "/placeholder.svg",
      featured: true,
    },
    {
      id: "3",
      name: "National Institute of Technology - Trichy",
      location: "Tiruchirappalli",
      state: "Tamil Nadu",
      rating: 4.6,
      reviews: 670,
      type: "Government",
      avgPackage: "₹12.8 LPA",
      highestPackage: "₹45 LPA",
      placementRate: 92,
      courses: ["Computer Science", "Mechanical", "Civil", "ECE"],
      fees: "₹1.2 LPA",
      established: 1964,
      image: "/placeholder.svg",
      featured: false,
    },
  ];

  const states = ["Maharashtra", "Tamil Nadu", "Karnataka", "Delhi", "Uttar Pradesh"];
  const types = ["Government", "Private", "Deemed"];
  const courses = ["Computer Science", "Mechanical", "Electrical", "Civil", "ECE", "IT"];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !selectedState || college.state === selectedState;
    const matchesType = !selectedType || college.type === selectedType;
    const matchesCourse = !selectedCourse || college.courses.includes(selectedCourse);
    
    return matchesSearch && matchesState && matchesType && matchesCourse;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Verified Colleges</h1>
          <p className="text-muted-foreground">Discover top colleges with verified placement data and authentic reviews</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search colleges, locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All States</SelectItem>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="College Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Courses</SelectItem>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {filteredColleges.length} of {colleges.length} colleges
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* College Cards */}
        <div className="grid gap-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="shadow-card hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* College Image */}
                  <div className="lg:w-48 w-full">
                    <div className="aspect-video lg:aspect-square bg-gradient-card rounded-lg flex items-center justify-center relative">
                      <Building className="h-12 w-12 text-primary/40" />
                      {college.featured && (
                        <Badge className="absolute top-2 right-2 bg-secondary">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* College Info */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{college.name}</h3>
                            <div className="flex items-center text-muted-foreground text-sm mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              {college.location}, {college.state}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-semibold">{college.rating}</span>
                            <span className="text-muted-foreground text-sm ml-1">
                              ({college.reviews} reviews)
                            </span>
                          </div>
                          <Badge variant="outline">{college.type}</Badge>
                          <Badge variant="secondary">Est. {college.established}</Badge>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Avg Package</p>
                            <p className="font-semibold text-success">{college.avgPackage}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Highest Package</p>
                            <p className="font-semibold text-primary">{college.highestPackage}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Placement Rate</p>
                            <p className="font-semibold">{college.placementRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Annual Fees</p>
                            <p className="font-semibold">{college.fees}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">Popular Courses</p>
                          <div className="flex flex-wrap gap-2">
                            {college.courses.slice(0, 4).map((course, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {course}
                              </Badge>
                            ))}
                            {college.courses.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{college.courses.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:w-40">
                        <Button className="w-full">
                          View Details
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button variant="secondary" className="w-full">
                          Compare
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Colleges
          </Button>
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default Colleges;