import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Star, Users, TrendingUp, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-university.jpg";

const Hero = () => {
  const stats = [
    { icon: Building2, label: "Verified Colleges", value: "500+" },
    { icon: Users, label: "Students Helped", value: "10K+" },
    { icon: MapPin, label: "Cities Covered", value: "50+" },
    { icon: Star, label: "Average Rating", value: "4.8" },
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Students on university campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Perfect College
            </span>
            & PG
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            UNIVERA makes finding verified colleges and PG accommodations easier with smart AI assistance and comprehensive data
          </p>

          {/* Search Bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                <Input
                  placeholder="Search colleges, courses, or locations..."
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 h-12"
                />
              </div>
              <Button variant="secondary" size="lg" className="md:w-auto w-full">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="xl">
              <Building2 className="h-5 w-5 mr-2" />
              Explore Colleges
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              <MapPin className="h-5 w-5 mr-2" />
              Find PGs
            </Button>
            <Button variant="secondary" size="xl">
              <MessageCircle className="h-5 w-5 mr-2" />
              Ask AI Assistant
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3 group-hover:scale-110 transition-bounce">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-32 right-16 w-12 h-12 bg-secondary/30 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute top-1/2 right-8 w-8 h-8 bg-yellow-300/40 rounded-full animate-pulse hidden lg:block"></div>
    </section>
  );
};

// Import Building2 icon
import { Building2 } from "lucide-react";

export default Hero;