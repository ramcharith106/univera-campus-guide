import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChatBot from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  MapPin, 
  Star, 
  Users, 
  MessageCircle, 
  Shield, 
  TrendingUp,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Building,
      title: "Verified Colleges",
      description: "Access comprehensive data on 500+ verified colleges with authentic placement records and reviews.",
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: "Trusted PG Listings",
      description: "Find safe and verified PG accommodations near your college with detailed amenities and reviews.",
      color: "text-secondary"
    },
    {
      icon: MessageCircle,
      title: "AI-Powered Assistant",
      description: "Get instant answers to your college and PG queries with our smart chatbot trained on verified data.",
      color: "text-success"
    },
    {
      icon: Shield,
      title: "100% Verified Data",
      description: "All colleges and PGs are thoroughly verified by our team to ensure authenticity and reliability.",
      color: "text-warning"
    }
  ];

  const benefits = [
    "Save hours of research time",
    "Avoid fraudulent listings",
    "Get real placement data",
    "Connect with verified owners",
    "Compare colleges easily",
    "Find perfect PG matches"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose UNIVERA?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make finding the right college and accommodation simple, safe, and smart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-lg transition-smooth group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Everything You Need in One Platform
                </h2>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 space-y-4">
                  <Button size="lg" className="w-full md:w-auto">
                    Start Exploring
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="shadow-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">500+</div>
                    <div className="text-sm text-muted-foreground">Verified Colleges</div>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-secondary mb-1">1000+</div>
                    <div className="text-sm text-muted-foreground">Trusted PGs</div>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-success mb-1">10K+</div>
                    <div className="text-sm text-muted-foreground">Students Helped</div>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-warning mb-1">50+</div>
                    <div className="text-sm text-muted-foreground">Cities Covered</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
    </div>
  );
};

export default Index;
