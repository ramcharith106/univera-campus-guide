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
  Wifi, 
  Car, 
  Utensils, 
  Shield, 
  Phone, 
  ChevronRight,
  Heart,
  Eye,
  Home
} from "lucide-react";
import Header from "@/components/Header";
import ChatBot from "@/components/ChatBot";

interface PG {
  id: string;
  name: string;
  location: string;
  nearbyCollege: string;
  distance: string;
  rating: number;
  reviews: number;
  gender: "Male" | "Female" | "Co-ed";
  rent: number;
  deposit: number;
  amenities: string[];
  roomType: string;
  verified: boolean;
  owner: {
    name: string;
    phone: string;
  };
  images: string[];
  available: boolean;
}

const PGs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");

  // Mock data - would come from database
  const pgs: PG[] = [
    {
      id: "1",
      name: "Elite Boys PG",
      location: "Powai, Mumbai",
      nearbyCollege: "IIT Bombay",
      distance: "1.2 km",
      rating: 4.5,
      reviews: 89,
      gender: "Male",
      rent: 15000,
      deposit: 30000,
      amenities: ["Wifi", "AC", "Laundry", "Meals", "Parking"],
      roomType: "Single",
      verified: true,
      owner: {
        name: "Raj Sharma",
        phone: "+91 98765 43210"
      },
      images: ["/placeholder.svg"],
      available: true,
    },
    {
      id: "2",
      name: "Sunshine Girls Hostel",
      location: "Anna Nagar, Chennai",
      nearbyCollege: "Anna University",
      distance: "0.8 km",
      rating: 4.3,
      reviews: 124,
      gender: "Female",
      rent: 12000,
      deposit: 24000,
      amenities: ["Wifi", "Meals", "Security", "Laundry"],
      roomType: "Sharing",
      verified: true,
      owner: {
        name: "Priya Menon",
        phone: "+91 87654 32109"
      },
      images: ["/placeholder.svg"],
      available: true,
    },
    {
      id: "3",
      name: "Tech Hub Co-living",
      location: "Koramangala, Bangalore",
      nearbyCollege: "IIIT Bangalore",
      distance: "2.1 km",
      rating: 4.7,
      reviews: 156,
      gender: "Co-ed",
      rent: 18000,
      deposit: 36000,
      amenities: ["Wifi", "AC", "Gym", "Meals", "Parking", "Security"],
      roomType: "Single",
      verified: true,
      owner: {
        name: "Arjun Tech Spaces",
        phone: "+91 76543 21098"
      },
      images: ["/placeholder.svg"],
      available: false,
    },
  ];

  const genders = ["Male", "Female", "Co-ed"];
  const budgets = ["Under ₹10k", "₹10k - ₹15k", "₹15k - ₹20k", "Above ₹20k"];
  const roomTypes = ["Single", "Sharing", "Double", "Triple"];

  const filteredPGs = pgs.filter(pg => {
    const matchesSearch = pg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pg.nearbyCollege.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = !selectedGender || pg.gender === selectedGender;
    const matchesRoomType = !selectedRoomType || pg.roomType === selectedRoomType;
    
    let matchesBudget = true;
    if (selectedBudget) {
      switch (selectedBudget) {
        case "Under ₹10k":
          matchesBudget = pg.rent < 10000;
          break;
        case "₹10k - ₹15k":
          matchesBudget = pg.rent >= 10000 && pg.rent <= 15000;
          break;
        case "₹15k - ₹20k":
          matchesBudget = pg.rent >= 15000 && pg.rent <= 20000;
          break;
        case "Above ₹20k":
          matchesBudget = pg.rent > 20000;
          break;
      }
    }
    
    return matchesSearch && matchesGender && matchesBudget && matchesRoomType;
  });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "parking":
        return <Car className="h-4 w-4" />;
      case "meals":
        return <Utensils className="h-4 w-4" />;
      case "security":
        return <Shield className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Verified PG Accommodations</h1>
          <p className="text-muted-foreground">Find safe and verified PG accommodations near top colleges</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search PGs, locations, colleges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  {genders.map(gender => (
                    <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                <SelectTrigger>
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Budgets</SelectItem>
                  {budgets.map(budget => (
                    <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                <SelectTrigger>
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {roomTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {filteredPGs.length} of {pgs.length} PGs
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* PG Cards */}
        <div className="grid gap-6">
          {filteredPGs.map((pg) => (
            <Card key={pg.id} className="shadow-card hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* PG Image */}
                  <div className="lg:w-48 w-full">
                    <div className="aspect-video lg:aspect-square bg-gradient-card rounded-lg flex items-center justify-center relative">
                      <Home className="h-12 w-12 text-primary/40" />
                      {pg.verified && (
                        <Badge className="absolute top-2 left-2 bg-success">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {!pg.available && (
                        <Badge className="absolute top-2 right-2 bg-destructive">
                          Not Available
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* PG Info */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{pg.name}</h3>
                            <div className="flex items-center text-muted-foreground text-sm mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              {pg.location}
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
                            <span className="font-semibold">{pg.rating}</span>
                            <span className="text-muted-foreground text-sm ml-1">
                              ({pg.reviews} reviews)
                            </span>
                          </div>
                          <Badge variant="outline">{pg.gender}</Badge>
                          <Badge variant="secondary">{pg.roomType} Room</Badge>
                          <div className="text-sm text-muted-foreground">
                            {pg.distance} from {pg.nearbyCollege}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Monthly Rent</p>
                            <p className="font-semibold text-primary">₹{pg.rent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Security Deposit</p>
                            <p className="font-semibold">₹{pg.deposit.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Owner</p>
                            <p className="font-semibold text-sm">{pg.owner.name}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">Amenities</p>
                          <div className="flex flex-wrap gap-2">
                            {pg.amenities.map((amenity, index) => (
                              <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs">
                                {getAmenityIcon(amenity)}
                                <span>{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:w-40">
                        <Button className="w-full" disabled={!pg.available}>
                          {pg.available ? "Book Now" : "Not Available"}
                          {pg.available && <ChevronRight className="h-4 w-4 ml-2" />}
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button variant="secondary" className="w-full">
                          View Details
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
            Load More PGs
          </Button>
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default PGs;